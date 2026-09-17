# Fluid Framework

`fluid` is the agent framework that powers TARS. It lives in the `/fluid` directory and provides four core modules: **generation**, **regular_interface**, **toolkit**, and **vector_retrive**. It also ships with a comprehensive utility library (`utill.py`).

> **Repository:** [github.com/bravecoconut/fluid](https://github.com/bravecoconut/fluid)

---

## Module Overview

```
fluid/
├── generation/
│   └── openai.py              # OpenAI-compatible streaming client
├── regular_interface/
│   ├── interface.py           # RegularInterface — the agent loop
│   ├── srcf.py                # Self-Referential Context Filtering
│   ├── build_system_messages/
│   │   ├── _main.py           # BuildSystemMessages class
│   │   └── system_message.py  # Prompt templates
│   └── system_tools/
│       └── agent_inbuild_tools.py  # Skill manipulation + timeout tools
├── toolkit/
│   ├── tool_registry.py       # @tool decorator and discover_tools()
│   └── tool_runner.py         # Subprocess execution with live I/O
├── vector_retrive/
│   ├── retrive.py             # ChromaDB query functions
│   └── retriveing_pool.py     # Parallel retrieval via multiprocessing
└── utill.py                   # Shared utilities
```

---

## 1. Generation (`fluid/generation/openai.py`)

### `OpenAICom` Class

A thread-safe streaming wrapper around the OpenAI Python SDK. Supports multiple concurrent streams without interference.

#### Key Design Decisions

- **Per-stream isolation**: Each call to `.openai()` gets a unique `buffer_id`, its own chunk buffer, and its own stop event. Two streams running simultaneously never interfere.
- **Generator-based**: Returns a Python generator, so the caller can process tokens as they arrive without waiting for the full response.
- **Error containment**: Operational failures (bad API key, network drop) yield a final error chunk instead of raising — the caller checks `chunk.get("error")` rather than wrapping everything in try/except.
- **Validation before streaming**: Input validation runs in the regular method (not inside the generator), so errors surface immediately rather than being delayed until iteration starts.

#### Streaming Chat

```python
com = OpenAICom()

for chunk in com.openai(
    messages=[{"role": "user", "content": "Hello"}],
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    model="qwen3:14b",
    max_completion_tokens=3000,
    temperature=0.3,
):
    if chunk.get("error"):
        print(f"Error: {chunk['error']}")
        break
    # chunk["buffer_id"] — unique stream ID
    # chunk["chunk"] — raw OpenAI chunk object
```

#### Stopping a Stream

```python
# Stop one specific stream:
com.stop(buffer_id="abc12345")

# Stop ALL streams:
com.stop_event.set()
```

#### Embeddings

```python
response = com.openai_emb(
    model="bge-large-en-v1.5",
    input="some text to embed",
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)
# Returns the embeddings response, or None on failure
```

#### Full Parameter List

| Parameter | Type | Default | Description |
|---|---|---|---|
| `messages` | `list` | *required* | Chat messages |
| `base_url` | `str` | *required* | API endpoint URL |
| `api_key` | `str` | *required* | API key |
| `model` | `str` | *required* | Model name |
| `tools` | `list\|None` | `None` | Tool definitions |
| `tool_choice` | `str` | `"auto"` | Tool selection strategy |
| `parallel_tool_calls` | `bool` | `False` | Allow parallel tool calls |
| `timeout` | `int\|None` | `None` | Request timeout (seconds) |
| `max_retries` | `int` | `0` | Retry count |
| `response_format` | `dict\|None` | `{"type": "text"}` | Response format |
| `max_completion_tokens` | `int\|None` | `None` | Max tokens |
| `temperature` | `float\|None` | `None` | Sampling temperature |
| `top_p` | `float\|None` | `None` | Nucleus sampling |
| `presence_penalty` | `float\|None` | `None` | Presence penalty |
| `frequency_penalty` | `float\|None` | `None` | Frequency penalty |

---

## 2. Regular Interface (`fluid/regular_interface/`)

### `RegularInterface` — The Agent Loop

This is the heart of fluid. It orchestrates the complete agentic cycle: LLM call → response parsing → tool execution → result injection → repeat.

#### Constructor Parameters

```python
ri = RegularInterface(
    messages=messages,        # Conversation history
    skills=[],                # Skill definitions (with RAG collections)
    max_new_skill=2,          # Max non-default skills the agent can add
    sys_messages=[],          # Additional system messages (strings)
    srcf=None,                # SRCF instance (or None to disable)
    all_tools=[],             # All discovered tools
    max_turns=20,             # Maximum agent loop iterations
)
```

#### What Happens During Initialization

1. **Skill separation**: Skills are split into default (always active) and non-default (activatable by the agent)
2. **RAG retrieval**: The last user message is queried against all default-skill collections in parallel
3. **Tool assignment**: Tools are matched to skills. Default-skill tools become active; others wait in `off_tools`
4. **System message construction**: RAG results and inactive-skill descriptions are formatted into system prompts
5. **SRCF**: If provided, old messages are semantically filtered
6. **Tool conversion**: Internal tool dicts are converted to OpenAI-format tool schemas

#### `run_agent()` — The Main Loop

```python
for event in ri.run_agent(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    model="qwen3:14b",
    tool_choice="auto",
    timeout=120,
    max_retires=2,
    max_complition_tokens=30000,
    temperature=0.3,
):
    print(event["type"], event.get("content", ""))
```

##### Event Structure

Every yielded event is a dict with this shape:

```python
{
    "type": str,           # Event type (see table below)
    "content": str|None,   # Text token
    "reasoning": str|None, # Reasoning/thinking token
    "tool_call": {
        "tool_call_id": str|None,
        "process_id": int|None,
        "tool_name": str|None,
        "tool_args": dict|None,
        "tool_comment": str|None,   # Agent's description of why it's calling the tool
        "timeout": int|None,
        "stdout": str|None,
        "stderr": str|None,
        "result": str|None,
        "status": str|None,
    },
    "turn": int,           # Current turn number (1-indexed)
}
```

##### Event Types

| Type | Description |
|---|---|
| `content` | A text token from the model |
| `reasoning` | A reasoning/thinking token |
| `tool_start` | A tool execution just started |
| `tool_update` | Live stdout/stderr from a running tool process |
| `tool_timeout` | A tool exceeded its timeout; agent is deciding what to do |
| `timeout_decision` | Agent decided to extend or terminate (check `status`: `"extended"` or `"terminated"`) |
| `tool_done` | A tool finished (result in `tool_call.result`) |
| `tool_error` | A tool had a JSON-parse error |
| `error` | The LLM stream itself errored |
| `done` | Agent loop completed |

#### Timeout Management

When an external tool exceeds its timeout:

1. The tool runner yields an `awaiting_decision` update
2. The agent loop makes a **side-channel LLM call** with only `tool_run_tool` available
3. The LLM sees the tool's current stdout/stderr and decides:
   - `next_timeout_window = 0` → terminate immediately
   - `next_timeout_window = N` → extend by N seconds
4. If the LLM fails to call `tool_run_tool`, it retries up to 3 times with increasingly forceful prompts
5. After all retries, defaults to terminate

#### Inline Tool Dispatch

Four tools are handled inline (no subprocess):

| Tool | Purpose |
|---|---|
| `add_new_skill` | Activate a non-default skill and its tools |
| `remove_skill` | Deactivate a skill and revoke its tools |
| `switch_skill` | Swap one active skill for another |
| `tool_run_tool` | Set timeout decision (extend/terminate) for a running tool |

After `add_new_skill`, `remove_skill`, or `switch_skill`, the OpenAI tool list is automatically rebuilt so the next LLM call sees the updated tool set.

#### `stop_all()` — Emergency Stop

```python
ri.stop_all()
# 1. Sets _stopped flag → agent loop exits at next turn
# 2. Signals OpenAI stream to stop
# 3. Terminates all tracked subprocess
```

---

### SRCF — Self-Referential Context Filtering

**Location:** `fluid/regular_interface/srcf.py`

SRCF solves the problem of long conversation histories overwhelming the LLM's context window. Instead of simple truncation (which loses context), SRCF uses semantic similarity to keep relevant older messages.

#### How It Works

```
Full conversation (N messages)
        │
        ▼
Group into turns (user msg + assistant reply + tool calls)
        │
        ▼
Split: first 70% = "old messages", last 30% = "recent messages"
        │
        ▼
Index old messages into ephemeral ChromaDB collection
        │
        ▼
Query with the last N recent messages
        │
        ▼
Filter results by distance threshold
        │
        ▼
Return: [relevant old messages] + [all recent messages]
```

#### Parameters

| Parameter | Default | Description |
|---|---|---|
| `srcf_percent` | `80` | Percentage of messages considered "old" (candidates for filtering) |
| `srcf_last_n` | `5` | Number of recent messages used as query terms |
| `srcf_threshold` | `0.323` | Maximum distance for a message to be considered "relevant" |
| `srcf_em_model` | local path | Sentence-transformer model for embedding |

#### Key Behaviors

- Groups messages into **turns** (user + assistant reply + tool calls), so a tool call is never separated from its result
- Uses an **ephemeral ChromaDB client** (in-memory) — no persistent state between calls
- Preserves the **original message order** — relevant old messages appear in their original sequence
- The "recent" portion is always kept in full — only old messages are filtered

---

### BuildSystemMessages

**Location:** `fluid/regular_interface/build_system_messages/_main.py`

Constructs two system messages for the agent:

1. **Non-default skills message**: Lists available-but-inactive skills and their tools, so the agent knows what it *could* activate
2. **Default skills + context message**: Injects RAG-retrieved context under each default skill, using configurable templates

#### Template System

Skills and collections use `{placeholder}` templates:

```python
# Skill-level template
"This is your OS skill. Use these tools for you operations\n{placeholder}"

# Collection-level template  
"RELEVANT KNOWLEDGE FROM USER:\n{placeholder}"
```

The `{placeholder}` is replaced with the actual retrieved context or tool descriptions.

---

## 3. Toolkit (`fluid/toolkit/`)

### Tool Registry (`tool_registry.py`)

The `@tool` decorator marks functions as discoverable tools:

```python
from fluid.toolkit.tool_registry import tool

@tool(skill="OS", usually_takes=30)
def download_file(url: str, dest: str, timeout: int = 30) -> str:
    """Download a file from a URL and save it locally."""
    ...
```

#### `discover_tools(root_dir=None)`

Walks the project directory, imports every `.py` file, and collects metadata from all `@tool`-decorated functions. Returns a list of tool metadata dicts:

```python
{
    "name": "download_file",
    "skill": "OS",
    "usually_takes": 30,
    "description": "Download a file from a URL and save it locally.",
    "parameters": [
        {"name": "url", "type": "<class 'str'>", "required": True, "default": None},
        {"name": "dest", "type": "<class 'str'>", "required": True, "default": None},
        {"name": "timeout", "type": "<class 'int'>", "required": False, "default": 30},
    ],
    "return_type": "<class 'str'>",
    "module": "tools",
    "source_file": "/path/to/tools/tools.py",
}
```

#### Excluded Directories

The scanner skips: `.venv`, `venv`, `env`, `.env`, `__pycache__`, `.git`, `node_modules`, `site-packages`, `build`, `dist`, `agent`, and all hidden directories.

### Tool Runner (`tool_runner.py`)

Executes tool functions in **isolated subprocess** with:

- **Live I/O capture**: Two background threads pump stdout and stderr into thread-safe buffers
- **Timeout management**: A deadline-based system that supports extension or termination
- **Generator-based updates**: Yields status updates that the agent loop forwards as events

#### Execution Method

Tools are run by dynamically importing the source file and calling the function:

```python
command = f"""
    import importlib.util, asyncio, inspect
    spec = importlib.util.spec_from_file_location({module_name!r}, {source_file!r})
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    result = mod.{function_call}
    if inspect.isawaitable(result):
        result = asyncio.run(result)
    print(result)
"""
process = subprocess.Popen(["python3", "-c", command], ...)
```

This approach ensures complete process isolation — a crashing tool cannot bring down the agent.

### OpenAI Tool Conversion

`convert_to_openai_tools()` transforms internal tool metadata into OpenAI-compatible tool schemas. It also injects two extra parameters into every tool:

| Parameter | Purpose |
|---|---|
| `_venus_timeout` | Lets the LLM specify how long this tool call should be allowed to run |
| `_tool_comment` | Forces the LLM to briefly explain why it's calling this tool |

These are stripped from the arguments before the actual tool function is called.

---

## 4. Vector Retrieval (`fluid/vector_retrive/`)

### `retrive.py` — ChromaDB Query Functions

Two query functions, one for each ChromaDB client mode:

#### `chroma_db_persistent()`
Queries an on-disk ChromaDB collection. Used by TARS for local vector storage.

#### `chroma_db_http()`
Queries a remote ChromaDB server over HTTP. Available for distributed setups.

Both functions:
- **Never raise** — return `{"error": "..."}` on failure
- Apply **threshold filtering** — results above the distance threshold are dropped
- Support both **HuggingFace sentence-transformers** and **OpenAI-compatible embedding APIs**
- Log everything to `logs/vector_retrieve.log`

### `retriveing_pool.py` — Parallel Retrieval

Orchestrates vector retrieval across multiple skills, collections, and backends in parallel:

```python
raw_results, grouped_results = retriving_pool(
    query="How do I download a file?",
    locations=skill_definitions,
    processes=None,  # auto-detect CPU count
)
```

#### How It Works

1. **Task building**: For each skill → for each collection → build a retrieval task with the appropriate backend (persistent or HTTP)
2. **Parallel execution**: Tasks run in a `multiprocessing.Pool` with `spawn` context (avoids fork-related deadlocks with loaded models)
3. **Embedding caching**: Each worker process caches its embedding function — the model is loaded once per worker, not once per query
4. **Result grouping**: Flat results are reorganized into a nested structure: `skill → collections → results`

#### Error Resilience

- One bad collection config → that collection is skipped, others proceed
- One failed retrieval → returns `{"error": "..."}`, doesn't crash the pool
- Embedding function build failure → caught per-task, not per-pool

---

## 5. Utilities (`fluid/utill.py`)

### Message Processing

| Function | Description |
|---|---|
| `_split_system_messages()` | Separates system messages from non-system messages |
| `_group_into_turns()` | Groups messages into user-turn bundles (user + reply + tool calls) |
| `trim_messages()` | Splits grouped messages at a percentage point |

### Skill Helpers

| Function | Description |
|---|---|
| `_filter_default_and_non_default_skills()` | Splits skills by `default` flag |
| `filter_tools_by_default_skills()` | Matches tools to their skill groups |
| `_find_skill_index()` | Finds a skill by name in a list |
| `_tool_matches_skill()` | Checks if a tool belongs to a skill |
| `_pop_tools_for_skill()` | Removes and returns all tools for a skill (mutating) |

### Tool Processing

| Function | Description |
|---|---|
| `convert_to_openai_tools()` | Converts internal tool format to OpenAI tool schema |
| `return_completed_tool_calls()` | Assembles streamed tool_call deltas into complete calls |
| `_map_type()` | Maps Python types to JSON schema types |
| `_build_timeout_note()` | Generates timeout hint text for tool descriptions |

### Safety Wrappers

| Function | Description |
|---|---|
| `safe_get()` | Dict access that warns instead of crashing on missing keys |
| `safe_list()` | Ensures a value is iterable |
| `safe_dict_items()` | Safely gets `.items()` from a value |
| `safe_strip()` | Safely strips text with fallback |
| `safe_format()` | Safely formats a template string |

### Other

| Function | Description |
|---|---|
| `generate_buffer_id()` | Generates a unique alphanumeric ID |
| `mid()` | Generates a unique message/collection ID |
| `json_ser()` | Fallback JSON serializer (`str()`) |
| `load_and_save_em_models()` | Downloads HuggingFace embedding models |
