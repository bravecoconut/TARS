from agent.system.configurations.configs.sm import SKILL_PATHS

def system_messages():
    _my_sm = []

    for skill_path in SKILL_PATHS:
        _my_sm.append(open(skill_path).read())

    return _my_sm

