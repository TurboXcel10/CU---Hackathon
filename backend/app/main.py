from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db, init_db, engine
from app.api.routes import product, assessments, laboratories, assistant

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB (create tables) if possible
    try:
        init_db()
        print("Database initialization successful.")
    except Exception as e:
        print(f"Warning: Database initialization failed: {e}")
    yield
    # Shutdown

app = FastAPI(
    title="TRUSTMARK API",
    description="Backend for BIS compliance guidance platform",
    version="0.1.0",
    lifespan=lifespan
)

# CORS Configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:8081",
        "exp://localhost:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(product.router, prefix="/api/product", tags=["Product"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["Assessments"])
app.include_router(laboratories.router, prefix="/api/laboratories", tags=["Laboratories"])
app.include_router(assistant.router, prefix="/api/assistant", tags=["Assistant"])

@app.get("/health", tags=["Health"])
def health_check(db: Session = Depends(get_db)):
    db_status = "disconnected"
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
        
    return {
        "status": "ok",
        "service": "trustmark-backend",
        "database": db_status
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to the TRUSTMARK API. Access /docs for documentation."
    }
