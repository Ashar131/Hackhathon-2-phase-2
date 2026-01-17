from sqlmodel import create_engine, Session
from sqlalchemy import event
from sqlalchemy.engine import Engine
from pathlib import Path
import os
import logging
from typing import Generator
from .models import Task  # Import your models here
from src.models.task import Task  # noqa: F401

# Use environment variable for database URL, with SQLite as fallback for development
# Using a more reliable SQLite configuration for development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# For Neon Serverless PostgreSQL in production, set DATABASE_URL environment variable to:
# postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require

# Configure SQLite engine with proper settings to avoid locking issues
connect_args = {
    "check_same_thread": False,
    "timeout": 30,  # 30 second timeout for database locks
} if "sqlite" in DATABASE_URL.lower() else {}

engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)


def create_db_and_tables():
    """Create database tables"""
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Get database session"""
    try:
        with Session(engine) as session:
            yield session
    except Exception as e:
        logger = logging.getLogger(__name__)
        logger.error(f"Database session error: {e}")
        raise


# Enable foreign key constraints for SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    import sqlite3
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()