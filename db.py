from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models.sessions import Sessions

_client = None

async def init_db():
    global _client
    if _client is not None:
        return  # Already initialized
    _client = AsyncIOMotorClient("mongodb://localhost:27017")
    await init_beanie(
        database=_client.TARS,
        document_models=[Sessions],
    )