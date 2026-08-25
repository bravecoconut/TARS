from quart import Blueprint, request, jsonify
from agent_settings.client import (
    set_api_key,
    set_base_url,
    set_model,
    set_mct,
    set_max_retries,
    set_timeout,
)
from utils import get_sec_key, r_h, validate_sec_key
import json

user_client_bp = Blueprint("user_client", __name__, url_prefix="/api/user/client")


################
##### POST #####
################


@user_client_bp.route("/update_base_url", methods=["POST"])
async def update_base_url():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_base_url = data.get("base_url")

        if not _new_base_url:
            return r_h(False, "base url must be non empty 'string'")

        _result = set_base_url(base_url=_new_base_url)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating base url", str(e))
        )


@user_client_bp.route("/update_api_key", methods=["POST"])
async def update_api_key():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_api_key = data.get("api_key")

        if not _new_api_key:
            return r_h(False, "api key must be non empty 'string'")

        _result = set_api_key(api_key=_new_api_key)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating api key", str(e))
        )


@user_client_bp.route("/update_model", methods=["POST"])
async def update_model():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_model = data.get("model")

        if not _new_model:
            return r_h(False, "model must be non empty 'string'")

        _result = set_model(model=_new_model)
        return jsonify(_result)
    except Exception as e:
        return jsonify(r_h(False, "something went wrong while updating model", str(e)))


@user_client_bp.route("/update_mct", methods=["POST"])
async def update_mct():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_mct = data.get("mct")

        if not _new_mct or not isinstance(_new_mct, int):
            return r_h(False, "mct must be 'int' and greater than zero")

        _result = set_mct(mct=int(_new_mct))
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while updating mct",
                str(e),
            )
        )


@user_client_bp.route("/update_max_retries", methods=["POST"])
async def update_max_retries():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_max_retries = data.get("max_retries")

        if not _new_max_retries or not isinstance(_new_max_retries, int):
            return r_h(False, "max retries must be 'int' and greater than zero")

        _result = set_max_retries(max_retries=int(_new_max_retries))
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while updating max retries",
                str(e),
            )
        )


@user_client_bp.route("/update_timeout", methods=["POST"])
async def update_timeout():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_timeout = data.get("timeout")

        if not _new_timeout or not isinstance(_new_timeout, int):
            return r_h(False, "timeout must be 'int' and greater than zero")

        _result = set_timeout(timeout=int(_new_timeout))
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while updating timeout",
                str(e),
            )
        )
