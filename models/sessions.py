from beanie import Document
from pydantic import Field
import time

class Sessions(Document):
    name: str="no name provided"
    dumped_paths:list[dict]=[]
    pin: bool = False
    created: float = Field(default_factory=time.time)
    streaming: bool = False
    messages: list[dict] = []

    class Settings:
        name = "sessions"
