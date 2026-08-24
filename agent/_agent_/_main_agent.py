from fluid.regular_interface.interface import RegularInterface
from fluid.regular_interface.srcf import SRCF
from agent.system.configurations.system_messages import system_messages, tone_temp
from agent.system.configurations.configs.skills import OS_AGENT_SKILL
from agent.system.configurations.configs.settings import ALL_TOOLS
import os
from dotenv import load_dotenv
import json
load_dotenv()

from agent.system.configurations.configs.open_configs import (
    TOOL_CHOICE,
    HTTP_CLIENT,
    DEFAULT_HEADERS,
)
import time

class _Main_Agent:
    def __init__(self, messages):
        with open("user.json") as file:
            self._user = json.load(file)
        self.srcf = None

        if len(messages) > self._user["srcf_on_length"]:
            self.srcf = SRCF(
                srcf_percent=int(self._user["srcf_percent"]),
                srcf_last_n=int(self._user["srcf_last_n"]),
                srcf_threshold=float(self._user["srcf_threshold"]),
            ).srcf_go(messages=messages)

        self.ri = RegularInterface(
            messages=messages,
            sys_messages=system_messages(),
            skills=OS_AGENT_SKILL,
            max_new_skill=os.getenv("MAX_NEW_SKILLS"),
            all_tools=ALL_TOOLS,
            max_turns=int(os.getenv("MAX_TURNS")),
            srcf=self.srcf,
        )
        print(1)
        time.sleep(5)

    def events(self):
        # self.ri._debug_agent()
        yield from self.ri.run_agent(
            base_url=self._user["base_url"],
            api_key=self._user["api_key"],
            model=self._user["model"],
            tool_choice=TOOL_CHOICE,
            timeout=int(self._user["timeout"]),
            max_retires=int(self._user["max_retries"]),
            http_client=HTTP_CLIENT,
            default_headers=DEFAULT_HEADERS,
            max_complition_tokens=int(self._user["max_completion_tokens"]),
            temperature=float(tone_temp()),
        )
