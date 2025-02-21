from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, tasks

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])


@app.get("/")
def root():
    return {"message": "Task Manager API using FastAPI"}
