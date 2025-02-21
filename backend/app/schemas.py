from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime


# Schema to create a user
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


# Schema to respond user data (without password)
class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True
