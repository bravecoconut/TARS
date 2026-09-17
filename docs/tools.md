# Tools Guide

How to create custom tools for TARS using the `@tool` decorator, how tools are discovered, executed, and how the agent interacts with them.

---

## Creating a Tool

Any Python function can become a tool by adding the `@tool` decorator:

```python
from fluid.toolkit.tool_registry import tool

@tool(skill="OS", usually_takes=5)
def my_function(param1: str, param2: int = 10) -> str:
    """
    Description of what this tool does.
    This docstring becomes the tool's description that the LLM sees.
    """
    # Your logic here
    return "result string"
```

### Decorator Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `skill` | `str\|None` | No | Which skill group this tool belongs to. Tools in the same skill are activated/deactivated together |
| `usually_takes` | `str\|int\|None` | No | Approximate execution time in seconds. Helps the LLM set appropriate timeouts |

### Function Requirements

1. **Type hints**: Use Python type annotations for parameters. These are converted to JSON schema types for the LLM:

   | Python Type | JSON Schema Type |
   |---|---|
   | `str` | `string` |
   | `int` | `integer` |
   | `float` | `number` |
   | `bool` | `boolean` |
   | `list` | `array` |
   | `dict` | `object` |

2. **Docstring**: The function's docstring becomes the tool description the LLM sees. Write it clearly — this is how the LLM decides whether to use your tool.

3. **Return type**: Always return a string (or something that can be `str()`'d). The return value is fed back to the LLM as the tool result.

4. **Default values**: Parameters with defaults become optional in the tool schema. Parameters without defaults are marked as required.

---

## Where to Put Tools

Place your tool files anywhere in the project directory. The `discover_tools()` function recursively scans all `.py` files and imports them.

**Recommended location:** `tools/` directory.

**Excluded directories** (these are never scanned):
- `.venv`, `venv`, `env`, `.env`
- `__pycache__`, `.git`
- `node_modules`, `site-packages`
- `build`, `dist`
- `agent` (excluded to avoid importing agent internals)
- Any directory starting with `.`

### Example: Adding a New Tool File

```
tools/
├── tools.py          # Existing tools (download_file, run_shell_command, etc.)
└── my_tools.py       # Your new tools ← just create this file
```

No registration needed. On startup, `discover_tools()` will find and register your functions automatically.

---

## Built-in Tools

TARS ships with these tools in `tools/tools.py`:

### `download_file`

```python
@tool(skill="OS", usually_takes=30)
def download_file(url: str, dest: str, timeout: int = 30, overwrite: bool = False) -> str:
```

Downloads a file from a URL. Streams the response to avoid memory issues with large files. Uses an atomic write (`.part` file) so partial downloads don't leave corrupt files.

### `run_shell_command`

```python
@tool(skill="OS")
def run_shell_command(cmd: str, timeout: int = 30, cwd: str = "") -> str:
```

Runs a shell command and returns structured output with return code, stdout, and stderr. Safe to use — captures output and never raises on non-zero exit codes.

### `compute_file_hash`

```python
@tool(skill="OS")
def compute_file_hash(path: str, algorithm: str = "sha256") -> str:
```

Computes a file's hash digest without loading the entire file into memory. Supports md5, sha1, sha256, sha512.

### `write_text_file`

```python
@tool(skill="OS")
def write_text_file(path: str, content: str, overwrite: bool = False) -> str:
```

Writes text content to a file. Creates parent directories automatically.

### `zip_directory`

```python
@tool(skill="OS", usually_takes=5)
def zip_directory(source_dir: str, output_path: str, overwrite: bool = False) -> str:
```

Compresses a directory into a `.zip` file.

### `read_text_file`

```python
@tool(skill="OS")
def read_text_file(path: str, max_chars: int = 5000) -> str:
```

Reads a text file's contents. Truncates at `max_chars` to avoid overwhelming the LLM context.

### `set_memory`

```python
@tool(skill="OS")
def set_memory(new_memory) -> None:
```

Appends a memory entry to the user's memory file (`memory/memory.md`). The agent uses this silently to remember user preferences and facts.

---

## How Tools Are Executed

### 1. Discovery (startup)

```python
# In agent/system/configurations/configs/settings.py
from fluid.toolkit.tool_registry import discover_tools
ALL_TOOLS = discover_tools()
```

This runs once at import time. It walks the project, imports all `.py` files, and triggers `@tool` decorators.

### 2. Schema Conversion

`convert_to_openai_tools()` transforms internal tool metadata into OpenAI-compatible tool schemas. Two extra parameters are injected:

- `_venus_timeout`: Lets the LLM specify an execution timeout
- `_tool_comment`: Forces the LLM to describe why it's calling the tool

### 3. LLM Decision

The LLM sees tool schemas in its request and can choose to call one (or more). Example tool call from the LLM:

```json
{
    "name": "download_file",
    "arguments": {
        "url": "https://example.com/data.csv",
        "dest": "/tmp/data.csv",
        "_venus_timeout": 30,
        "_tool_comment": "Downloading the CSV file the user requested"
    }
}
```

### 4. Argument Processing

`return_completed_tool_calls()` assembles streamed tool_call deltas into complete calls, extracting `_venus_timeout` and `_tool_comment` from the arguments before passing the rest to the tool function.

### 5. Subprocess Execution

External tools run in isolated child processes:

```python
# The tool runner generates this code:
import importlib.util, asyncio, inspect
spec = importlib.util.spec_from_file_location("tools", "/path/to/tools/tools.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
result = mod.download_file(url='https://example.com/data.csv', dest='/tmp/data.csv')
if inspect.isawaitable(result):
    result = asyncio.run(result)
print(result)
```

Key properties:
- **Complete isolation**: A crashing tool cannot bring down the agent
- **Live output**: stdout/stderr are captured in real time via background threads
- **Timeout enforcement**: If the tool exceeds its timeout, the agent decides to extend or kill it
- **Async support**: Awaitable results are automatically `asyncio.run()`'d

### 6. Result Injection

The tool's output (stdout) is injected back into the conversation as a `tool` role message:

```python
{
    "role": "tool",
    "tool_call_id": "call_abc123",
    "content": "Downloaded 4096 bytes to /tmp/data.csv"
}
```

The LLM sees this in the next turn and can act on the result.

---

## Timeout Management

Every external tool has a timeout. The flow:

1. **LLM sets timeout** via `_venus_timeout` parameter (clamped to 5-300 seconds)
2. **If not specified**, defaults to 30 seconds
3. **When timeout expires**, the agent gets a side-channel LLM call asking it to decide:
   - `next_timeout_window = 0` → kill the process
   - `next_timeout_window = N` → extend by N seconds
4. **Up to 3 retries** if the LLM doesn't call `tool_run_tool`
5. **Falls back to terminate** after all retries

The timeout hint in the tool description guides the LLM:

```
"... [timeout hint: usually takes ~30 seconds, set _venus_timeout accordingly]"
```

---

## Writing Good Tool Docstrings

The docstring is the **only** information the LLM has about your tool. Make it count:

```python
@tool(skill="OS")
def search_files(pattern: str, directory: str = ".", max_depth: int = 3) -> str:
    """
    Search for files matching a glob pattern in a directory tree.

    Args:
        pattern: Glob pattern to match (e.g., "*.py", "README*")
        directory: Root directory to search from. Defaults to current directory.
        max_depth: Maximum directory depth to traverse. Set to 0 for current dir only.

    Returns a newline-separated list of matching file paths, or "No matches found."

    Example:
        >>> search_files("*.md", "/home/user/projects")
        '/home/user/projects/README.md\n/home/user/projects/docs/guide.md'
    """
```

**Tips:**
- Describe what the function **does**, not how it works internally
- Document all parameters with types and valid values
- Describe the return format so the LLM can parse it
- Include an example if the return format isn't obvious
- Mention error conditions the LLM should be aware of

---

## Async Tools

Tools can be async functions. The tool runner automatically detects and handles them:

```python
@tool(skill="web", usually_takes=10)
async def fetch_page(url: str) -> str:
    """Fetch a web page and return its text content."""
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()
```

The runner wraps the call in `asyncio.run()` in the subprocess.

---

## Skill Assignment

The `skill` parameter groups tools together. When a skill is activated or deactivated, all its tools follow:

```python
@tool(skill="web")      # Part of the "web" skill group
def fetch_url(...): ...

@tool(skill="web")      # Also part of "web"
def parse_html(...): ...

@tool(skill="OS")       # Part of the "OS" skill group
def list_files(...): ...

@tool()                  # No skill — always available when tools are enabled
def generic_helper(...): ...
```

If "web" is a non-default skill, the agent must call `add_new_skill("web")` before `fetch_url` and `parse_html` become available.
