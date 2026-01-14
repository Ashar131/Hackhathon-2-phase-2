<!-- SYNC IMPACT REPORT
Version change: N/A -> 1.0.0
Modified principles: N/A (new constitution)
Added sections: All sections (initial constitution)
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
Follow-up TODOs:
  - RATIFICATION_DATE: Original adoption date unknown
-->
# Todo Full-Stack Web Application Constitution

## Core Principles

### Spec-Driven Development (SDD) First
All development follows structured specifications as the single source of truth; Specs inside /specs directory take precedence over code; If code conflicts with specs, specs must be followed; All undocumented features are prohibited.

### Security-First Architecture
Authentication must use Better Auth + JWT; JWT tokens must be sent in Authorization: Bearer header; Backend must verify JWT using shared secret; User isolation must be enforced on every request; No plaintext passwords or hardcoded secrets allowed.

### RESTful API Design (NON-NEGOTIABLE)
All backend APIs must follow RESTful design; Endpoints must follow defined API specs; Task ownership must always be enforced; Backend must never trust user_id from request body alone; Authenticated user identity from JWT is the source of truth.

### Monorepo Integrity
Monorepo structure must be preserved; Frontend and backend are separate services; All persistent data stored in Neon Serverless PostgreSQL; SQLModel is the only ORM allowed; All backend APIs live under /api/*.

### Full-Stack Separation
Frontend uses Next.js App Router with TypeScript and Tailwind CSS; Backend uses FastAPI with proper HTTP status codes; Database operations use SQLModel; Frontend must attach JWT token to every API request; API calls must go through centralized API client.

### Production-Ready Code Quality
Produce clean, readable, production-quality code; Follow existing folder and file structure; No unnecessary files; Prefer clarity over cleverness; Every protected route requires authentication; Never expose another user's data.

## Technology Stack Requirements
Frontend: Next.js App Router, TypeScript, Tailwind CSS, Shadcn UI; Backend: FastAPI; Database: Neon Serverless PostgreSQL; ORM: SQLModel only; Authentication: Better Auth + JWT; File structure must be preserved.

## Development Workflow
1. Read feature spec; 2. Read API spec; 3. Read database spec; 4. Implement backend changes; 5. Implement frontend changes; 6. Ensure auth and user isolation is enforced; 7. Keep implementation aligned with specs.

## Governance
Constitution supersedes all other practices; Amendments require documentation and approval; All implementations must verify compliance with specs; Spec-Kit Plus templates must be followed; Architectural decisions must be documented when significant.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date unknown | **Last Amended**: 2026-01-08
