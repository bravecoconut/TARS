from utils import r_h
import json

USER_PATH = "user.json"


def set_base_url(base_url):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["base_url"] = base_url
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "base url changed")
    except Exception as e:
        return r_h(False, "base url can't changed", {"error": e})


def set_api_key(api_key):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["api_key"] = api_key
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "api key changed")
    except Exception as e:
        return r_h(False, "api key can't changed", {"error": e})


def set_model(model):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["model"] = model
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "model changed")
    except Exception as e:
        return r_h(False, "model can't changed", {"error": e})


def set_em_model(em_model):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["embedding_model"] = em_model
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "model changed")
    except Exception as e:
        return r_h(False, "model can't changed", {"error": e})


def set_mct(mct):  # max_completion_tokens
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["max_completion_tokens"] = int(mct)
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "max completion tokens changed")
    except Exception as e:
        return r_h(False, "max completion tokens can't changed", {"error": e})


def set_max_retries(max_retries):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["max_retries"] = max_retries
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "max_retries changed")
    except Exception as e:
        return r_h(False, "max_retries can't changed", {"error": e})


def set_timeout(timeout):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)
        _user["timeout"] = timeout
        with open(USER_PATH, "w") as file:
            json.dump(_user, file, indent=4)
        return r_h(True, "timeout changed")
    except Exception as e:
        return r_h(False, "timeout can't changed", {"error": e})
