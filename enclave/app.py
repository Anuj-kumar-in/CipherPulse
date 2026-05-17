"""
CipherPulse — Nitro Enclave Application
This script runs inside the AWS Nitro Enclave. It listens on a VSOCK port
for incoming messages, decrypts (in a real scenario), performs ML inference,
and returns the risk assessment. The raw message is immediately discarded.
"""

import socket
import json
import traceback
import sys
import os

# Ensure we can import backend packages if copied correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from backend.app.ml.vectorizer import load_vectorizer
from backend.app.ml.model import load_model, predict_risk
from backend.app.ml.explain import explain_prediction

# Port for VSOCK communication
PORT = 5000

print("🚀 Initializing Enclave App...")
try:
    # Load ML artifacts into enclave memory
    print("⏳ Loading ML models...")
    vectorizer = load_vectorizer()
    model = load_model()
    print("✅ ML models loaded successfully.")
except Exception as e:
    print(f"❌ Failed to load ML models: {e}")
    traceback.print_exc()
    sys.exit(1)


def handle_request(payload: bytes) -> dict:
    """Process incoming JSON payload and run ML inference."""
    try:
        msg = json.loads(payload.decode('utf-8'))
        text = msg.get("text", "")

        if not text:
            return {"error": "No text provided"}

        # 1. Run ML inference
        features = vectorizer.transform([text])
        result = predict_risk(model, features)

        # 2. Generate explanation
        explanation = explain_prediction(
            text, vectorizer, model,
            result["predicted_label"]
        )

        # Build labels
        labels = []
        if result["predicted_label"] != "BENIGN":
            labels.append(result["predicted_label"])
            for lbl, prob in result["probabilities"].items():
                if lbl != "BENIGN" and lbl != result["predicted_label"] and prob > 0.15:
                    labels.append(lbl)

        # Return non-sensitive results (raw text is not returned)
        return {
            "risk_score": result["risk_score"],
            "labels": labels,
            "predicted_label": result["predicted_label"],
            "explanation": explanation,
            "probabilities": result["probabilities"]
        }

    except Exception as e:
        print(f"Error processing request: {e}")
        return {"error": str(e)}


def main():
    # Setup VSOCK server
    try:
        # AF_VSOCK may not be available on Windows/Mac dev environments,
        # but it is available in standard Linux kernels used by Nitro.
        s = socket.socket(socket.AF_VSOCK, socket.SOCK_STREAM)
        # VMADDR_CID_ANY means listen on any CID assigned to this VM
        s.bind((socket.VMADDR_CID_ANY, PORT))
        s.listen()
        print(f"🔒 Enclave listening securely on VSOCK port {PORT}...")
    except AttributeError:
        print("⚠️ socket.AF_VSOCK not found! Are you running on a supported OS?")
        # Fallback to standard TCP for local testing if needed
        print("🔄 Falling back to TCP (127.0.0.1:5000) for local simulation.")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(("127.0.0.1", PORT))
        s.listen()

    while True:
        try:
            conn, addr = s.accept()
            print(f"⚡ Secure connection established from {addr}")
            
            # Read payload
            payload = conn.recv(1024 * 1024) # 1MB max
            if payload:
                # Process and score
                result = handle_request(payload)
                
                # Send result
                conn.sendall(json.dumps(result).encode('utf-8'))
            
            conn.close()
            # Note: The raw payload variable will be garbage collected,
            # effectively discarding the raw message from enclave RAM.
        except Exception as e:
            print(f"Connection error: {e}")

if __name__ == "__main__":
    main()
