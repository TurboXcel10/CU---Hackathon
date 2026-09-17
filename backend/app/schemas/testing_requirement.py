import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any

class TestingRequirementBase(BaseModel):
    name: str
    explanation: str
    status: str
    evidence_citation: Optional[Dict[str, Any]] = None

class TestingRequirementCreate(TestingRequirementBase):
    assessment_id: uuid.UUID

class TestingRequirementResponse(TestingRequirementBase):
    id: uuid.UUID
    assessment_id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
