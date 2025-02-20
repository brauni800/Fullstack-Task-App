from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime


# Esquema para crear un usuario
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


# Esquema para responder datos de usuario (sin password)
class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True
