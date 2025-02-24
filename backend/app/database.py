from sqlalchemy import create_engine, desc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Query
from app.config import settings
from typing import TypeVar, Type, Any

ModelType = TypeVar("ModelType", bound=Any)

DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Serialize queries in a paginated structure
def get_paginated(
    query: Query[Type[ModelType]],
    model: Type[ModelType],
    page: int = 1,
    size: int = 10,
    order_by: str = "id",
    order_direction: str = "asc",
):
    # Apply order by
    order_field = getattr(model, order_by, None)
    if order_field is None:
        order_field = model.id
    if order_direction.lower() == "desc":
        query = query.order_by(desc(order_field))
    else:
        query = query.order_by(order_field)

    # offset calculation
    offset = (page - 1) * size

    # get paginated items
    items = query.offset(offset).limit(size).all()
    
    # get number of total items
    total = query.order_by(None).count()
    
    return {
        "total": total,
        "items": items,
        "page": page,
        "size": size,
        "total_pages": (total + size - 1) // size
    }
