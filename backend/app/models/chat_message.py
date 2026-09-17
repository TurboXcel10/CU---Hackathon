import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assessment_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("assessments.id"), index=True, nullable=True)
    
    sender: Mapped[str] = mapped_column(String)
    text: Mapped[str] = mapped_column(Text)
    evidence: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    confidence: Mapped[float | None] = mapped_column(Float, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    assessment: Mapped["Assessment | None"] = relationship("Assessment", back_populates="chat_messages")
