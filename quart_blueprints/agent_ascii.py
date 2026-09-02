from quart import Blueprint, request, jsonify
from agent_backend.ascii.dump_new_file import dump_new_file_in_session
from agent_backend.chroma.dump import (
    delete_using_meta,
    get_counts,
)
from utils import get_sec_key, r_h, validate_sec_key
import json
from agent.system.configurations.configs.skills import (
    BASE_COLLECTION_NAME,
)
from backend.delete.session import delete_session_paths

agent_ascii_bp = Blueprint("agent_ascii", __name__, url_prefix="/api/agent/ascii")


#################
##### POST ######
#################


@agent_ascii_bp.route("/dump_new", methods=["POST"])
async def _dump_new():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")
        _file_abslt_path = data.get("file_abslt_path")
        _cha_per_chunk = data.get("cha_per_chunk")
        _overlap = data.get("overlap")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not _file_abslt_path or not isinstance(_file_abslt_path, str):
            return r_h(False, "file abslt path must be non empty 'string'")

        if not _cha_per_chunk or not isinstance(_cha_per_chunk, int):
            return r_h(
                False,
                "_character per chunk must be `int` and greater than zero",
            )

        if not _overlap or not isinstance(_overlap, int):
            return r_h(False, "overlap must be `int` and greater than zero")

        _result = await dump_new_file_in_session(
            session_id=_session_id,
            file_abslt_path=_file_abslt_path,
            cha_per_chunk=_cha_per_chunk,
            overlap=_overlap,
        )

        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while dumping new data", str(e))
        )


@agent_ascii_bp.route("/clear_session_vectors", methods=["POST"])
async def _clear_session_vectors():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        _result = delete_using_meta(
            collec_name=BASE_COLLECTION_NAME,
            metadatas={"session_id": _session_id},
        )

        _clear_paths = await delete_session_paths(session_id=_session_id)

        return jsonify(
            r_h(
                True,
                "session cleared",
                {
                    "result": _result,
                    "clear": _clear_paths,
                },
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while clearing session vectors",
                str(e),
            )
        )


@agent_ascii_bp.route("/get_session_vector_counts", methods=["POST"])
async def _get_session_vector_counts():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        _result = get_counts(
            collec_name=BASE_COLLECTION_NAME, metadatas={"session_id": _session_id}
        )

        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while getting session vector counts",
                str(e),
            )
        )
