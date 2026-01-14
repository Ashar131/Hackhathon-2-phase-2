from sqlmodel import Session, select, func
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from src.models.task import Task, TaskCreate, TaskUpdate
from src.models.user import User


class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def create_task(self, task: TaskCreate, user_id: UUID) -> Task:
        """
        Create a new task for a specific user
        """
        db_task = Task.model_validate(task.model_dump())
        db_task.user_id = user_id

        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)

        return db_task

    def get_task_by_id(self, task_id: UUID, user_id: UUID) -> Optional[Task]:
        """
        Get a specific task by ID for a specific user
        """
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        return self.session.exec(statement).first()

    def get_tasks(
        self,
        user_id: UUID,
        skip: int = 0,
        limit: int = 100,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[Task]:
        """
        Get all tasks for a specific user with optional filtering
        """
        statement = select(Task).where(Task.user_id == user_id)

        # Apply filters
        if status:
            statement = statement.where(Task.status == status.lower())

        if priority:
            statement = statement.where(Task.priority == priority.lower())

        if search:
            statement = statement.where(
                (Task.title.contains(search)) | (Task.description.contains(search))
            )

        # Apply pagination
        statement = statement.offset(skip).limit(limit)

        return self.session.exec(statement).all()

    def update_task(self, task_id: UUID, task_update: TaskUpdate, user_id: UUID) -> Optional[Task]:
        """
        Update a specific task for a specific user
        """
        db_task = self.get_task_by_id(task_id, user_id)

        if not db_task:
            return None

        # Update the task with the provided data
        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_task, field, value)

        db_task.updated_at = datetime.utcnow()

        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)

        return db_task

    def delete_task(self, task_id: UUID, user_id: UUID) -> bool:
        """
        Delete a specific task for a specific user
        """
        db_task = self.get_task_by_id(task_id, user_id)

        if not db_task:
            return False

        self.session.delete(db_task)
        self.session.commit()

        return True

    def get_user_task_stats(self, user_id: UUID) -> dict:
        """
        Get statistics for a user's tasks
        """
        # Total tasks
        total_statement = select(func.count(Task.id)).where(Task.user_id == user_id)
        total = self.session.exec(total_statement).one()

        # Completed tasks
        completed_statement = select(func.count(Task.id)).where(
            Task.user_id == user_id, Task.status == "completed"
        )
        completed = self.session.exec(completed_statement).one()

        # Overdue tasks
        from sqlalchemy import and_
        overdue_statement = select(func.count(Task.id)).where(
            and_(
                Task.user_id == user_id,
                Task.due_date < datetime.utcnow(),
                Task.status == "active"
            )
        )
        overdue = self.session.exec(overdue_statement).one()

        return {
            "total": total,
            "completed": completed,
            "overdue": overdue
        }