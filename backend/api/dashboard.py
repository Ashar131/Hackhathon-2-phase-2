from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Dict
from datetime import datetime, timedelta

from src.database.database import get_session
from src.models.task import Task

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats(
    session: Session = Depends(get_session)
) -> Dict:
    """
    Get dashboard statistics for all tasks
    """
    # Count all tasks
    total_tasks = session.exec(select(Task)).all()
    total_count = len(total_tasks)

    completed_tasks = [task for task in total_tasks if task.status == "completed"]
    active_tasks = [task for task in total_tasks if task.status == "active"]

    # Calculate other stats
    urgent_tasks = [task for task in total_tasks if task.priority == "urgent"]
    high_priority_tasks = [task for task in total_tasks if task.priority == "high"]

    stats = {
        "total": total_count,
        "completed": len(completed_tasks),
        "active": len(active_tasks),
        "urgent": len(urgent_tasks),
        "high_priority": len(high_priority_tasks),
        "completion_rate": (len(completed_tasks) / total_count * 100) if total_count > 0 else 0
    }

    return stats