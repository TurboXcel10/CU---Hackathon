import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any

class AssessmentBase(BaseModel):
    product_description: str
    structured_attributes: Dict[str, Any]
    matched_standard: Optional[str] = None
    regulatory_status: Optional[str] = None
    match_score: Optional[float] = None
    status: str = "pending"

class AssessmentCreate(AssessmentBase):
    product_id: uuid.UUID

class AssessmentResponse(AssessmentBase):
    id: uuid.UUID
    product_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
