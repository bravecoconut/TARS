from quart import Blueprint, request, jsonify
from backend.upload.session_uploads import create_new_session, create_new_message
from backend.update.session import change_name, toggle_pin, update_last_user_message
from backend.gather.session import get_session, check_session
from utils import get_sec_key, r_h, validate_sec_key
import json

sessions_bp = Blueprint("sessions", __name__, url_prefix="/api/sessions")


#################
##### post ######
#################


@sessions_bp.route("/create_new_session", methods=["POST"])
async def create_session():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_session_name = data.get("name") if data.get("name") else None

        _result = await create_new_session(name=str(_new_session_name))
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while creating session", str(e)))


@sessions_bp.route("/create_new_message", methods=["POST"])
async def create_message():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_message = data.get("message")
        _session_id = data.get("session_id")

        if not _new_message or not _session_id:
            return r_h(
                False, "message or session_id must be non empty 'dict and string'"
            )

        _result = await create_new_message(session_id=_session_id, message=_new_message)
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while creating message", str(e)))


@sessions_bp.route("/change_session_name", methods=["POST"])
async def change_session_name():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_name = data.get("name")
        _session_id = data.get("session_id")

        if not _new_name or not _session_id:
            return r_h(False, "name or session_id must be non empty 'string'")

        _result = await change_name(session_id=_session_id, new_name=_new_name)
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while chaning name", str(e)))


@sessions_bp.route("/toggle_session_pin", methods=["POST"])
async def toggle_session_pin():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id:
            return r_h(False, "session_id must be non empty 'string'")

        _result = await toggle_pin(session_id=_session_id)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while toggleing session pin", str(e))
        )


# toggle_streaming is server responsibilty, that's why it don't has any route.


@sessions_bp.route("/update_last_user_message", methods=["POST"])
async def _update_last_user_message():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_message = data.get("message")
        _session_id = data.get("session_id")

        if not _new_message or not _session_id:
            return r_h(
                False, "message or session_id must be non empty 'dict and string'"
            )

        _result = await update_last_user_message(
            session_id=_session_id, new_message=_new_message
        )
        print(_result)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating last user message", str(e))
        )


@sessions_bp.route("/get_session", methods=["POST"])
async def _get_session():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        start_m = data.get("start_m")
        end_m = data.get("end_m")
        _session_id = data.get("session_id")

        if not _session_id:
            return r_h(False, "session_id must be non empty 'string'")

        _result = await get_session(session_id=_session_id, start=start_m, end=end_m)
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while getting session", str(e)))
