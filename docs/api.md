# API Reference

All endpoints are served by the Quart server at `http://localhost:5000`. Every request (except static files) must include a `sec_key` cookie for authentication.

---

## Authentication

All API endpoints validate a `sec_key` cookie. Set it in your requests:

```bash
# With curl
curl -b "sec_key=YOUR_KEY" http://localhost:5000/api/...

# With JavaScript fetch
document.cookie = "sec_key=YOUR_KEY";
fetch("/api/...", { credentials: "include" });
```

### Response Format

All endpoints return a consistent JSON shape:

```json
{
    "status": true,
    "comment": "description of result",
    "data": "..."
}
```

On failure:

```json
{
    "status": false,
    "comment": "what went wrong",
    "data": "error details or null"
}
```

---

## Sessions API

**Prefix:** `/api/sessions`

### POST `/api/sessions/create_new_session`

Create a new chat session.

**Body:**
```json
{
    "name": "My Session"
}
```

**Response:**
```json
{
    "status": true,
    "comment": "session created",
    "data": { "id": "64a..." }
}
```

---

### POST `/api/sessions/delete_session`

Delete a session and its associated vector data.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/sessions/create_new_message`

Add a message to a session's history.

**Body:**
```json
{
    "session_id": "64a...",
    "message": {
        "role": "user",
        "content": "Hello TARS"
    }
}
```

---

### POST `/api/sessions/change_session_name`

Rename a session.

**Body:**
```json
{
    "session_id": "64a...",
    "name": "New Name"
}
```

---

### POST `/api/sessions/toggle_session_pin`

Toggle pin status of a session.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/sessions/update_last_user_message`

Replace the last user message in a session (for edit/resend).

**Body:**
```json
{
    "session_id": "64a...",
    "message": {
        "role": "user",
        "content": "Updated message"
    }
}
```

---

### POST `/api/sessions/get_session`

Get a session's messages within a range.

**Body:**
```json
{
    "session_id": "64a...",
    "start_m": 1,
    "end_m": 50
}
```

---

### POST `/api/sessions/get_all_sessions`

Get a paginated list of all sessions.

**Body:**
```json
{
    "start": 1,
    "end": 20
}
```

---

## Agents API

**Prefix:** `/api/agents`

### POST `/api/agents/create_agent`

Create an agent instance for a session. The agent is initialized but not yet running.

**Body:**
```json
{
    "session_id": "64a...",
    "messages": [
        {"role": "user", "content": "Download example.com/file.zip"}
    ]
}
```

**Response:**
```json
{
    "status": true,
    "comment": "agent created! ready to work"
}
```

---

### POST `/api/agents/fire_agent`

Start the agent loop. The agent runs in the background and publishes events via SSE.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### GET `/api/agents/stream_agent_events?session_id=64a...`

**Server-Sent Events (SSE) endpoint.** Opens a persistent connection that streams agent events in real time.

**Response format** (each line):
```
data: {"status": true, "comment": "get new event", "data": {"event": {...}, "created": 1726574400.0}}
```

**Completion signal:**
```
data: {"status": true, "comment": "agent completed", "data": "//@@done@@//"}
```

#### Event Types in the Stream

| Event Type | Meaning |
|---|---|
| `content` | Text token from the LLM |
| `reasoning` | Reasoning/thinking token |
| `tool_start` | Tool execution started |
| `tool_update` | Live output from running tool |
| `tool_timeout` | Tool exceeded timeout, awaiting decision |
| `timeout_decision` | Agent decided to extend/terminate |
| `tool_done` | Tool finished |
| `tool_error` | Tool had malformed arguments |
| `error` | LLM stream error |
| `done` | Agent completed |

---

### GET `/api/agents/get_all_agents`

List all active agent session IDs.

---

### POST `/api/agents/get_an_agent`

Get the state of a specific agent (events history, running status, broadcaster).

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/agents/get_event_history`

Get the full event history for an active agent.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/agents/clear_agent`

Remove an agent instance and its event history from memory.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/agents/add_message_in_agent`

Inject a message into a running agent's conversation (e.g., for user interruptions).

**Body:**
```json
{
    "session_id": "64a...",
    "message": {
        "role": "user",
        "content": "Stop what you're doing"
    }
}
```

---

### POST `/api/agents/terminate_agent`

Stop the agent loop and kill all its running tool processes.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/agents/terminate_process`

Kill a specific tool subprocess by PID.

**Body:**
```json
{
    "session_id": "64a...",
    "pid": 12345,
    "tool_call_id": "call_abc123"
}
```

---

## ASCII (File Ingestion) API

**Prefix:** `/api/agent/ascii`

### POST `/api/agent/ascii/dump_new`

Upload and index a text file for RAG retrieval within a session.

**Body:**
```json
{
    "session_id": "64a...",
    "file_name": "notes.txt",
    "file_size": 4096,
    "file_text": "The full text content of the file...",
    "cha_per_chunk": 100,
    "overlap": 30
}
```

| Field | Type | Description |
|---|---|---|
| `session_id` | `string` | Target session |
| `file_name` | `string` | Original filename (used for chunk IDs) |
| `file_size` | `int` | File size in bytes |
| `file_text` | `string` | Full text content |
| `cha_per_chunk` | `int` | Characters per chunk |
| `overlap` | `int` | Overlap characters between chunks |

---

### POST `/api/agent/ascii/clear_session_vectors`

Delete all vector embeddings for a session.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

### POST `/api/agent/ascii/get_session_vector_counts`

Get the number of vector chunks stored for a session.

**Body:**
```json
{
    "session_id": "64a..."
}
```

---

## User Client Settings API

**Prefix:** `/api/user/client`

All endpoints are `POST` and update `user.json`.

| Endpoint | Body Key | Type | Description |
|---|---|---|---|
| `/update_base_url` | `base_url` | `string` | LLM API base URL |
| `/update_api_key` | `api_key` | `string` | LLM API key |
| `/update_model` | `model` | `string` | LLM model name |
| `/update_em_model` | `em_model` | `string` | Embedding model name (also clears all vectors) |
| `/update_mct` | `mct` | `int` | Max completion tokens |
| `/update_max_retries` | `max_retries` | `int` | Max LLM call retries |
| `/update_timeout` | `timeout` | `int` | LLM request timeout (seconds) |

> **Warning:** Changing the embedding model (`/update_em_model`) automatically **deletes all existing vector embeddings**, since they're incompatible with the new model. Uploaded files must be re-ingested.

---

## User SRCF Settings API

**Prefix:** `/api/user/srcf`

All endpoints are `POST` and update `user.json`.

| Endpoint | Body Key | Type | Description |
|---|---|---|---|
| `/update_srcf_on_length` | `srcf_on_length` | `int` | Message count threshold to activate SRCF |
| `/update_srcf_percent` | `srcf_percent` | `int\|float` | Percentage of old messages to filter |
| `/update_srcf_last_n` | `srcf_last_n` | `int` | Number of recent messages used as query |
| `/update_srcf_threshold` | `srcf_threshold` | `float` | Distance threshold for relevance |

---

## User Other Settings API

**Prefix:** `/api/user/others`

### GET Endpoints

| Endpoint | Description |
|---|---|
| `/get_instructions` | Get current custom instructions |
| `/get_memory` | Get current memory file contents |
| `/get_tones` | Get list of available tone names |
| `/get_whole_user` | Get the entire `user.json` configuration |

### POST Endpoints

| Endpoint | Body Key | Type | Description |
|---|---|---|---|
| `/set_name` | `name` | `string` | Set the user's display name |
| `/update_instructions` | `instructions` | `string` | Replace custom instructions |
| `/update_memory` | `memory` | `string` | Replace memory file contents |
| `/set_curr_tone` | `curr_tone` | `string` | Switch tone (must be one of the available tones) |

---

## Static Routes

| Route | Description |
|---|---|
| `GET /` | Serves `client/templates/index.html` |
| `GET /auth` | Serves `client/templates/auth.html` |
| `GET /test` | Serves `client/templates/agents-test.html` |

---

## Typical API Flow

```
1. Authenticate
   → Set sec_key cookie

2. Create session
   → POST /api/sessions/create_new_session

3. Add user message
   → POST /api/sessions/create_new_message

4. (Optional) Upload file for RAG
   → POST /api/agent/ascii/dump_new

5. Create agent with messages
   → POST /api/agents/create_agent

6. Fire agent
   → POST /api/agents/fire_agent

7. Stream events
   → GET /api/agents/stream_agent_events?session_id=...

8. (Optional) Stop agent
   → POST /api/agents/terminate_agent

9. Clean up
   → POST /api/agents/clear_agent
```
