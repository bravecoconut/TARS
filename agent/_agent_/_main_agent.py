from fluid.regular_interface.interface import RegularInterface
from fluid.regular_interface.srcf import SRCF
from agent.system.configurations.system_messages import system_messages, tone_temp
from agent.system.configurations.configs.skills import get_skill
from agent.system.configurations.configs.settings import ALL_TOOLS
import os
from dotenv import load_dotenv
import json
import asyncio
import queue as sync_queue
import threading

load_dotenv()

from agent.system.configurations.configs.open_configs import (
    TOOL_CHOICE,
    HTTP_CLIENT,
    DEFAULT_HEADERS,
)
import time
from chromadb.utils import embedding_functions


class _Main_Agent:
    def __init__(self, messages, meta=None):
        with open("user.json") as file:
            self._user = json.load(file)
        self.srcf = None

        if len(messages) > self._user["srcf_on_length"]:
            self.srcf = SRCF(
                srcf_percent=int(self._user["srcf_percent"]),
                srcf_last_n=int(self._user["srcf_last_n"]),
                srcf_threshold=float(self._user["srcf_threshold"]),
                embedding_function=embedding_functions.OpenAIEmbeddingFunction(
                    api_key=self._user["api_key"],
                    api_base=self._user["base_url"],
                    model_name=self._user["embedding_model"],
                )
            )

        self.ri = RegularInterface(
            messages=messages,
            sys_messages=system_messages(),
            skills=get_skill(meta=meta),
            max_new_skill=os.getenv("MAX_NEW_SKILLS"),
            all_tools=ALL_TOOLS,
            max_turns=int(os.getenv("MAX_TURNS")),
            srcf=self.srcf,
        )
        print(1)
        time.sleep(5)

    async def events(self):
        """
        Async version of the agent event stream.

        The actual agent loop (self.ri.run_agent) runs on ONE dedicated
        background thread for the lifetime of this call. That thread can
        block freely (network calls, multiprocessing Queue.get(), etc.)
        without ever freezing the main event loop — so other sessions'
        code, and this session's own SSE/queue delivery, stay responsive
        the whole time.
        """
        # self.ri._debug_agent()
        thread_queue = sync_queue.Queue()

        def _blocking_produce():
            try:
                for event in self.ri.run_agent(
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
                ):
                    thread_queue.put(event)
            except Exception as e:
                thread_queue.put(e)  # let the consumer side see and raise it
            finally:
                thread_queue.put(None)  # sentinel — signals "no more events"

        # Starts running immediately, on its own thread.
        thread = threading.Thread(target=_blocking_produce, daemon=True)
        thread.start()

        loop = asyncio.get_running_loop()
        while True:
            item = await loop.run_in_executor(None, thread_queue.get)

            if item is None:
                break

            if isinstance(item, Exception):
                raise item

            yield item
