import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Laboratory(Base):
    __tablename__ = "laboratories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String)
    state: Mapped[str] = mapped_column(String, index=True)
    city: Mapped[str] = mapped_column(String, index=True)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    capability: Mapped[str] = mapped_column(Text)
    applicable_standards: Mapped[dict | list | None] = mapped_column(JSONB, nullable=True)
    distance_mock: Mapped[str | None] = mapped_column(String, nullable=True)
    source_url: Mapped[str | None] = mapped_column(String, nullable=True)
    verification_status: Mapped[str] = mapped_column(String, default="unverified")
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
