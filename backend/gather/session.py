from pathlib import Path
from utils import r_h
from models.sessions import Sessions
from beanie import PydanticObjectId


async def get_session(session_id, start=1, end=-1):
    try:
        session = await Sessions.get(session_id)
        session_dict = session.model_dump()

        messages = session_dict["messages"]
        end_index = end + 1 if end == -1 else end
        session_dict["messages"] = messages[start - 1:end_index] if end_index != 0 else messages[start - 1:]
        
        return r_h(True, "get session", session_dict)
    except Exception as e:
        return r_h(False, "Error occured when getting session", str(e))


if __name__ == "__main__":
    from db import init_db
    import asyncio
    import time
    import json

    async def main():
        await init_db()
        result = await get_session("6a8d47b3e521351855556c50")
        print(json.dumps(result, indent=4, default=str))

    asyncio.run(main())
