from beanie import Document
from pydantic import Field
import time
from typing import Optional


class Sessions(Document):
    session_name: str = "No name provided"
    session_proj: str = None
    session_pined: bool = False
    session_messages: list[dict] = []
    session_media_paths: list[str] = []
    is_stream: bool = False
    session_created: float = Field(default_factory=time.time)
