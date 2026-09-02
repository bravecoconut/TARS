from quart import Blueprint, request, jsonify
from agent_settings.srcf import (
    set_srcf_on_length,
    set_srcf_percent,
    set_srcf_last_n,
    set_srcf_threshold,
)
from utils import get_sec_key, r_h, validate_sec_key
import json

user_srcf_bp = Blueprint("user_srcf", __name__, url_prefix="/api/user/srcf")


################
##### POST #####
################


@user_srcf_bp.route("/update_srcf_on_length", methods=["POST"])
async def update_srcf_on_length():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_srcf_on_length = data.get("srcf_on_length")

        if not _new_srcf_on_length or not isinstance(_new_srcf_on_length, int):
            return r_h(False, "srcf on length must be `int` and greater than zero")

        _result = set_srcf_on_length(new_srcf_on_length=int(_new_srcf_on_length))
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating srcf on length", str(e))
        )


@user_srcf_bp.route("/update_srcf_percent", methods=["POST"])
async def update_srcf_percent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_srcf_percent = data.get("srcf_percent")

        if (
            not isinstance(_new_srcf_percent, (int, float))
            or isinstance(_new_srcf_percent, bool)
            or _new_srcf_percent <= 0
        ):
            return r_h(False, "srcf percent must be `int` and greater than zero")

        _result = set_srcf_percent(new_srcf_percent=_new_srcf_percent)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating srcf percent", str(e))
        )


@user_srcf_bp.route("/update_srcf_last_n", methods=["POST"])
async def update_srcf_last_n():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_srcf_last_n = data.get("srcf_last_n")

        if not _new_srcf_last_n or not isinstance(_new_srcf_last_n, int):
            return r_h(False, "srcf last n must be `int` and greater than zero")

        _result = set_srcf_last_n(new_srcf_last_n=int(_new_srcf_last_n))
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating srcf last n", str(e))
        )


@user_srcf_bp.route("/update_srcf_threshold", methods=["POST"])
async def update_srcf_threshold():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        data = await request.get_json(silent=True)
        _new_srcf_threshold = data.get("srcf_threshold")

        if (
            not isinstance(_new_srcf_threshold, (int, float))
            or isinstance(_new_srcf_threshold, bool)
            or _new_srcf_threshold <= 0
        ):
            return r_h(False, "srcf threshold must be `int` or `float` and greater than zero")

        _result = set_srcf_threshold(new_srcf_threshold=_new_srcf_threshold)
        return jsonify(_result)
    except Exception as e:
        return jsonify(
            r_h(False, "something went wrong while updating srcf threshold", str(e))
        )
