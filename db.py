from pymongo import AsyncMongoClient
from beanie import init_beanie
from models.sessions import Sessions


async def init_db():
    client = AsyncMongoClient("mongodb://localhost:27017")
    await init_beanie(
        database=client.TARS,
        document_models=[Sessions],
    )
