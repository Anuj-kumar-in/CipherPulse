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
