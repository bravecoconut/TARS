from agent._agent_._main_agent import _Main_Agent
import uuid
from utils import (
    r_h,
    make_tool_termination_message_after,
    make_tool_termination_message_before,
)
from backend.upload.session_uploads import create_new_message
from db import init_db
import time
import traceback
import os
import signal
import asyncio


class SessionBroadcaster:
    """One instance per running agent session. Every connected listener
    gets its own private queue and a copy of every event — listeners
    never compete for the same item, so switching sessions and coming
    back never steals events from (or corrupts) another connection."""

    def __init__(self):
        self._subscribers: set[asyncio.Queue] = set()

    def subscribe(self) -> asyncio.Queue:
        q = asyncio.Queue()
        self._subscribers.add(q)
        return q

    def unsubscribe(self, q: asyncio.Queue):
        self._subscribers.discard(q)

    async def publish(self, event):
        # fan the SAME event out to every currently-connected listener's own queue
        for q in list(self._subscribers):
            await q.put(event)


class Agents:
    def __init__(self, create_message):
        self.our_agents = {}
        self.last_reasoning_buffer = ""
        self.last_content_buffer = ""
        self.create_message = create_message

    async def _save_in_db(self, message: dict, session_id: str):
        try:
            _save_ = await self.create_message(
                session_id=session_id,
                message=message,
            )

            if not _save_["status"]:
                return r_h(False, "can't save message", _save_)

            return r_h(True, "message saved", _save_)
        except Exception as e:
            return r_h(
                False,
                "can't save message",
            )

    async def _save_res_con(self, event, session_id):
        try:
            if self.last_reasoning_buffer:
                new_message = {
                    "role": "_assistant",
                    "_agent_reasoning": self.last_reasoning_buffer,
                    "turn": event["turn"],
                    "created": time.time(),
                }

                _save_reasoning = await self._save_in_db(
                    message=new_message,
                    session_id=session_id,
                )
                self.last_reasoning_buffer = ""

                if not _save_reasoning["status"]:
                    return r_h(False, "can't save reasoning", _save_reasoning)

            if self.last_content_buffer:
                new_message = {
                    "role": "assistant",
                    "content": self.last_content_buffer,
                    "turn": event["turn"],
                    "created": time.time(),
                }

                _save_content = await self._save_in_db(
                    message=new_message,
                    session_id=session_id,
                )
                self.last_content_buffer = ""

                if not _save_content["status"]:
                    return r_h(False, "can't save content", _save_content)
            return r_h(True, "every thing works fine")
        except Exception as e:
            return r_h(False, "something went wrong", str(e))

    def clear_an_agent(self, session_id):
        try:
            r = self.our_agents.pop(session_id, None)
            return r_h(True, "agent cleared with events histories", r)
        except Exception as e:
            return r_h(False, "something goes unexpected", e)

    async def _event_viewer(self, event, session_id):
        try:
            if event["type"] == "reasoning":
                self.last_reasoning_buffer += event["reasoning"]
                return r_h(True, "every thing works fine")

            elif event["type"] == "content":
                self.last_content_buffer += event["content"]
                return r_h(True, "every thing works fine")

            elif (
                (event["type"] == "tool_start")
                or (event["type"] == "tool_update")
                or (event["type"] == "tool_timeout")
                or (event["type"] == "timeout_decision")
                or (event["type"] == "tool_done")
                or (event["type"] == "tool_error")
                or (event["type"] == "done")
                or (event["type"] == "error")
            ):

                _save_res_con_ = await self._save_res_con(
                    event=event, session_id=session_id
                )

                if not _save_res_con_["status"]:
                    return r_h(False, "can't save event", _save_res_con_)

                # saving entire event so we can use any of the pair in UI/UX
                new_event = {"event": event, "created": time.time()}
                _save_event = await self._save_in_db(
                    message=new_event,
                    session_id=session_id,
                )

                if not _save_event["status"]:
                    return r_h(False, "can't save event", _save_event)

                return r_h(True, "every thing works fine")
            else:
                return r_h(False, "something went wrong", event)

        except Exception as e:
            return r_h(False, "something went wrong", str(e))

    def _add_message_in_agent(self, message: dict, session_id: str):
        try:
            self.our_agents[session_id]["agent"].ri.agent_messages.append(message)
            return r_h(
                True,
                "message added",
                self.our_agents[session_id]["agent"].ri.agent_messages,
            )
        except Exception as e:
            return r_h(
                False,
                "something went wrong while adding message in agent",
                str(e),
            )

    def create_agent(self, messages, session_id):
        try:
            if self.our_agents.get(session_id):
                return r_h(
                    False,
                    "agent is already working under this session",
                )
            _new_agent = _Main_Agent(
                messages=messages,
                meta={"session_id": session_id},
            )
            self.our_agents[session_id] = {"agent": _new_agent}
            self.our_agents[session_id]["events_history"] = []
            self.our_agents[session_id]["broadcaster"] = SessionBroadcaster()
            self.our_agents[session_id]["running"] = False

            return r_h(True, "agent created! ready to work")
        except Exception as e:
            return r_h(False, "can't create agent", str(e))

    async def start_agent(self, session_id):
        try:
            if not self.our_agents.get(session_id):
                return r_h(False, "session agent not exist")

            self.our_agents[session_id]["running"] = True
            async for event in self.our_agents[session_id]["agent"].events():

                await self.our_agents[session_id]["broadcaster"].publish(
                    r_h(True, "get event", {"event": event, "created": time.time()})
                )

                self.our_agents[session_id]["events_history"].append(
                    {"event": event, "created": time.time()}
                )

                view = await self._event_viewer(
                    event=event,
                    session_id=session_id,
                )
                if not view["status"]:
                    await self.our_agents[session_id]["broadcaster"].publish(
                        r_h(False, "something went wrong", view)
                    )

            await self.our_agents[session_id]["broadcaster"].publish(
                r_h(
                    True,
                    "agent completed",
                    self.our_agents[session_id]["events_history"],
                )
            )

            await self.our_agents[session_id]["broadcaster"].publish(None)  # finish

            self.our_agents[session_id]["running"] = False

        except Exception as e:
            traceback.print_exc()
            await self.our_agents[session_id]["broadcaster"].publish(
                r_h(
                    False,
                    "can't start agent",
                    str(e),
                )
            )

    async def terminate_agent(self, session_id):
        try:
            if not self.our_agents.get(session_id):
                return r_h(False, "session agent not exist")

            _terminate = self.our_agents[session_id]["agent"].ri.stop_all()

            if not _terminate["status"]:
                return r_h(
                    False,
                    "can't stop agent, agent and its process are still running",
                    _terminate,
                )
            return r_h(
                True,
                "agent terminated",
                _terminate,
            )

        except Exception as e:
            traceback.print_exc()
            return r_h(
                False,
                "can't stop agent",
                str(e),
            )

    async def terminate_process(
        self,
        session_id,
        pid,
        tool_call_id,
    ):
        try:
            if not self.our_agents.get(session_id):
                return r_h(False, "session agent not exist")

            kill_message_after = make_tool_termination_message_after(
                tool_call_id=tool_call_id
            )

            self._add_message_in_agent(
                kill_message_after,
                session_id=session_id,
            )
            os.kill(pid, signal.SIGKILL)
            # add a flag in message before saving
            kill_message_after["_terminated"] = True
            _save_killing = await self._save_in_db(
                message=kill_message_after,
                session_id=session_id,
            )

            if not _save_killing["status"]:
                return r_h(
                    False,
                    "can't save killing",
                    _save_killing,
                )

            return r_h(
                True,
                "process terminated",
                _save_killing,
            )

        except Exception as e:
            return r_h(
                False,
                "something went wrong while terminating process",
                str(e),
            )
