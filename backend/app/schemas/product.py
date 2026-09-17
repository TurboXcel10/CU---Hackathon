import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class ProductBase(BaseModel):
    product_name: str
    description: str
    material: str
    capacity: str
    intended_use: str
    reusable: bool = True
    manufacturing_location: str

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
