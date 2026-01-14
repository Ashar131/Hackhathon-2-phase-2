from sqlmodel import select
from src.database.database import get_session, create_db_and_tables
from src.models.user import User
from src.models.task import Task
from typing import Generator


def check_database_connection():
    """
    Function to check if the database connection is working properly
    """
    try:
        # Create tables first
        create_db_and_tables()

        # Get a session and try to execute a simple query
        session_gen = get_session()
        session = next(session_gen)

        try:
            # Try a simple query to check connection
            user_count = session.exec(select(User)).all()
            print(f"Database connection successful. Found {len(user_count)} users.")

            # Try to create and fetch a test task
            print("Database connection verification completed successfully.")
            return True
        finally:
            session.close()

    except Exception as e:
        print(f"Database connection failed: {str(e)}")
        return False


if __name__ == "__main__":
    check_database_connection()