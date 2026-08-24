from agent.system.configurations.configs.sm import SKILL_PATHS
import json


def skills_system_message():
    _my_sm = []
    for skill_path in SKILL_PATHS:
        _my_sm.append(open(skill_path).read())
    return _my_sm


def tone_system_message():
    with open("user.json") as file:
        da = json.load(file)
    tone = da["avail_tones"][da["curr_tone"]]
    return open(tone["path"]).read()

def tone_temp():
    with open("user.json") as file:
        da = json.load(file)
    tone = da["avail_tones"][da["curr_tone"]]
    return tone["temp"]


def name_system_message():
    with open("user.json") as file:
        da = json.load(file)
    _unsm = str(open("agent/system/markdowns/user_name_sm.md").read())
    usnm = _unsm.format(user_name=da["name"])
    return usnm

def instructions_system_message():
    with open("user.json") as file:
        da = json.load(file)
    _ism = str(open(da["instructions_path"]).read())
    inm = open("agent/system/markdowns/user_instruct_sm.md").read().format(user_ins=_ism)
    return inm

def memory_system_message():
    with open("user.json") as file:
        da = json.load(file)
    _msm = str(open(da["memory_path"]).read())
    mnm = open("agent/system/markdowns/user_memory.md").read().format(user_memory=_msm)
    return mnm

def set_memory_system_message():
    with open("user.json") as file:
        da = json.load(file)
    smsm = str(open(da["set_memory_sm_path"]).read())
    return smsm

def system_messages():
    sm=[]
    sm.extend(skills_system_message())
    sm.append(tone_system_message())
    sm.append(name_system_message())
    sm.append(instructions_system_message())
    sm.append(memory_system_message())
    sm.append(set_memory_system_message())
    return sm

print(json.dumps(system_messages(), indent=4))