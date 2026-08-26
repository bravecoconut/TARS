import json

SKILL_NAME = "OS"
SKILL_DEFAULT = True
SKILL_TEMPLATE = "This is your OS skill. Use these tools for you operations\n{placeholder}"
SKILL_DB_PATH = "TARS_DB"

BASE_COLLECTION_NAME = "base"
OS_COLLECTION_NAME = "OS"

BASE_MAX_RESULT = 3
OS_MAX_RESULT = 3

BASE_THRESHOLD = 2.0
OS_THRESHOLD = 2.0

BASE_COLLECTION_TEMPLATE = "RELEVANT KNOWLEDGE FROM USER:\n{placeholder}"
OS_COLLECTION_TEMPLATE = "RELEVANT KNOWLEDGE FROM SKILL:\n{placeholder}"


def get_skill(meta: dict = None):
    with open("user.json") as file:
        _user = json.load(file)
        
    os_agent_skill = [
        {
            "name": SKILL_NAME,
            "default": SKILL_DEFAULT,
            "template": SKILL_TEMPLATE,
            "collections": [
                {
                    "name": BASE_COLLECTION_NAME,
                    "max_result": BASE_MAX_RESULT,
                    "threshold": BASE_THRESHOLD,
                    "meta": meta,
                    "collec_template": BASE_COLLECTION_TEMPLATE,
                    "em_setup": {
                        "openai_embed": {
                            "base_url": _user["base_url"],
                            "api_key": _user["api_key"],
                            "model": _user["embedding_model"],
                        },
                    },
                },
                {
                    "name": OS_COLLECTION_NAME,
                    "max_result": OS_MAX_RESULT,
                    "threshold": OS_THRESHOLD,
                    "collec_template": OS_COLLECTION_TEMPLATE,
                    "em_setup": {
                        "openai_embed": {
                            "base_url": _user["base_url"],
                            "api_key": _user["api_key"],
                            "model": _user["embedding_model"],
                        },
                    },
                },
            ],
            "backend": {
                "persistent_backend": {
                    "path": SKILL_DB_PATH,
                },
            },
        }
    ]

    return os_agent_skill
