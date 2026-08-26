from pathlib import Path
import os
from utils import r_h, make_file_chunks
from agent_backend.chroma.dump import dump_in
from agent.system.configurations.configs.skills import (
    BASE_COLLECTION_NAME,
)
from models.sessions import Sessions
from beanie import PydanticObjectId
from backend.upload.session_uploads import add_new_path
import json
import copy


async def dump_new_file_in_session(
    session_id,
    file_abslt_path,
    cha_per_chunk=100,
    overlap=30,
):
    try:
        if not Path(file_abslt_path).exists():
            return r_h(False, "file not exists")

        _chunks = make_file_chunks(
            file_abslt_path=file_abslt_path,
            cha_per_chunk=cha_per_chunk,
            overlap=overlap,
            collection_name=BASE_COLLECTION_NAME,
        )

        if not _chunks["status"]:
            return r_h(
                False,
                "something went wrong while dumping into session",
                _chunks,
            )

        _len_of_docs = len(_chunks["data"]["documents"])
        session_dict = {"session_id": session_id}
        _metadatas = [copy.deepcopy(session_dict) for _ in range(_len_of_docs)]

        dump_file = dump_in(
            documents=_chunks["data"]["documents"],
            ids=_chunks["data"]["ids"],
            collec_name=BASE_COLLECTION_NAME,
            metadatas=_metadatas,
        )

        if not dump_file["status"]:
            return r_h(
                False,
                "something went wrong while dumping into session",
                dump_file,
            )

        _save_path = await add_new_path(
            session_id=session_id,
            path=file_abslt_path,
        )

        if not _save_path["status"]:
            return r_h(
                False,
                "something went wrong while saving path",
                _save_path,
            )

        return r_h(
            True,
            "file dumped and saved",
            {
                "dumped": dump_file,
                "saved": _save_path,
            },
        )
    except Exception as e:
        return r_h(False, "something went wrong while dumping into session", e)


if __name__ == "__main__":
    from db import init_db
    import asyncio

    async def startup():
        await init_db()
        r = await dump_new_file_in_session(
            "6a8f0e7690b134d8503f57b5",
            "/home/loki/Documents/bariana.txt",
        )
        return r

    print(asyncio.run(startup()))
