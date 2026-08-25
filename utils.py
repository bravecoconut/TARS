import json


def r_h(status=None, comment=None, data=None):
    return {
        "status": status,
        "comment": comment,
        "data": data,
    }


def get_sec_key():
    with open("user.json") as file:
        _user = json.load(file)
    return _user.get("sec_key")


def validate_sec_key(sec_key):
    if get_sec_key() != str(sec_key):
        return r_h(
            False,
            "you passed wrong sec key",
            """'Get the hell out of here.' if not user else `try to new key`""",
        )
    else:
        return r_h(
            True,
            "you correct sec key",
        )
