import asyncio
from db.db_ops import insert_chat, get_chats

async def main():
    chats = await get_chats()
    for chat in chats:
        print(chat)

if __name__ == "__main__":
    asyncio.run(main())
