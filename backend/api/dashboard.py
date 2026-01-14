from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import Dict
from datetime import datetime, timedelta

from src.database.database import get_session
from src.models.user import User
from src.models.task import Task
from src.services.task_service import TaskService
from src.utils.jwt import get_current_user_email

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats(
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session)
) -> Dict:
    """
    Get dashboard statistics for the current user
    """
    # Get the current user
    from sqlmodel import select
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Use the task service to get stats
    task_service = TaskService(session)
    stats = task_service.get_user_task_stats(user.id)

    return stats