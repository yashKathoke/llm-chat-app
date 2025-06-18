import datetime
from pydantic import BaseModel, Field, field_validator

class Question(BaseModel):
    question: str = Field(..., min_length=1)
    
    @field_validator("question")
    def not_blank(cls, value):
        if not value.strip():
            raise ValueError("Question cannot be empty")
        return value

class Chat(BaseModel):
    question: str = Field(..., min_length=1)
    answer: str
    asked_at: datetime = Field(default_factory=datetime.now)


