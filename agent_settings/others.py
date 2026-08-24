from utils import r_h
import json

USER_PATH = "user.json"

def set_name(new_name):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        _user["name"] = new_name

        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)

        return r_h(True, "name set", _user["name"])

    except Exception as e:
        return r_h(False, "can't set name", {"error": e})

