# Todo Application Data Model

**Feature Branch**: `todo-data-model`
**Created**: 2026-01-08
**Status**: Draft

## Entities

### User
**Description**: Represents an authenticated user of the application

**Fields**:
- id: UUID (Primary Key)
- email: String (Unique, Indexed)
- name: String (Maximum 100 characters)
- hashed_password: String (For authentication)
- is_active: Boolean (Default: True)
- created_at: DateTime (Auto-generated)
- updated_at: DateTime (Auto-generated, Updated on change)

**Relationships**:
- One-to-Many: User → Task (user owns many tasks)

### Task
**Description**: Represents a task that a user needs to complete

**Fields**:
- id: UUID (Primary Key)
- title: String (Maximum 200 characters, Required)
- description: Text (Optional)
- status: Enum (Values: "active", "completed"; Default: "active")
- priority: Enum (Values: "low", "medium", "high", "urgent"; Default: "medium")
- due_date: DateTime (Optional)
- category: String (Optional, Maximum 50 characters)
- user_id: UUID (Foreign Key to User, Required)
- created_at: DateTime (Auto-generated)
- updated_at: DateTime (Auto-generated, Updated on change)

**Relationships**:
- Many-to-One: Task → User (task belongs to one user)

## API Contracts

### Authentication Endpoints
- `POST /api/auth/login`: Authenticate user and return JWT
- `POST /api/auth/signup`: Register new user and return JWT
- `POST /api/auth/logout`: Invalidate user session
- `GET /api/auth/me`: Get current user profile

### Task Management Endpoints
- `GET /api/tasks`: Get paginated list of user's tasks
- `POST /api/tasks`: Create new task for authenticated user
- `GET /api/tasks/{id}`: Get specific task details
- `PUT /api/tasks/{id}`: Update existing task
- `DELETE /api/tasks/{id}`: Delete specific task

### Query Parameters for GET /api/tasks
- page: Integer (Default: 1)
- limit: Integer (Default: 10, Max: 100)
- status: String (Optional: "active", "completed", "all")
- priority: String (Optional: "low", "medium", "high", "urgent")
- search: String (Optional: search in title/description)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    category VARCHAR(50),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Validation Rules

### User Validation
- Email: Must be a valid email format
- Name: Maximum 100 characters, optional
- Password: Minimum 8 characters with complexity requirements

### Task Validation
- Title: Required, maximum 200 characters
- Description: Optional, maximum 1000 characters
- Status: Must be one of "active", "completed"
- Priority: Must be one of "low", "medium", "high", "urgent"
- Due Date: Must be a future date if provided
- Category: Optional, maximum 50 characters
- User ID: Must reference an existing active user

## Indexes
- Users.email: Unique index for fast login lookup
- Tasks.user_id: Index for user-specific task queries
- Tasks.status: Index for status filtering
- Tasks.due_date: Index for due date sorting
- Tasks.created_at: Index for chronological ordering