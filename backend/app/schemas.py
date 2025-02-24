from pydantic import BaseModel, EmailStr, field_validator
import uuid
from typing import Optional, List, TypeVar, Generic
from datetime import datetime
from app.constants import bool_map, PRIORITIES

T = TypeVar('T')

# Schema to paginate query responses
class PaginatedResponse(BaseModel, Generic[T]):
    total: int
    page: int
    size: int
    total_pages: int
    items: List[T]


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

# Schema for task query params validations
class TaskQueryParams(BaseModel):
    priority: Optional[int] = None
    completed: Optional[str] = None

    @field_validator('priority', mode='after')
    @classmethod
    def validate_priority(cls, value):
        if value is not None and not (0 <= int(value) < len(PRIORITIES)):
            raise ValueError(f'Priority must be a digit between 0 and {len(PRIORITIES)-1}')
        return value

    @field_validator('completed', mode='after')
    @classmethod
    def validate_completed(cls, value):
        if value is not None and value not in bool_map:
            allowed_values = list(bool_map.keys())
            raise ValueError(f'Completed must be one of: {allowed_values}')
        return value
