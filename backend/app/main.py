from fastapi import FastAPI
from app.routes import users, tasks

app = FastAPI()

# Include API routes
app.include_router(users.router, prefix="/users", tags=["Users"])
# app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])


@app.get("/")
def root():
    return {"message": "Task Manager API using FastAPI"}
