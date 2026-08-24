from utils import r_h
import json

USER_PATH = "user.json"


def get_memory():
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        return r_h(True, "get memory", open(_user["memory_path"]).read())

    except Exception as e:
        return r_h(False, "can't get memory", {"error": e})


def update_memory(new_memory):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        with open(_user["memory_path"], "w") as file:
            file.write(str(new_memory))

        return r_h(True, "memory update", open(_user["memory_path"]).read())

    except Exception as e:
        return r_h(False, "can't update memory", {"error": e})

