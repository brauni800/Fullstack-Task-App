from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db, get_paginated
from app.models import Task
from app.schemas import TaskCreate, TaskResponse, TaskUpdate, TaskQueryParams, PaginatedResponse
from app.routes.users import get_current_user
from app.constants import PRIORITIES
from typing import Optional
import uuid

router = APIRouter()

def get_query_params(
    priority: Optional[int] = Query(None),
    completed: Optional[str] = Query(None)
) -> TaskQueryParams:
    return TaskQueryParams(priority=priority, completed=completed)

# Get all tasks for the authenticated user
@router.get("/", response_model=PaginatedResponse[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
    filters: TaskQueryParams = Depends(get_query_params),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=10, description="Page size")
):
    task_list = db.query(Task).filter(Task.user_id == current_user.id)
    if filters.priority is not None:
        task_list = task_list.filter(Task.priority == PRIORITIES[filters.priority])
    if filters.completed is not None:
        task_list = task_list.filter(Task.completed == (filters.completed.lower() == 'true'))

    return get_paginated(task_list, Task, page, size)


# Create a new task
@router.post("/", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_task = Task(**task.dict(), user_id=current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


# Get a task by ID
@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.user_id == current_user.id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# Update a task
@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: uuid.UUID,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.user_id == current_user.id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    for key, value in task_update.dict(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task


# Delete a task
@router.delete("/{task_id}")
def delete_task(
    task_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.user_id == current_user.id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
