from agent._agent_._main_agent import _Main_Agent
import uuid
from utils import r_h
from backend.upload.session_uploads import create_new_message
from db import init_db
import time
import traceback

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

            return r_h(True, "message saved", _save_)
        except Exception as e:
            return r_h(
                False,
                "can't save message",
            )

    async def _event_viewer(self, event, session_id):
        try:
            if event["type"] == "reasoning":
                self.last_reasoning_buffer += event["reasoning"]
            elif event["type"] == "content":
                self.last_content_buffer += event["content"]
            elif event["type"] == "tool_start":
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

                    if not _save_content["status"]:
                        return r_h(False, "can't save content", _save_content)

                # saving entire event so we can use any of the pair in UI/UX
                new_event = {"event": event, "created": time.time()}
                _save_event = await self._save_in_db(
                    message=new_event,
                    session_id=session_id,
                )

                if not _save_event["status"]:
                    return r_h(False, "can't save event", _save_event)

                return r_h(True, "every thing works fine")
        except Exception as e:
            return r_h(False, "something went wrong", e)

    def create_agent(self, messages, session_id):
        try:
            if self.our_agents.get(session_id):
                return r_h(False, "agent is already working under this session")
            _new_agent = _Main_Agent(
                messages=messages,
                meta={"session_id": session_id},
            )
            self.our_agents[session_id] = {"agent": _new_agent}
            return r_h(True, "agent created! ready to work")
        except Exception as e:
            return r_h(False, "can't create agent")

    async def start_agent(self, session_id):
        try:
            for event in self.our_agents[session_id]["agent"].events():
                yield r_h(True, "get agent event", event)
                view = await self._event_viewer(
                    event=event,
                    session_id=session_id,
                )
                if not view["status"]:
                    yield r_h(False, "something went wrong", view)
                    return

        except Exception as e:
            traceback.print_exc() 
            yield r_h(False, "can't start agent", e)
            return


if __name__ == "__main__":
    from db import init_db
    import asyncio
    import time
    from backend.upload.session_uploads import create_new_message
    import json
    from z_ignore.ignores.one.z import messages

    async def main():
        agents = Agents(create_message=create_new_message)
        await init_db()
        s1 = "6a8f252013f20d7c69a7a378"
        s2 = "6a8f252113f20d7c69a7a379"
        s3 = "6a8f252113f20d7c69a7a37a"

        agents.create_agent(
            messages=messages,
            session_id=s1,
        )
        agents.create_agent(
            messages=messages,
            session_id=s2,
        )
        agents.create_agent(
            messages=messages,
            session_id=s3,
        )

        print("=" * 15, "our agents", "=" * 15)
        print(agents.our_agents)
        print("=" * 42)

        async for event in agents.start_agent(session_id=s1):
            if not event["status"]:
                print(event)
            etype = event["type"]

            if etype == "content":
                print(event["content"], end="", flush=True)

            elif etype == "reasoning":
                print(event["reasoning"], end="", flush=True)

            elif etype == "tool_start":
                tc = event["tool_call"]
                print(
                    f"\n🔧 TOOL START: {tc['tool_name']}({tc['tool_args']}) [timeout={tc['timeout']}s]"
                )
                with open("z_ignore/ignores/one/u.py", "a") as file:
                    file.write(str(event))
            elif etype == "tool_update":
                tc = event["tool_call"]
                reason = tc.get("result", "")[:100] if tc.get("result") else ""
                print(f"   ↻ UPDATE: pid={tc['process_id']} | {reason}")
                with open("z_ignore/ignores/one/u.py", "a") as file:
                    file.write(str(event))
            elif etype == "tool_timeout":
                tc = event["tool_call"]
                print(
                    f"\n   ⏰ TIMEOUT: {tc['tool_name']} (pid={tc['process_id']}) — asking agent..."
                )
                with open("z_ignore/ignores/one/u.py", "a") as file:
                    file.write(str(event))
            elif etype == "tool_done":
                tc = event["tool_call"]
                result_preview = str(tc.get("result", ""))[:200]
                print(f"\n   ✓ DONE: {tc['tool_name']} → {result_preview}")
                with open("z_ignore/ignores/one/u.py", "a") as file:
                    file.write(str(event))
            elif etype == "tool_error":
                tc = event["tool_call"]
                print(f"\n   ✗ ERROR: {tc['tool_name']} → {tc.get('result', '')[:200]}")
                with open("z_ignore/ignores/one/u.py", "a") as file:
                    file.write(str(event))
            elif etype == "done":
                print(f"\n\n--- DONE (turn {event['turn']}) ---")
                if event.get("content"):
                    print(f"    {event['content']}")
                with open("z_ignore/ignores/one/u.py", "a") as file:
                    file.write(str(event))
            elif etype == "error":
                print(f"\n!!! ERROR: {event['content']}")
                print(json.dumps(event, indent=2, default=str))

            else:
                # Catch-all for any other event types
                print(json.dumps(event, indent=2, default=str))

        print("\n✅ Agent run complete.")

    asyncio.run(main())
