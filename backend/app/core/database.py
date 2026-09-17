from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    # pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # Import all models here to ensure they are registered with Base
    from app.models import (
        Product, Assessment, StandardKnowledge, 
        TestingRequirement, Laboratory, ChatMessage
    )
    
    # Create the pgvector extension if possible
    try:
        with engine.connect() as conn:
            conn.execute(text('CREATE EXTENSION IF NOT EXISTS vector'))
            conn.commit()
    except Exception as e:
        print(f"Warning: Could not create vector extension (may not be supported or missing permissions): {e}")
        
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Error creating database tables: {e}")
        raise e
