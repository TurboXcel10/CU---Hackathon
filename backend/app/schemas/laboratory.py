import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, List, Any, Union

class LaboratoryBase(BaseModel):
    name: str
    state: str
    city: str
    address: Optional[str] = None
    capability: str
    applicable_standards: Optional[Union[Dict[str, Any], List[Any]]] = None
    distance_mock: Optional[str] = None
    source_url: Optional[str] = None
    verification_status: str = "unverified"

class LaboratoryCreate(LaboratoryBase):
    pass

class LaboratoryResponse(LaboratoryBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
