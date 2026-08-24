from utils import r_h
import json

USER_PATH = "user.json"


def get_tones():
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        tones = []
        for tone in _user["avail_tones"].keys():
            tones.append(tone)

        return r_h(True, "get tones", tones)

    except Exception as e:
        return r_h(False, "can't get tones", {"error": e})

def set_curr_tone(new_curr_tone):
    try:
        with open(USER_PATH) as file:
            _user = json.load(file)

        _tones = get_tones()

        if not _tones["status"]:
            raise Exception(f"somthing went wrong while getting tones: \n{_tones}")
            
        if new_curr_tone in _tones["data"]:
            _user["curr_tone"] = new_curr_tone
            with open(USER_PATH, "w") as file:
                json.dump(_user, file, indent=4)
            return r_h(True, "curr_tone set", _user["curr_tone"])

        else:
            raise Exception("no tone exists with that name!")
    except Exception as e:
        return r_h(False, "can't set curr_tone", {"error": e})
