
from pymongo import AsyncMongoClient
from beanie import init_beanie
from dotenv import load_dotenv
load_dotenv()
import os

async def init_db():
    client = AsyncMongoClient(os.getenv("MONGO_CLIENT"))
    await init_beanie(
        database=client.TARS,
        document_models=[],
    )