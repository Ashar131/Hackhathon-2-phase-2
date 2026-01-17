from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer
from typing import Optional

# Simple authentication bypass for backward compatibility
# Since we're removing auth, we'll just define the scheme for now but not use it

http_basic = HTTPBearer(auto_error=False)


def get_current_user_email() -> str:
    """Stub function to return a generic user email since auth is removed"""
    return "anonymous@example.com"