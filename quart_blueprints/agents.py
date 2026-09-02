from quart import Blueprint, request, jsonify, make_response
from agent_backend.agents.agents import Agents
from utils import get_sec_key, r_h, validate_sec_key
import json
from backend.upload.session_uploads import create_new_message
import asyncio

agents_bp = Blueprint("agents", __name__, url_prefix="/api/agents")

agents = Agents(
    create_message=create_new_message,
)

################
##### GET #####
################


@agents_bp.route("/get_all_agents", methods=["GET"])
def _get_all_agents():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        if not agents.our_agents:
            return jsonify(
                r_h(
                    False,
                    "no agents exists.",
                )
            )

        agents_from_sessions = agents.our_agents.keys()

        return jsonify(r_h(True, "get agents", agents_from_sessions))

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while getting all sessions",
                str(e),
            )
        )


@agents_bp.route("/stream_agent_events", methods=["GET"])
async def _stream_agent_events():
    try:
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        _session_id = request.args.get("session_id")  # GET → query param, not JSON body

        if not _session_id:
            return jsonify(r_h(False, "session_id query param is required"))

        if not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(r_h(False, "no agent exists with that session id"))

        if not agents.our_agents[_session_id].get("running"):
            return jsonify(r_h(False, "agent NOT running"))

        async def get_events():
            try:
                queue = agents.our_agents[_session_id]["queue"]

                while True:
                    new_event = await queue.get()

                    if new_event is None:
                        payload = r_h(True, "agent completed", "//@@done@@//")
                        yield f"data: {json.dumps(payload, default=str)}\n\n"
                        break  # stop the generator — stream actually ends now

                    payload = r_h(True, "get new event", new_event)
                    yield f"data: {json.dumps(payload, default=str)}\n\n"

            except Exception as e:
                error_payload = r_h(
                    False, "something went wrong while getting new event", str(e)
                )
                yield f"data: {json.dumps(error_payload, default=str)}\n\n"

        response = await make_response(
            get_events(),
            200,
            {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
        response.timeout = None  # disable Quart's default 60s response timeout
        return response

    except Exception as e:
        return jsonify(r_h(False, "something went wrong while starting agent", str(e)))


@agents_bp.route("/get_an_agent", methods=["POST"])
async def _get_an_agent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        if not agents.our_agents:
            return jsonify(
                r_h(
                    False,
                    "no agents exists.",
                )
            )

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")
        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        history = {k: v for k, v in agents.our_agents[_session_id].items() if k != "agent"}  # remove agent object

        return jsonify(
            r_h(
                True,
                "get an agent",
                history,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while getting agent",
                str(e),
            )
        )


@agents_bp.route("/get_event_history", methods=["POST"])
async def _get_event_history():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        if not agents.our_agents:
            return jsonify(
                r_h(
                    False,
                    "no agents exists.",
                )
            )

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        history = agents.our_agents[_session_id]["events_history"]
        return jsonify(
            r_h(
                True,
                "get session events history",
                history,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while getting session events history",
                str(e),
            )
        )


@agents_bp.route("/clear_agent", methods=["POST"])
async def _clear_agent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        if not agents.our_agents:
            return jsonify(
                r_h(
                    False,
                    "no agents exists.",
                )
            )

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        _result = agents.clear_an_agent(session_id=_session_id)
        if not _result["status"]:
            return jsonify(
                r_h(
                    False,
                    "can't clear session",
                    _result,
                )
            )

        return jsonify(
            r_h(
                True,
                "agent cleared",
                _result,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while cleaning agent",
                str(e),
            )
        )


@agents_bp.route("/add_message_in_agent", methods=["POST"])
async def _add_message_in_agent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic
        if not agents.our_agents:
            return jsonify(
                r_h(
                    False,
                    "no agents exists.",
                )
            )

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")
        _message = data.get("message")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not _message or not isinstance(_message, dict):
            return r_h(False, "message must be non empty 'dict'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        _result = agents._add_message_in_agent(
            message=_message,
            session_id=_session_id,
        )

        if not _result["status"]:
            return jsonify(
                r_h(
                    False,
                    "can't add message",
                    _result,
                )
            )

        return jsonify(
            r_h(
                True,
                "message added",
                _result,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while adding message in agent",
                str(e),
            )
        )


@agents_bp.route("/create_agent", methods=["POST"])
async def _create_agent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")
        _messages = data.get("messages")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not _messages or not isinstance(_messages, list):
            return r_h(False, "message must be non empty 'list'")

        if agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "agent already exists with that session id",
                )
            )

        _result = agents.create_agent(
            messages=_messages,
            session_id=_session_id,
        )

        if not _result["status"]:
            return jsonify(
                r_h(
                    False,
                    "can't create agents",
                    _result,
                )
            )

        return jsonify(
            r_h(
                True,
                "agent created",
                _result,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while creating agent",
                str(e),
            )
        )


@agents_bp.route("/terminate_agent", methods=["POST"])
async def _terminate_agent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        _result = await agents.terminate_agent(
            session_id=_session_id,
        )

        if not _result["status"]:
            return jsonify(
                r_h(
                    False,
                    "can't terminate agent",
                    _result,
                )
            )

        return jsonify(
            r_h(
                True,
                "agent terminated",
                _result,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while terminating agent",
                str(e),
            )
        )


@agents_bp.route("/terminate_process", methods=["POST"])
async def _terminate_process():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")
        _pid = data.get("pid")
        _tool_call_id = data.get("tool_call_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not _pid or not isinstance(_pid, int):
            return r_h(False, "pid must be non zero 'int'")

        if not _tool_call_id or not isinstance(_tool_call_id, str):
            return r_h(False, "tool call id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        _result = await agents.terminate_process(
            session_id=_session_id,
            pid=_pid,
            tool_call_id=_tool_call_id,
        )

        if not _result["status"]:
            return jsonify(
                r_h(
                    False,
                    "can't terminate process",
                    _result,
                )
            )

        return jsonify(
            r_h(
                True,
                "process terminated",
                _result,
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while terminating process",
                str(e),
            )
        )


@agents_bp.route("/fire_agent", methods=["POST"])
async def _fire_agent():
    try:
        # validate sec key
        sec_key = validate_sec_key(sec_key=request.cookies.get("sec_key"))
        if not sec_key["status"]:
            return jsonify(sec_key)

        # main logic

        data = await request.get_json(silent=True)
        _session_id = data.get("session_id")

        if not _session_id or not isinstance(_session_id, str):
            return r_h(False, "session id must be non empty 'string'")

        if not agents.our_agents.get(_session_id):
            return jsonify(
                r_h(
                    False,
                    "no agent exists with that session id",
                )
            )

        agents.our_agents[_session_id]["running"] = True

        asyncio.ensure_future(agents.start_agent(session_id=_session_id))

        return jsonify(
            r_h(
                True,
                "agent fired",
            )
        )

    except Exception as e:
        return jsonify(
            r_h(
                False,
                "something went wrong while firing agent",
                str(e),
            )
        )
