# TARS

**An autonomous AI agent with tool execution, RAG-based knowledge retrieval, dynamic skill management, and a real-time streaming backend.**

TARS is built on top of the [**fluid**](https://github.com/bravecoconut/fluid) agent framework — a modular Python library that handles LLM generation, tool registration and execution, vector retrieval (RAG), and intelligent context management. TARS wires fluid into a full-stack application with a Quart (async Flask) server, MongoDB persistence, a ChromaDB vector store, and a Server-Sent Events (SSE) streaming interface.

[![TARS completing tasks seamlessly](https://img.youtube.com/vi/lFAg4LnPKF8/maxresdefault.jpg)](https://www.youtube.com/watch?v=lFAg4LnPKF8)


---

## Key Features

| Feature | Description |
|---|---|
| **Agentic Loop** | Multi-turn LLM loop with automatic tool calling, timeout management, and self-recovery |
| **Tool System** | `@tool` decorator for auto-discovery; tools run in isolated subprocesses with live stdout/stderr streaming |
| **Dynamic Skills** | Agent can add, remove, and swap skill groups at runtime — each skill carries its own tools and RAG collections |
| **RAG (Vector Retrieval)** | ChromaDB-backed retrieval with parallel multiprocessing queries across multiple collections |
| **SRCF** | *Self-Referential Context Filtering* — semantically trims long conversations to keep only relevant history |
| **Tones** | Switchable personality profiles (clear, robotic, sarcastic, emotional) with per-tone temperature |
| **Memory** | Persistent user memory that the agent can silently write to across sessions |
| **Real-time Streaming** | SSE endpoint for live token-by-token and tool-event streaming to the frontend |
| **Session Management** | MongoDB-backed sessions with message history, pinning, file attachments, and ASCII file ingestion |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (client/)                    │
│                 HTML/JS/CSS served by Quart                  │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP / SSE
┌────────────────────────────▼────────────────────────────────┐
│                     Quart Server (server.py)                 │
│                                                              │
│  Blueprints:                                                 │
│    /api/sessions/*      → Session CRUD                       │
│    /api/agents/*        → Agent lifecycle + SSE streaming     │
│    /api/agent/ascii/*   → File ingestion (RAG)               │
│    /api/user/client/*   → LLM client settings                │
│    /api/user/srcf/*     → SRCF tuning                        │
│    /api/user/others/*   → Tone, memory, instructions, name   │
└────────────────────────────┬────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌──────────────┐   ┌─────────────────┐   ┌──────────────────┐
│   MongoDB    │   │   agent/        │   │  agent_backend/  │
│  (Beanie)    │   │  _Main_Agent    │   │   Agents class   │
│  Sessions    │   │                 │   │  SessionBroadcast│
└──────────────┘   └────────┬────────┘   └────────┬─────────┘
                            │                     │
                   ┌────────▼─────────────────────▼────────┐
                   │            fluid/ framework            │
                   │                                        │
                   │  ┌──────────────────────────────────┐  │
                   │  │     RegularInterface (core)      │  │
                   │  │  • Agent loop (run_agent)         │  │
                   │  │  • Tool dispatch & timeout mgmt   │  │
                   │  │  • Skill add/remove/switch        │  │
                   │  └──────┬───────────┬───────────┬───┘  │
                   │         │           │           │       │
                   │  ┌──────▼───┐ ┌─────▼─────┐ ┌──▼────┐  │
                   │  │generation│ │  toolkit   │ │vector │  │
                   │  │ OpenAI   │ │ registry + │ │retrive│  │
                   │  │ streaming│ │ runner     │ │pool   │  │
                   │  └──────────┘ └───────────┘ └───────┘  │
                   │                                        │
                   │  ┌──────────────────────────────────┐  │
                   │  │  SRCF (context filtering)        │  │
                   │  │  BuildSystemMessages              │  │
                   │  │  Utility functions                │  │
                   │  └──────────────────────────────────┘  │
                   └────────────────────────────────────────┘
                                    │
                            ┌───────▼───────┐
                            │   ChromaDB    │
                            │  (TARS_DB/)   │
                            │  persistent   │
                            └───────────────┘
```

---

## Quick Start

[![TARS Installation & Usage Guide](https://img.youtube.com/vi/OgA2XOeov1c/maxresdefault.jpg)](https://www.youtube.com/watch?v=OgA2XOeov1c)


### Prerequisites

- **Python 3.10+**
- **MongoDB** running locally on port `27017`
- An **OpenAI-compatible LLM endpoint** (local Ollama, vLLM, or cloud API)

### Installation

```bash
git clone https://github.com/bravecoconut/TARS.git
cd TARS
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Configuration

1. **Set your secret key** (used for API authentication via cookies):

```bash
python3 -m set_secret_key YOUR_SECRET_KEY
```

2. **Edit `user.json`** to configure your LLM endpoint or do it from UI:

```json
{
    "base_url": "http://localhost:11434/v1",
    "api_key": "ollama",
    "model": "qwen3:14b",
    "embedding_model": "znbang/bge:large-en-v1.5-f16"
}
```

3. **Create a `.env` file** with:

```
MAX_NEW_SKILLS=0
MAX_TURNS=50
```

### Running

```bash
python3 -m server
```

The server starts on `http://localhost:5000`.

first go to `http://localhost:5000/auth` and set your secret key that you provide earlier as 'YOUR_SECRET_KEY' and don't share that to key to stranger or they may use your TARS.

> **Note:** The current UI has not been fully optimized for mobile devices. Contributions to improve responsiveness in the `/client` directory are welcome.

---

## Documentation Index

| Document | Description |
|---|---|
| [Architecture](architecture.md) | Deep dive into how all components connect |
| [Fluid Framework](fluid.md) | Complete guide to the fluid agent framework |
| [API Reference](api.md) | Every REST endpoint with request/response examples |
| [Configuration](configuration.md) | All settings in `user.json` and `.env` explained |
| [Tools Guide](tools.md) | How to create custom tools with the `@tool` decorator |
| [Skills & RAG](skills.md) | Skill system, vector retrieval, and knowledge management |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Server | Quart (async Python) + quart-cors |
| Database | MongoDB via Motor + Beanie ODM |
| Vector Store | ChromaDB (persistent on-disk) |
| LLM Interface | OpenAI Python SDK (compatible with any OpenAI-format API) |
| Embeddings | Sentence-Transformers (local) or OpenAI-compatible API |
| Process Isolation | Python `multiprocessing` (spawn context) |

---

## Project Structure

```
TARS/
├── server.py                 # Quart app entry point
├── db.py                     # MongoDB / Beanie initialization
├── user.json                 # User configuration (LLM, tones, paths)
├── origins.py                # CORS allowed origins
├── utils.py                  # Shared utilities (response helpers, chunking)
├── set_secret_key.py         # CLI tool to set authentication key
├── requirements.txt          # Python dependencies
│
├── fluid/                    # ← The agent framework (core engine)
│   ├── generation/           #   OpenAI-compatible streaming client
│   ├── regular_interface/    #   Agent loop, SRCF, system messages
│   ├── toolkit/              #   @tool decorator, subprocess runner
│   ├── vector_retrive/       #   ChromaDB retrieval + multiprocess pool
│   └── utill.py              #   Framework utilities
│
├── agent/                    # TARS-specific agent configuration
│   ├── _agent_/              #   _Main_Agent wrapper class
│   └── system/               #   System prompts, configs, skill definitions
│
├── agent_backend/            # Agent lifecycle management
│   ├── agents/               #   Agents class + SessionBroadcaster
│   ├── ascii/                #   ASCII file ingestion pipeline
│   └── chroma/               #   ChromaDB dump/delete operations
│
├── agent_settings/           # Settings mutation functions
├── backend/                  # Session CRUD (upload, gather, update, delete)
├── quart_blueprints/         # HTTP API route definitions
├── tools/                    # User-defined tools (@tool decorated)
├── memory/                   # Persistent user memory
├── instructions/             # Custom user instructions for the agent
├── tones/                    # Personality tone markdown files
├── models/                   # Beanie document models
├── client/                   # Frontend assets (HTML/JS/CSS)
├── TARS_DB/                  # ChromaDB persistent storage
└── logs/                     # Runtime log files
```

---

## License

This project is licensed under the Apache License 2.0. See [LICENSE](../LICENSE) for details.