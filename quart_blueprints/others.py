from quart import Blueprint, request, jsonify
from agent_settings.instructions import get_instructions, update_instructions
from agent_settings.memory import get_memory, update_memory
from agent_settings.tone import get_tones, set_curr_tone
from agent_settings.others import set_name
from utils import get_sec_key, r_h, validate_sec_key
import json

user_others_bp = Blueprint("user_others", __name__, url_prefix="/api/user/others")


###############
##### GET #####
###############


@user_others_bp.route("/get_instructions", methods=["GET"])
async def _get_instructions():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        _result = get_instructions()
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while getting instructions", str(e))
        )


@user_others_bp.route("/get_memory", methods=["GET"])
async def _get_memory():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        _result = get_memory()
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while getting memory", str(e)))


@user_others_bp.route("/get_tones", methods=["GET"])
async def _get_tones():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        _result = get_tones()
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while getting tones", str(e)))

@user_others_bp.route("/get_whole_user", methods=["GET"])
async def _get_whole_user():
    try:
        print(request.cookies.get("sec_key"))
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        with open("user.json") as file:
            _result = json.load(file)
        return jsonify(r_h(True,"request processed", _result))
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while getting tones", str(e)))

################
##### POST #####
################


@user_others_bp.route("/set_name", methods=["POST"])
async def _set_name():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_name = data.get("name")

        if not _new_name or not isinstance(_new_name, str):
            return r_h(False, "name must be non empty 'string'")

        _result = set_name(new_name=_new_name)
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while updating name", str(e)))


@user_others_bp.route("/update_instructions", methods=["POST"])
async def _update_instructions():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_instructions = data.get("instructions")

        if not _new_instructions or not isinstance(_new_instructions, str):
            return r_h(False, "instructions must be non empty 'string'")

        _result = update_instructions(new_instructions=_new_instructions)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating instructions", str(e))
        )


@user_others_bp.route("/update_memory", methods=["POST"])
async def _update_memory():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_memory = data.get("memory")

        if not _new_memory or not isinstance(_new_memory, str):
            return r_h(False, "memory must be non empty 'string'")

        _result = update_memory(new_memory=_new_memory)
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while updating memory", str(e)))


@user_others_bp.route("/set_curr_tone", methods=["POST"])
async def _set_curr_tone():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_curr_tone = data.get("curr_tone")

        if not _new_curr_tone or not isinstance(_new_curr_tone, str):
            return r_h(False, "current tone must be non empty 'string'")

        _result = set_curr_tone(new_curr_tone=_new_curr_tone)
        print(_result)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating current tone", str(e))
        )
