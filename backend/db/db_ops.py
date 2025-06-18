from db.db import chat
from datetime import datetime
from bson import ObjectId
from models.Schema import Chat


def serialize_chat(chat):
    return {
        "id": str(chat["_id"]),
        "question": chat["question"],
        "answer": chat["answer"],
        "asked_at": chat["asked_at"]
    }


async def insert_chat(payload: Chat)-> str:
    result = await chat.insert_one(payload)
    return str(result.inserted_id)

async def get_complete_chat()-> list:
    result = await chat.find({}).to_list()
    chats = [serialize_chat(c) for c in result]
    return chat

async def get_chat(id: str)-> dict:
    if not ObjectId.is_valid(id):
        raise ValueError("Invalid ObjectId")
    result = await chat.find_one({'_id': ObjectId(id)})
    result = serialize_chat(result)
    return result




