from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.collection import Collection

from config import MONGO_URI, MONGO_DB_NAME

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]


#collections here

chat: Collection = db["chats"]