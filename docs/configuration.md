# Configuration

TARS is configured through two files: `user.json` (main configuration) and `.env` (environment variables). All settings can also be changed at runtime via the REST API.

---

## `user.json`

The primary configuration file. Read by the agent, server, and settings modules at runtime.

```json
{
    "name": "asad",
    "instructions_path": "instructions/instructions.md",
    "sec_key": "TARS",
    "avail_tones": {
        "clear": { "temp": 0.3, "path": "tones/clear.md" },
        "robotic": { "temp": 0.1, "path": "tones/robotic.md" },
        "sarcastic": { "temp": 0.9, "path": "tones/sarcastic.md" },
        "emotional": { "temp": 0.85, "path": "tones/emotional.md" }
    },
    "curr_tone": "clear",
    "set_memory_sm_path": "agent/system/markdowns/set_memory.md",
    "memory_path": "memory/memory.md",
    "base_url": "https://your-endpoint.com/v1",
    "api_key": "ollama",
    "model": "qwen3:14b",
    "embedding_model": "znbang/bge:large-en-v1.5-f16",
    "max_completion_tokens": 30000,
    "max_retries": 2,
    "timeout": 120,
    "srcf_on_length": 50,
    "srcf_percent": 70,
    "srcf_last_n": 5,
    "srcf_threshold": 0.323
}
```

### Field Reference

#### Identity & Auth

| Field | Type | Description |
|---|---|---|
| `name` | `string` | User's display name, injected into the agent's system message |
| `sec_key` | `string` | Authentication key for API access (sent as a cookie) |

#### LLM Client

| Field | Type | Description |
|---|---|---|
| `base_url` | `string` | OpenAI-compatible API endpoint (e.g., `http://localhost:11434/v1` for Ollama) |
| `api_key` | `string` | API key for the LLM provider |
| `model` | `string` | Model name to use for chat completions |
| `embedding_model` | `string` | Model name for generating embeddings (RAG) |
| `max_completion_tokens` | `int` | Maximum tokens per LLM response |
| `max_retries` | `int` | How many times to retry a failed LLM call |
| `timeout` | `int` | Request timeout in seconds |

#### Tones

| Field | Type | Description |
|---|---|---|
| `avail_tones` | `object` | Map of tone name → `{temp, path}`. Each tone has its own temperature and system prompt |
| `curr_tone` | `string` | Currently active tone name |

Each tone is a markdown file that instructs the LLM on communication style. The temperature is set per-tone:

| Tone | Temperature | Style |
|---|---|---|
| `clear` | `0.3` | Precise, direct, no-filler communication |
| `robotic` | `0.1` | Highly structured, minimal variation |
| `sarcastic` | `0.9` | Dry wit with ironic delivery (still helpful underneath) |
| `emotional` | `0.85` | Warm, empathetic, expressive |

#### SRCF (Self-Referential Context Filtering)

| Field | Type | Description |
|---|---|---|
| `srcf_on_length` | `int` | Minimum message count before SRCF activates. Below this, full history is used |
| `srcf_percent` | `int` | Percentage of messages treated as "old" and eligible for filtering |
| `srcf_last_n` | `int` | Number of most recent messages used as semantic queries |
| `srcf_threshold` | `float` | Maximum embedding distance for a message to be kept. Lower = stricter filtering |

**How to tune SRCF:**

- **`srcf_on_length`**: Set higher (100+) if you rarely have long conversations. Set lower (30-50) if your conversations regularly exceed the model's context window.
- **`srcf_percent`**: 70 means the oldest 70% of messages are candidates for filtering, and the newest 30% are always kept. Increase to filter more aggressively.
- **`srcf_last_n`**: How many recent messages guide the filtering. 5 works well — it captures the current topic without being too narrow.
- **`srcf_threshold`**: Start at 0.3-0.4. Lower values keep fewer messages (only very relevant ones). Higher values keep more. If the agent seems to "forget" important context, increase this.

#### File Paths

| Field | Type | Description |
|---|---|---|
| `instructions_path` | `string` | Path to custom instructions markdown file |
| `memory_path` | `string` | Path to persistent memory markdown file |
| `set_memory_sm_path` | `string` | Path to the system prompt that teaches the agent how to use memory |

---

## `.env`

Environment variables loaded via `python-dotenv`.

| Variable | Type | Description |
|---|---|---|
| `MAX_NEW_SKILLS` | `int` | Maximum non-default skills the agent can activate simultaneously |
| `MAX_TURNS` | `int` | Maximum iterations of the agent loop before forced stop |

Example `.env`:
```
MAX_NEW_SKILLS=2
MAX_TURNS=20
```

---

## `avail_formats.json`

Controls which file extensions are accepted for RAG ingestion.

```json
[".txt", ".md"]
```

Add more extensions (e.g., `".py"`, `".json"`) to allow ingesting those file types.

---

## `origins.py`

CORS allowed origins for the Quart server.

```python
ALLOW_ORIGINS = [
    "http://localhost:5000",
]
```

Add additional origins if your frontend is served from a different host.

---

## System Prompts

The agent's behavior is shaped by multiple system messages, assembled in order:

### 1. Core System Prompts (`agent/system/markdowns/`)

| File | Purpose |
|---|---|
| `system_message_1.md` | Defines TARS's role, operating principles, tool-vs-generation rules, and output format |
| `system_message_2.md` | Additional behavioral guidelines |

### 2. Tone Prompt (`tones/*.md`)

Loaded based on `curr_tone`. Instructs the LLM on communication style.

### 3. User Name Prompt (`agent/system/markdowns/user_name_sm.md`)

Tells the agent the user's name: `"The user's name is {user_name}."`

### 4. Custom Instructions Prompt (`instructions/instructions.md`)

User-written instructions injected via `agent/system/markdowns/user_instruct_sm.md` template.

### 5. Memory Prompt (`memory/memory.md`)

Persistent user memory injected via `agent/system/markdowns/user_memory.md` template.

### 6. Memory Tool Prompt (`agent/system/markdowns/set_memory.md`)

Teaches the agent when and how to use the `set_memory` tool to silently save user information.

### 7. SRCF Notice (if active)

When SRCF prunes the conversation, a system message explains that some messages may appear missing.

### 8. Skill Context Messages (generated at runtime)

RAG-retrieved context and available-but-inactive skill descriptions, built by `BuildSystemMessages`.

---

## Skill Configuration

Skills are defined in `agent/system/configurations/configs/skills.py`.

### Default Skill Structure

```python
{
    "name": "OS",
    "default": True,
    "template": "This is your OS skill. Use these tools...\n{placeholder}",
    "collections": [
        {
            "name": "base",             # ChromaDB collection name
            "max_result": 3,            # Max RAG results per query
            "threshold": 2.0,           # Distance threshold
            "meta": {"session_id": "..."}, # Metadata filter
            "collec_template": "RELEVANT KNOWLEDGE FROM USER:\n{placeholder}",
            "em_setup": {
                "openai_embed": {
                    "base_url": "...",
                    "api_key": "...",
                    "model": "..."
                }
            }
        },
        ...
    ],
    "backend": {
        "persistent_backend": {
            "path": "TARS_DB"
        }
    }
}
```

### Key Constants

| Constant | Value | Description |
|---|---|---|
| `SKILL_DB_PATH` | `"TARS_DB"` | Path to ChromaDB persistent storage |
| `BASE_COLLECTION_NAME` | `"base"` | Collection for user-uploaded file chunks |
| `OS_COLLECTION_NAME` | `"OS"` | Collection for OS skill knowledge |
| `BASE_THRESHOLD` | `2.0` | Distance threshold for base collection |
| `BASE_MAX_RESULT` | `3` | Max results from base collection |

---

## MongoDB Schema

### Sessions Collection

| Field | Type | Default | Description |
|---|---|---|---|
| `name` | `str` | `"no name provided"` | Session display name |
| `dumped_paths` | `list[dict]` | `[]` | Metadata for uploaded files |
| `pin` | `bool` | `False` | Whether the session is pinned |
| `created` | `float` | `time.time()` | Unix timestamp of creation |
| `streaming` | `bool` | `False` | Whether the session is actively streaming |
| `messages` | `list[dict]` | `[]` | Conversation message history |

Messages in the `messages` array can be:

| Type | Shape |
|---|---|
| User message | `{"role": "user", "content": "...", "created": ...}` |
| Assistant message | `{"role": "assistant", "content": "...", "turn": N, "created": ...}` |
| Reasoning | `{"role": "_assistant", "_agent_reasoning": "...", "turn": N, "created": ...}` |
| Agent event | `{"event": {...}, "created": ...}` |
| Tool termination | `{"role": "tool", "tool_call_id": "...", "content": "...", "_terminated": true}` |

---

## Logging

All components write to rotating log files in the `logs/` directory:

| Log File | Source |
|---|---|
| `interface.log` | Agent loop (RegularInterface) |
| `openai_comaptible.log` | OpenAI streaming client |
| `tool_runner.log` | Tool subprocess execution |
| `vector_retrieve.log` | ChromaDB retrieval operations |
| `utilss.log` | Utility function operations |

Each log file:
- Max size: 2 MB
- Backup count: 3 (rotates to `.log.1`, `.log.2`, `.log.3`)
- Format: `%(asctime)s [%(levelname)s] %(processName)s: %(message)s`
