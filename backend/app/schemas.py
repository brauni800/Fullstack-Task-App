from pydantic import BaseModel, EmailStr
import uuid
from typing import Optional
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


# Schema for creating a new task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"
    due_date: Optional[datetime] = None


# Schema for updating an existing task
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None


# Schema for returning task details
class TaskResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    completed: bool
    priority: str
    due_date: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True
