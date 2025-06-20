
from fastapi import FastAPI
from api.v1.chat_router import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from config import FRONTEND_URL

app =FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)



@app.get('/')
async def handle():
    return {
        "msg": "this is / "
    }