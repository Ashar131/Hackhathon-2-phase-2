---
name: auth-skill
description: Handles all authentication tasks including signup, signin, password hashing, JWT tokens, and Better Auth integration.
---

# Skill: Auth Skill

## Instructions

1. **Primary Responsibilities**
   - Implement secure signup and signin flows
   - Hash passwords using bcrypt
   - Generate and validate JWT access and refresh tokens
   - Integrate Better Auth where applicable

2. **Constraints / Requirements**
   - Produce Python code compatible with FastAPI
   - Ensure security best practices (e.g., no plain text passwords)
   - Integrate seamlessly with database-agent

3. **Best Practices**
   - Use Pydantic schemas for request/response validation
   - Keep JWT secrets secure and environment-driven
   - Clear error messages for failed login/signup
