# CipherPulse — Confidential Compliance AI (RegTech)

**One-line pitch:** A privacy-preserving, AI-powered communications surveillance platform for financial institutions that detects compliance risks (MNPI, guaranteed returns, collusion, PII leakage) with an end-to-end **ETL + ML + Analytics + UI** stack.

---

## 🌟 Overview

CipherPulse is a comprehensive RegTech solution designed to help financial institutions monitor internal communications (email, Slack, Teams) for regulatory and compliance risks. It leverages Machine Learning to flag suspicious activity while providing a robust human-in-the-loop review workflow and leadership-level analytics.

### Key Features
- **Real-time Risk Scoring**: Instant analysis of messages with scores from 0-100.
- **Explainable AI**: Highlights specific tokens and phrases that triggered the flag, providing context for compliance officers.
- **Human-in-the-Loop**: A dedicated "Inbox" for reviewing, dismissing, or escalating flagged messages.
- **Advanced Analytics**: Interactive dashboard showing risk trends, category distributions, and team-based risk profiles.
- **Synthetic Data Pipeline**: Built-in generator for creating realistic financial communications with labeled violations.

---

## 🛠️ Tech Stack

### Backend & API
- **FastAPI**: High-performance Python API framework.
- **SQLAlchemy**: ORM for PostgreSQL database management.
- **PostgreSQL**: Primary data store for raw messages, scores, and reviews.

### Machine Learning
- **Scikit-Learn**: TF-IDF Vectorizer + Logistic Regression multi-class classifier.
- **Explainability**: Custom weight-based token highlighting for model transparency.

### Frontend & Analytics
- **React + Vite**: Modern, responsive UI with glassmorphism aesthetics.
- **Plotly Dash**: Leadership-level KPI dashboard.
- **Lucide React**: Clean and modern iconography.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js & npm
- Docker & Docker Compose

### 1. Infrastructure Setup
Start the PostgreSQL database using Docker:
```powershell
docker-compose -f infra/docker-compose.yml up -d
```

### 2. Python Environment
Install dependencies for the backend, ETL, and dashboard:
```powershell
pip install -r backend/requirements.txt -r etl/requirements.txt -r dashboard/requirements.txt
```

### 3. Data & ML Pipeline
Generate synthetic data, load it into the DB, train the model, and score the initial batch:
```powershell
python etl/generate_data.py
python etl/etl_load_raw.py
python etl/train_model.py
python etl/score_batch.py
```

#### ML Model Operations (Training & Testing)
We have optimized scripts to train and evaluate the machine learning model.

* **Train the Model:**
  To train the classifier on a JSONL dataset (e.g., the 1-million messages dataset):
  ```powershell
  $env:PYTHONIOENCODING="utf-8"; python3.11 etl/train_model.py data/training_messages_1M.jsonl
  ```

* **Test Model on custom message (Single Inference):**
  To quickly test the model predictions on custom text:
  ```powershell
  python3.11 Scripts/test_model.py "I guarantee this investment will double your money by next week!"
  ```

* **Evaluate Model on a Dataset (.jsonl):**
  To run a full evaluation with precision, recall, and f1-score on a validation dataset like `data/1.jsonl`:
  ```powershell
  $env:PYTHONIOENCODING="utf-8"; python3.11 Scripts/test_model.py data/1.jsonl
  ```

### 4. Running the Services
Start all three components (ideally in separate terminals):

- **Backend API**:
  ```powershell
  uvicorn backend.app.main:app --reload
  ```
- **Analytics Dashboard**:
  ```powershell
  python dashboard/app.py
  ```
- **Compliance UI**:
  ```powershell
  cd ui
  npm run dev
  ```

---

## 📂 Repository Structure

```
CipherPulse/
├── backend/            # FastAPI Application & ML Module
│   ├── app/
│   │   ├── api/        # REST Endpoints
│   │   ├── db/         # Models & CRUD
│   │   ├── ml/         # Prediction & Explainability
│   │   └── main.py     # Entry Point
├── dashboard/          # Plotly Dash Analytics
├── etl/                # Data Generation & Ingestion
├── ui/                 # React Frontend
├── infra/              # Docker & SQL Schema
└── data/               # Local data storage (CSV)
```

---

## 🛡️ Future Extensions (TEE Integration)
As discussed in our architectural vision, CipherPulse is designed to support **Confidential Computing** using **Trusted Execution Environments (TEEs)** like AWS Nitro Enclaves. This ensures that raw message content is never visible to the cloud provider or even the platform administrators during processing.

---

## 📄 License
MIT License - See [LICENSE](LICENSE) for details.
