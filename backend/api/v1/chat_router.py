from fastapi import APIRouter, Body, HTTPException
from models.Schema import Question, Chat, Answer
from db.db_ops import insert_chat, get_complete_chat, get_chat
from typing import List

router = APIRouter()

@router.post('/api/chat', response_model=Answer)
async def handle_question(question: Question = Body(...)):
    answer = f"This is a stubbed response to: {question.question}"  
    chat = Chat(question=question.question, answer=answer)  
    id = await insert_chat(chat.model_dump())
    return {
        "id": id,
        "answer": answer
    }

@router.get("/api/chat", response_model=List[Chat])
async def get_all_chat():
    chats = await get_complete_chat()
    return chats

@router.get("/api/chat/{chat_id}", response_model=Chat)
async def get_chat_by_id(chat_id: str):
    chat = await get_chat(chat_id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat








