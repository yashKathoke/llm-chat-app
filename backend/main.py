
from fastapi import FastAPI
from api.v1.chat_router import router as chat_router





app =FastAPI()

app.include_router(chat_router)

@app.get('/')
async def handle():
    return {
        "msg": "this is / "
    }