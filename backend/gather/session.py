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
        session_dict["messages"] = (
            messages[start - 1 : end_index] if end_index != 0 else messages[start - 1 :]
        )

        return r_h(True, "get session", session_dict)
    except Exception as e:
        return r_h(False, "Error occured when getting session", str(e))


async def get_all_sessions(start=1, end=-1):
    try:
        start = start or 1
        end = end if end is not None else -1

        query = Sessions.find_all().sort("-_id").skip(start - 1)
        if end != -1:
            query = query.limit(end - start + 1)

        sessions = await query.to_list()
        sessions_list = [s.model_dump() for s in sessions]
        for session in sessions_list:
            if session.get("messages"):
                session["messages"] = None

        return r_h(True, "get sessions", sessions_list)
    except Exception as e:
        return r_h(False, "Error occured when getting sessions", str(e))


async def check_session(session_id):
    try:
        session = await Sessions.get(session_id)
        if not session:
            raise Exception("session not exists")

        return r_h(True, "session exists")
    except Exception as e:
        return r_h(
            False,
            "Error occured when getting session, it means session dont exists",
            str(e),
        )


if __name__ == "__main__":
    from db import init_db
    import asyncio
    import time
    import json

    async def main():
        await init_db()
        result = await get_all_sessions()
        print(json.dumps(result, indent=4, default=str))

    asyncio.run(main())
