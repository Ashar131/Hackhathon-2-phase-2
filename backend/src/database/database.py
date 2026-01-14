from sqlmodel import create_engine, Session
from sqlalchemy import event
from sqlalchemy.engine import Engine
from pathlib import Path
import os
from typing import Generator
from .models import User, Task  # Import your models here
from src.models.user import User  # noqa: F401
from src.models.task import Task  # noqa: F401

# Use environment variable for database URL, with SQLite as fallback for development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# For Neon Serverless PostgreSQL in production, set DATABASE_URL environment variable to:
# postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require

engine = create_engine(DATABASE_URL, echo=False)


def create_db_and_tables():
    """Create database tables"""
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Get database session"""
    with Session(engine) as session:
        yield session


# Enable foreign key constraints for SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    import sqlite3
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()