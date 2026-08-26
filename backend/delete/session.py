import shutil
from pathlib import Path
from utils import r_h
from models.sessions import Sessions
from beanie import PydanticObjectId


async def delete_session(session_id):
    try:
        _session = await Sessions.get(session_id)

        if not _session:
            return r_h(
                False,
                "Error occured when creating a deleting session",
                "seems like no session exists with that session id",
            )
        _result = await _session.delete()

        return r_h(True, "session deleted", str(_result))
    except Exception as e:
        return r_h(False, "Error occured when creating a deleting session", str(e))


async def delete_session_paths(session_id):
    try:
        _session = await Sessions.get(session_id)

        if not _session:
            return r_h(
                False,
                "Error occured when creating a deleting session",
                "seems like no session exists with that session id",
            )
        _session.dumped_paths = []
        _result = await _session.save()

        return r_h(True, "session paths deleted", str(_result))
    except Exception as e:
        return r_h(False, "Error occured when creating a deleting session paths", str(e))


if __name__ == "__main__":
    from db import init_db
    import asyncio
    import time

    async def main():
        await init_db()
        result = await delete_session_paths(
            "6a8f252013f20d7c69a7a378",
        )
        print(result)

    asyncio.run(main())
