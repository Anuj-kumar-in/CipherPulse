"""
CipherPulse — /messages and /alerts endpoints
Retrieve stored messages and high-risk alerts.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.db import crud

router = APIRouter(prefix="/api", tags=["messages"])


# ─── Response schemas ────────────────────────────────────────────────────────

class MessageResponse(BaseModel):
    id: str
    source: str
    timestamp: str
    sender_id: Optional[str]
    sender_role: Optional[str]
    team: Optional[str]
    channel_id: Optional[str]
    message_text: str
    is_flagged: bool
    flag_reason: Optional[str]

    class Config:
        from_attributes = True


class AlertResponse(BaseModel):
    raw_id: str
    source: str
    timestamp: str
    sender_id: Optional[str]
    sender_role: Optional[str]
    team: Optional[str]
    message_text: str
    risk_score: float
    labels: list
    explanation: dict
    model_version: str
    scored_at: str
    review_status: Optional[str] = None
    feedback: Optional[str] = None


class StatsResponse(BaseModel):
    total_messages: int
    total_alerts: int
    high_risk_alerts: int
    reviewed: int
    true_positives: int
    false_positives: int
    false_positive_rate: float


# ─── Endpoints ───────────────────────────────────────────────────────────────

@router.get("/messages", response_model=list[MessageResponse])
def list_messages(
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    """List recent messages (most recent first)."""
    msgs = crud.get_messages(db, limit=limit, offset=offset)
    return [
        MessageResponse(
            id=str(m.id),
            source=m.source,
            timestamp=m.timestamp.isoformat(),
            sender_id=m.sender_id,
            sender_role=m.sender_role,
            team=m.team,
            channel_id=m.channel_id,
            message_text=m.message_text,
            is_flagged=m.is_flagged or False,
            flag_reason=m.flag_reason,
        )
        for m in msgs
    ]


@router.get("/alerts", response_model=list[AlertResponse])
def list_alerts(
    min_score: float = Query(60, ge=0, le=100),
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    """List high-risk alerts (scored messages above threshold)."""
    results = crud.get_alerts(db, min_score=min_score, limit=limit, offset=offset)
    alerts = []
    for raw, scored in results:
        review = crud.get_review_by_raw_id(db, raw.id)
        alerts.append(AlertResponse(
            raw_id=str(raw.id),
            source=raw.source,
            timestamp=raw.timestamp.isoformat(),
            sender_id=raw.sender_id,
            sender_role=raw.sender_role,
            team=raw.team,
            message_text=raw.message_text,
            risk_score=scored.risk_score,
            labels=scored.labels,
            explanation=scored.explanation,
            model_version=scored.model_version,
            scored_at=scored.scored_at.isoformat(),
            review_status=review.review_status if review else None,
            feedback=review.feedback if review else None,
        ))
    return alerts


@router.get("/stats", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    """Return summary KPIs for the dashboard."""
    return crud.get_stats(db)


@router.get("/messages/count")
def message_count(db: Session = Depends(get_db)):
    return {"count": crud.count_messages(db)}


@router.get("/alerts/count")
def alert_count(
    min_score: float = Query(60, ge=0, le=100),
    db: Session = Depends(get_db),
):
    return {"count": crud.count_alerts(db, min_score=min_score)}


# ─── Secure SQL Query Analyzer ───────────────────────────────────────────────────

import time
from fastapi import HTTPException

class SQLQueryRequest(BaseModel):
    query: str

@router.post("/sql/analyze")
def sql_analyze(req: SQLQueryRequest, db: Session = Depends(get_db)):
    """
    Execute read-only SELECT queries securely.
    Ensures remote compliance users can query data without pulling it locally.
    """
    cleaned_query = req.query.strip()
    query_upper = cleaned_query.upper()
    
    # 1. Enforce strict read-only SELECT check
    if not query_upper.startswith("SELECT"):
        raise HTTPException(
            status_code=400,
            detail="Security Violation: Only SELECT queries are permitted on this analyzer portal."
        )
        
    # 2. Block potential multi-statement injections or dangerous DML keywords
    forbidden_keywords = [
        ";", "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", 
        "TRUNCATE", "REPLACE", "GRANT", "REVOKE", "PG_SLEEP", "COPY"
    ]
    for keyword in forbidden_keywords:
        if keyword in query_upper:
            # Allow semicolon only if it's the very last character
            if keyword == ";" and cleaned_query.endswith(";"):
                # Check if there are other semicolons causing multi-statements
                if cleaned_query.count(";") == 1:
                    continue
            raise HTTPException(
                status_code=400,
                detail=f"Security Violation: Query contains unauthorized keyword or token: '{keyword}'."
            )
            
    # 3. Execute the SELECT statement on PostgreSQL
    try:
        from sqlalchemy import text
        start_time = time.time()
        result = db.execute(text(req.query))
        
        # Check if the result has rows (some commands don't)
        if result.returns_rows:
            cols = list(result.keys())
            rows = []
            for row in result.fetchall():
                # Convert row values to string/JSON-safe values
                row_dict = {}
                for idx, col in enumerate(cols):
                    val = row[idx]
                    if val is not None and not isinstance(val, (int, float, str, bool)):
                        val = str(val)
                    row_dict[col] = val
                rows.append(row_dict)
        else:
            cols = []
            rows = []
            
        execution_time = time.time() - start_time
        
        return {
            "status": "success",
            "columns": cols,
            "rows": rows,
            "count": len(rows),
            "execution_time_seconds": round(execution_time, 4)
        }
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Database Query Error: {str(e)}"
        )

