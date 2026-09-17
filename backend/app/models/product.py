import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_name: Mapped[str] = mapped_column(String, index=True)
    description: Mapped[str] = mapped_column(String)
    material: Mapped[str] = mapped_column(String)
    capacity: Mapped[str] = mapped_column(String)
    intended_use: Mapped[str] = mapped_column(String)
    reusable: Mapped[bool] = mapped_column(Boolean, default=True)
    manufacturing_location: Mapped[str] = mapped_column(String)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    assessments: Mapped[list["Assessment"]] = relationship("Assessment", back_populates="product", cascade="all, delete-orphan")
