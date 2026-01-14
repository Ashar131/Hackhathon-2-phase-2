from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from src.models.task import Task, TaskCreate, TaskRead, TaskUpdate, TaskPublic, TaskStatus
from src.models.user import User
from src.database.database import get_session
from src.services.task_service import TaskService
from src.utils.jwt import get_current_user_email

router = APIRouter()

@router.get("/", response_model=List[TaskPublic])
def get_tasks(
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    status_filter: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """
    Get tasks for the current user with optional filtering
    """
    # Get the current user
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Build the query
    query = select(Task).where(Task.user_id == user.id)

    # Apply filters
    if status_filter:
        query = query.where(Task.status == status_filter.lower())

    if priority:
        query = query.where(Task.priority == priority.lower())

    if search:
        query = query.where(Task.title.contains(search) | Task.description.contains(search))

    # Apply pagination
    query = query.offset(skip).limit(limit)

    tasks = session.exec(query).all()
    return tasks


@router.post("/", response_model=TaskRead)
def create_task(
    task: TaskCreate,
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the current user
    """
    # Get the current user
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Create the task
    db_task = Task.model_validate(task)
    db_task.user_id = user.id

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.get("/{task_id}", response_model=TaskPublic)
def get_task(
    task_id: UUID,
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID
    """
    # Get the current user
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get the task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Verify that the task belongs to the current user
    if task.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID
    """
    # Get the current user
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get the task
    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Verify that the task belongs to the current user
    if db_task.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    # Update the task
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db_task.updated_at = datetime.utcnow()

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.patch("/{task_id}/complete")
def complete_task(
    task_id: UUID,
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session)
):
    """
    Mark a specific task as completed
    """
    # Get the current user
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get the task
    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Verify that the task belongs to the current user
    if db_task.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    # Update task status to completed
    db_task.status = TaskStatus.COMPLETED
    db_task.updated_at = datetime.utcnow()

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.delete("/{task_id}")
def delete_task(
    task_id: UUID,
    current_user_email: str = Depends(get_current_user_email),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID
    """
    # Get the current user
    user_statement = select(User).where(User.email == current_user_email)
    user = session.exec(user_statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get the task
    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Verify that the task belongs to the current user
    if db_task.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")

    # Delete the task
    session.delete(db_task)
    session.commit()

    return {"message": "Task deleted successfully"}