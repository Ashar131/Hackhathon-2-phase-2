from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from src.models.task import Task, TaskCreate, TaskRead, TaskUpdate, TaskPublic, TaskStatus
from src.database.database import get_session

router = APIRouter()

@router.get("/", response_model=List[TaskPublic])
def get_tasks(
    session: Session = Depends(get_session),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    status_filter: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """
    Get all tasks with optional filtering
    """
    # Build the query - get all tasks (no user filtering)
    query = select(Task)

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
    session: Session = Depends(get_session)
):
    """
    Create a new task
    """
    # Create the task - remove user_id since we're removing user association
    db_task = Task.model_validate(task)

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.get("/{task_id}", response_model=TaskPublic)
def get_task(
    task_id: UUID,
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID
    """
    # Get the task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID
    """
    # Get the task
    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update the task
    update_data = task_update.model_dump(exclude_unset=True)
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
    session: Session = Depends(get_session)
):
    """
    Mark a specific task as completed
    """
    # Get the task
    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

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
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID
    """
    # Get the task
    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Delete the task
    session.delete(db_task)
    session.commit()

    return {"message": "Task deleted successfully"}