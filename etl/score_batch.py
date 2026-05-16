"""
CipherPulse — Batch Scoring Pipeline
Reads all unscored rows from communications_raw, runs ML prediction,
and writes results to communications_scored.
"""

import os
import sys
import json
import uuid
from datetime import datetime

import psycopg2
from dotenv import load_dotenv

# Add project root to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from backend.app.ml.vectorizer import load_vectorizer
from backend.app.ml.model import load_model, predict_risk
from backend.app.ml.explain import explain_prediction

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://cipherpulse:cipherpulse_secret@localhost:5432/cipherpulse")
MODEL_VERSION = os.getenv("MODEL_VERSION", "v1-tfidf-lr")
BATCH_SIZE = 100


def score_batch():
    print("🔄 Loading ML artifacts...")
    vectorizer = load_vectorizer()
    model = load_model()

    conn = psycopg2.connect(DATABASE_URL)
    read_cur = conn.cursor()
    write_cur = conn.cursor()

    # Fetch unscored messages
    read_cur.execute("""
        SELECT cr.id, cr.message_text
        FROM communications_raw cr
        LEFT JOIN communications_scored cs ON cs.raw_id = cr.id
        WHERE cs.id IS NULL
        ORDER BY cr.timestamp
    """)

    rows = read_cur.fetchall()
    print(f"📋 Found {len(rows)} unscored messages")

    if not rows:
        print("✅ Nothing to score.")
        conn.close()
        return

    insert_sql = """
        INSERT INTO communications_scored
            (id, raw_id, risk_score, labels, explanation, model_version, scored_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    scored_count = 0
    for raw_id, message_text in rows:
        # Vectorize
        features = vectorizer.transform([message_text])

        # Predict
        result = predict_risk(model, features)

        # Explain
        explanation = explain_prediction(
            message_text, vectorizer, model,
            result["predicted_label"]
        )

        # Build labels array
        labels = []
        if result["predicted_label"] != "BENIGN":
            labels.append(result["predicted_label"])
            # Add secondary labels with significant probability
            for lbl, prob in result["probabilities"].items():
                if lbl != "BENIGN" and lbl != result["predicted_label"] and prob > 0.15:
                    labels.append(lbl)

        write_cur.execute(insert_sql, (
            str(uuid.uuid4()),
            str(raw_id),
            result["risk_score"],
            json.dumps(labels),
            json.dumps(explanation),
            MODEL_VERSION,
            datetime.utcnow(),
        ))
        scored_count += 1

        if scored_count % BATCH_SIZE == 0:
            conn.commit()
            print(f"   Scored {scored_count}/{len(rows)}...")

    conn.commit()
    read_cur.close()
    write_cur.close()
    conn.close()
    print(f"✅ Scored {scored_count} messages → communications_scored")


if __name__ == "__main__":
    score_batch()
