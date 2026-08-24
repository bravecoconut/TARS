from utils import r_h
import json

USER_PATH = "user.json"

def set_srcf_on_length(new_srcf_on_length):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        _user["srcf_on_length"] = int(new_srcf_on_length)

        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)

        return r_h(True, "srcf_on_length set", _user["srcf_on_length"])

    except Exception as e:
        return r_h(False, "can't set srcf_on_length", {"error": e})

def set_srcf_percent(new_srcf_percent):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        _user["srcf_percent"] = new_srcf_percent

        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)

        return r_h(True, "srcf_percent set", _user["srcf_percent"])

    except Exception as e:
        return r_h(False, "can't set srcf_percent", {"error": e})

def set_srcf_last_n(new_srcf_last_n):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        _user["srcf_last_n"] = new_srcf_last_n

        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)

        return r_h(True, "srcf_last_n set", _user["srcf_last_n"])

    except Exception as e:
        return r_h(False, "can't set srcf_last_n", {"error": e})

def set_srcf_threshold(new_srcf_threshold):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        _user["srcf_threshold"] = new_srcf_threshold

        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)

        return r_h(True, "srcf_threshold set", _user["srcf_threshold"])

    except Exception as e:
        return r_h(False, "can't set srcf_threshold", {"error": e})

