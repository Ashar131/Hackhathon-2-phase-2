from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

from api.auth import router as auth_router
from api.tasks import router as tasks_router
from api.dashboard import router as dashboard_router
from src.database.database import create_db_and_tables

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables asynchronously to avoid blocking startup
    import threading

    def init_db():
        try:
            logger.info("Initializing database...")
            create_db_and_tables()
            logger.info("Database initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize database: {e}")

    # Start database initialization in a separate thread so it doesn't block startup
    db_thread = threading.Thread(target=init_db, daemon=True)
    db_thread.start()

    yield

    # Cleanup code here if needed


app = FastAPI(title="Todo API", version="1.0.0", lifespan=lifespan)

# CORS middleware - in production, restrict origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001", "*"],  # Allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks_router, prefix="/api/tasks", tags=["tasks"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}