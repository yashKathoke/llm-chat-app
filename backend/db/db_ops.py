from db.db import chat
from datetime import datetime
from bson import ObjectId
from models.Schema import Chat


def serialize_chat(chat):
    return {
        "_id": str(chat["_id"]),
        "question": chat["question"],
        "answer": chat["answer"],
        "asked_at": chat["asked_at"]
    }


async def insert_chat():
    doc = {
        "question": "how are you?",
        "answer": "nice!!",
        "asked_at": datetime.now()

    }
    result = await chat.insert_one(doc)
    return str(result.inserted_id)

async def get_chats():
    chats = await chat.find().to_list()
    result = [serialize_chat(c) for c in chats]
    return result

async def get_chat(id: str):
    result = await chat.find_one({"_id": ObjectId(id)})


