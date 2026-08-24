from utils import r_h
import json

USER_PATH = "user.json"


def get_instructions():
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        return r_h(True, "get instructions", open(_user["instructions_path"]).read())

    except Exception as e:
        return r_h(False, "can't get instructions", {"error": e})


def update_instructions(new_instructions):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        with open(_user["instructions_path"], "w") as file:
            file.write(str(new_instructions))

        return r_h(True, "instructions update", open(_user["instructions_path"]).read())

    except Exception as e:
        return r_h(False, "can't update instructions", {"error": e})

