import shutil
from pathlib import Path
from utils import r_h
from models.sessions import Sessions
from beanie import PydanticObjectId


async def create_new_session(name=None):
    try:
        new_session = Sessions(
            name=name if name else "no name provided",
        )

        _result = await new_session.insert()

        return r_h(True, "new session created", str(_result))
    except Exception as e:
        return r_h(False, "Error occured when creating a new session", str(e))


async def create_new_message(session_id, message):
    try:
        session = await Sessions.get(session_id)
        session.messages.append(message)
        _result = await session.save()

        return r_h(True, "new message added", str(_result))
    except Exception as e:
        return r_h(False, "Error occured when adding a new message", str(e))


if __name__ == "__main__":
    from db import init_db
    import asyncio
    import time

    async def main():
        await init_db()
        result = await create_new_session(
            "6a8d47b3e521351855556c50",
        # {
        #     "role": "assistant",
        #     "content": "how can i assist you today",
        #     "created": "",
        # },

        )
        print(result)

    asyncio.run(main())
