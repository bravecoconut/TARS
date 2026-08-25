import json
import sys
from utils import get_sec_key

def set_sec_key(new_key):
    with open("user.json") as file:
        _user = json.load(file)

    _user["sec_key"] = new_key

    with open("user.json", "w") as file:
        json.dump(_user, file, indent=4)

    print(f"new secret key is *****{get_sec_key()[-3:]}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 set_key.py <new_key>")
    else:
        new_key = sys.argv[1]
        set_sec_key(new_key)

# python3 -m set_secret_key [ NEW KEY ]