---
id: 1
title: Add initial constitution for Todo Full-Stack Web Application
stage: constitution
date: 2026-01-08
surface: agent
model: claude-haiku-4-5-20251001
feature: todo-full-stack-app
branch: master
user: ASHAR HUSSAIN
command: /sp.constitution
labels:
  - constitution
  - spec-driven-development
  - todo-app
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests: []
---

# Prompt History Record: Add initial constitution for Todo Full-Stack Web Application

## User Input (PROMPT_TEXT)

```
You are Claude Code operating under a Spec-Driven Development constitution.

PROJECT CONTEXT
This project is Hackathon Phase II: Todo Full-Stack Web Application.
The system evolves a console-based todo app into a modern, multi-user web application
using Spec-Kit Plus and Claude Code.

The project is a monorepo with both frontend (Next.js) and backend (FastAPI)
and uses structured specifications as the single source of truth.

PRIMARY OBJECTIVE
Transform the Phase I console todo app into a secure, authenticated, persistent
full-stack web application with REST APIs and a responsive frontend.

AUTHORITATIVE SOURCES (ORDER OF PRECEDENCE)
1. Specifications inside /specs directory (Spec-Kit managed)
2. Root CLAUDE.md
3. /frontend/CLAUDE.md and /backend/CLAUDE.md
4. This constitution

If code conflicts with specs, specs must be followed.
If specs are missing or ambiguous, infer conservatively and document assumptions.

ARCHITECTURE RULES
- Monorepo structure must be preserved
- Frontend and backend are separate services
- All backend APIs live under /api/*
- All persistent data is stored in Neon Serverless PostgreSQL
- SQLModel is the only ORM allowed
- Authentication is handled using Better Auth + JWT

AUTHENTICATION CONSTITUTION
- Better Auth runs on the Next.js frontend
- Better Auth MUST issue JWT tokens
- JWT tokens MUST be sent in Authorization: Bearer <token> header
- FastAPI backend MUST verify JWT using the shared secret
- Shared secret is provided via BETTER_AUTH_SECRET environment variable
- Backend MUST extract user identity from JWT
- Backend MUST enforce user isolation on every request
- Requests without valid JWT MUST return 401 Unauthorized

API CONSTITUTION
- RESTful API design only
- Endpoints must follow the defined API specs
- Task ownership MUST always be enforced
- Backend must NEVER trust user_id from request body alone
- Authenticated user identity from JWT is the source of truth
- All responses must be JSON
- Use proper HTTP status codes

DATABASE CONSTITUTION
- Use SQLModel for all models
- Neon PostgreSQL is the only database
- Tasks table MUST include user_id foreign key
- Queries MUST always be filtered by authenticated user
- No cross-user data access is allowed
- Database connection string comes from DATABASE_URL

FRONTEND CONSTITUTION
- Use Next.js App Router
- Use TypeScript and Tailwind CSS
- Use Shadcn UI where appropriate
- Frontend MUST attach JWT token to every API request
- API calls must go through a centralized API client
- UI must be responsive and mobile-first

SPEC-KIT USAGE RULES
- Always read relevant specs before implementation
- Reference specs using @specs/path/to/file.md
- Update specs if behavior changes
- Do not implement undocumented features
- Follow feature, API, database, and UI specs strictly

DEVELOPMENT WORKFLOW
1. Read feature spec
2. Read API spec
3. Read database spec
4. Implement backend changes
5. Implement frontend changes
6. Ensure auth and user isolation is enforced
7. Keep implementation aligned with specs

SECURITY RULES
- No plaintext passwords
- No hardcoded secrets
- JWT tokens must have expiration
- Every protected route requires authentication
- Never expose another user's data

OUTPUT RULES
- Produce clean, readable, production-quality code
- Follow existing folder and file structure
- Do not generate unnecessary files
- Do not mix frontend and backend logic
- Prefer clarity over cleverness

You are building a hackathon-grade but production-realistic system.
Correctness, security, and spec-alignment matter more than speed.
```

## Assistant Response (RESPONSE_TEXT)

The project constitution has been successfully updated with the following details:

**New Version**: 1.0.0 (initial version for the Todo Full-Stack Web Application project)
**Bump Rationale**: This is the initial constitution for the project, establishing the foundational principles for the hackathon phase II transformation from a console-based todo app to a secure, authenticated, persistent full-stack web application.

**Key Principles Established**:
1. Spec-Driven Development (SDD) First - specifications take precedence over code
2. Security-First Architecture - authentication with Better Auth + JWT, user isolation
3. RESTful API Design (NON-NEGOTIABLE) - proper API design with user identity verification
4. Monorepo Integrity - preserving structure with Neon PostgreSQL and SQLModel
5. Full-Stack Separation - Next.js frontend with FastAPI backend separation
6. Production-Ready Code Quality - clean, readable, secure code practices

The constitution is now properly configured to govern the development of the Todo Full-Stack Web Application, with clear principles for spec-driven development, security-first architecture, RESTful API design, monorepo integrity, and full-stack separation as required by the hackathon project specifications.

## Outcome

The constitution file `.specify/memory/constitution.md` has been updated with project-specific principles and governance structure. The file now contains all the required principles and follows the format specified in the user input, establishing the foundation for the Todo Full-Stack Web Application development.

## Evaluation

The constitution update was completed successfully with all placeholder tokens replaced with concrete values derived from the user input. The resulting document establishes clear, testable principles that align with the project requirements for a secure, authenticated, full-stack web application using Spec-Kit Plus and Claude Code.