"""
CipherPulse — /analyze endpoint
Accepts a message, runs ML scoring, stores results, returns risk assessment.
"""

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.db import crud
from backend.app.core.config import settings
from backend.app.ml.vectorizer import load_vectorizer
from backend.app.ml.model import load_model, predict_risk
from backend.app.ml.explain import explain_prediction

router = APIRouter(prefix="/api", tags=["analyze"])

# Load ML artifacts once at module level
_vectorizer = None
_model = None


def _ensure_model():
    global _vectorizer, _model
    if _vectorizer is None:
        _vectorizer = load_vectorizer()
    if _model is None:
        _model = load_model()


# ─── Request / Response schemas ──────────────────────────────────────────────

class AnalyzeRequest(BaseModel):
    source: str = "ui"
    sender_id: Optional[str] = "ui-user"
    sender_role: Optional[str] = "Unknown"
    team: Optional[str] = "Unknown"
    channel_id: Optional[str] = "live-input"
    message_text: str
    timestamp: Optional[str] = None


class AnalyzeResponse(BaseModel):
    raw_id: str
    risk_score: float
    labels: list[str]
    predicted_label: str
    explanation: dict
    probabilities: dict


# ─── Endpoint ────────────────────────────────────────────────────────────────

@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_message(req: AnalyzeRequest, db: Session = Depends(get_db)):
    """
    Analyze a single message for compliance risk.
    1. Store raw message
    2. Run ML inference
    3. Store scored result
    4. Return risk assessment
    """
    _ensure_model()

    ts = datetime.fromisoformat(req.timestamp) if req.timestamp else datetime.utcnow()

    # 1. Store raw message
    raw_msg = crud.create_raw_message(
        db,
        source=req.source,
        timestamp=ts,
        sender_id=req.sender_id,
        sender_role=req.sender_role,
        team=req.team,
        channel_id=req.channel_id,
        message_text=req.message_text,
    )

    # 2. Run ML inference
    features = _vectorizer.transform([req.message_text])
    result = predict_risk(_model, features)

    # 3. Generate explanation
    explanation = explain_prediction(
        req.message_text, _vectorizer, _model,
        result["predicted_label"]
    )

    # Build labels
    labels = []
    if result["predicted_label"] != "BENIGN":
        labels.append(result["predicted_label"])
        for lbl, prob in result["probabilities"].items():
            if lbl != "BENIGN" and lbl != result["predicted_label"] and prob > 0.15:
                labels.append(lbl)

    # 4. Store scored result
    scored = crud.create_scored(
        db,
        raw_id=raw_msg.id,
        risk_score=result["risk_score"],
        labels=labels,
        explanation=explanation,
        model_version=settings.MODEL_VERSION,
    )

    return AnalyzeResponse(
        raw_id=str(raw_msg.id),
        risk_score=result["risk_score"],
        labels=labels,
        predicted_label=result["predicted_label"],
        explanation=explanation,
        probabilities=result["probabilities"],
    )
