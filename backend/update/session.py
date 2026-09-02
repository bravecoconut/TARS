from utils import r_h
from models.sessions import Sessions
from beanie import PydanticObjectId


async def change_name(session_id, new_name):
    try:
        session = await Sessions.get(PydanticObjectId(session_id))
        if session is None:
            return r_h(
                False,
                f"no post exists with '{session_id}'",
            )

        session.name = str(new_name)
        _result = await session.save()

        return r_h(
            True,
            "session name updated",
            _result.name,
        )
    except Exception as e:
        return r_h(False, "Error occured when changing session name", str(e))


async def toggle_pin(session_id):
    try:
        session = await Sessions.get(PydanticObjectId(session_id))
        if session is None:
            return r_h(
                False,
                f"no post exists with '{session_id}'",
            )

        session.pin = False if session.pin else True
        _result = await session.save()

        return r_h(
            True,
            "pin toggled",
            _result.pin,
        )
    except Exception as e:
        return r_h(False, "Error occured when toggleing pin", str(e))


async def toggle_streaming(session_id):
    try:
        session = await Sessions.get(PydanticObjectId(session_id))
        if session is None:
            return r_h(
                False,
                f"no post exists with '{session_id}'",
            )

        session.streaming = False if session.streaming else True
        _result = await session.save()

        return r_h(
            True,
            "streaming toggled",
            _result.streaming,
        )
    except Exception as e:
        return r_h(False, "Error occured when toggleing pin", str(e))


async def update_last_user_message(session_id, new_message):
    try:
        try:
            session = await Sessions.get(PydanticObjectId(session_id))
        except Exception as e:
            return r_h(False, "no session exists with that session id or something went wrong", session_id)

        if session is None:
            return r_h(
                False,
                f"no session exists with '{session_id}'",
            )

        user_index, user_messages = None, None
        for index, um in reversed(list(enumerate(session.messages))):
            if um.get("role") == "user":
                user_index, user_messages = index, um
                break

        session.messages[user_index] = new_message
        del session.messages[user_index + 1 :]
        _result = await session.save()

        return r_h(
            True,
            "last message changed",
            _result.messages[user_index]

        )
    except Exception as e:
        return r_h(False, "Error occured when changing last message", str(e))


if __name__ == "__main__":
    from db import init_db
    import asyncio

    async def main():
        await init_db()
        result = await update_last_user_message(
            session_id="6a8d47b3e521351855556c50", new_message={"e": 43}
        )
        print(result)

    asyncio.run(main())
