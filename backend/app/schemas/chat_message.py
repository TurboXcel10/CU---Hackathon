import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any

class ChatMessageBase(BaseModel):
    sender: str
    text: str
    evidence: Optional[Dict[str, Any]] = None
    confidence: Optional[float] = None

class ChatMessageCreate(ChatMessageBase):
    assessment_id: Optional[uuid.UUID] = None

class ChatMessageResponse(ChatMessageBase):
    id: uuid.UUID
    assessment_id: Optional[uuid.UUID] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
