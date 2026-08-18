from fluid.regular_interface.interface import RegularInterface
from agent.system.configurations.system_messages import system_messages
from agent.system.configurations.configs.skills import OS_AGENT_SKILL
from agent.system.configurations.configs.settings import ALL_TOOLS
import os
from dotenv import load_dotenv

load_dotenv()

from agent.system.configurations.configs.open_configs import (
    TOOL_CHOICE,
    HTTP_CLIENT,
    DEFAULT_HEADERS,
)


class _Main_Agent:
    def __init__(self, messages):
        self.ri = RegularInterface(
            messages=messages,
            sys_messages=system_messages(),
            skills=OS_AGENT_SKILL,
            max_new_skill=os.getenv("MAX_NEW_SKILLS"),
            all_tools=ALL_TOOLS,
            max_turns=int(os.getenv("MAX_TURNS")),
        )

    def events(self):
        yield from self.ri.run_agent(
            base_url=os.getenv("BASE_URL"),
            api_key=os.getenv("API_KEY"),
            model=os.getenv("MODEL"),
            tool_choice=TOOL_CHOICE,
            timeout=int(os.getenv("TIMEOUT")),
            max_retires=int(os.getenv("MAX_RETRIES")),
            http_client=HTTP_CLIENT,
            default_headers=DEFAULT_HEADERS,
            max_complition_tokens=int(os.getenv("MAX_COMPLETION_TOKENS")),
            temperature=float(os.getenv("TEMPERATURE")),
        )
