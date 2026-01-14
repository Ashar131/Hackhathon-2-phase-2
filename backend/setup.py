from setuptools import setup, find_packages

setup(
    name="todo-backend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.104.0",
        "uvicorn>=0.24.0",
        "sqlmodel>=0.0.11",
        "pydantic>=2.4.0",
        "better-exceptions>=0.3.3",
        "python-multipart>=0.0.6",
        "passlib>=1.7.4",
        "python-jose>=3.3.0",
        "bcrypt>=4.0.1",
        "python-dotenv>=1.0.0",
        "alembic>=1.12.0",
        "asyncpg>=0.29.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.4.0",
            "black>=23.7.0",
            "isort>=5.12.0",
            "flake8>=6.0.0",
            "mypy>=1.5.0",
            "httpx>=0.25.0",
        ]
    },
    entry_points={
        "console_scripts": [
            "todo-backend=main:main",
        ],
    },
)