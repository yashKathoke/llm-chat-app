from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from typing import Optional

class Question(BaseModel):
    question: str = Field(..., min_length=1)
    
    @field_validator("question")
    def not_blank(cls, value):
        if not value.strip():
            raise ValueError("Question cannot be empty")
        return value

class Chat(BaseModel):
    id: Optional[str] = None
    question: str = Field(..., min_length=1)
    answer: str
    asked_at: datetime = Field(default_factory=datetime.now)


class Answer(BaseModel):
    answer: str