import os
import uuid
import json
import os
from agent.system.configurations.configs.skills import (
    SKILL_DB_PATH,
)
import chromadb

def make_tool_termination_message_before(tool_call_id):
    """
    Send this the MOMENT termination is requested — before you know
    whether the kill actually succeeded yet.
    """
    return {
        "role": "tool",
        "tool_call_id": tool_call_id,
        "content": (
            f"they has requested to terminate this tool call (ID: {tool_call_id}). "
            "A stop signal has been sent, but completion is not yet confirmed. "
            "The tool may still finish normally, or it may stop unexpectedly if the "
            "termination takes effect."
        ),
    }


def make_tool_termination_message_after(tool_call_id):
    """
    Send this AFTER you've confirmed the process is actually gone —
    e.g. after polling and finding it no longer exists.
    """
    return {
        "role": "tool",
        "tool_call_id": tool_call_id,
        "content": (
            f"they don't wants this tool call to be run, that's why they cancelled this tool call."
        ),
    }

def r_h(status=None, comment=None, data=None):
    return {
        "status": status,
        "comment": comment,
        "data": data,
    }


def get_sec_key():
    with open("user.json") as file:
        _user = json.load(file)
    return _user.get("sec_key")


def validate_sec_key(sec_key):
    if get_sec_key() != str(sec_key):
        return r_h(
            False,
            "you passed wrong sec key",
            """'Get the hell out of here.' if not user else `try to new key`""",
        )
    else:
        return r_h(
            True,
            "you correct sec key",
        )


def get_avail_formats():
    with open("avail_formats.json") as file:
        return json.load(file)


def get_size(path):
    try:
        size_in_bytes = os.path.getsize(path)
        return r_h(True, "get size", size_in_bytes)
    except FileNotFoundError as e:
        return r_h(False, "file not found", str(e))

    except Exception as e:
        return r_h(False, "something went wrong while getting size of file", e)


def format_available(path):
    try:
        name, ext = os.path.splitext(path)
        print(name, ext)
        af = get_avail_formats()
        if ext not in af:
            return r_h(False, "file not available")

        return r_h(True, "format available")

    except FileNotFoundError as e:
        return r_h(False, "file not found", str(e))

    except Exception as e:
        return r_h(False, "something went wrong while validating file", str(e))


def _find_safe_end(text, start, end):
    """
    Nudge the chunk's end index backward to the nearest space,
    so we never cut a word in half.
    """
    # If we've hit the end of the file, that's always a safe stopping point
    if end >= len(text):
        return len(text)

    # If the character right at `end` is already whitespace, we're fine as-is
    if text[end].isspace():
        return end

    # Otherwise, walk backward one character at a time until we find a space
    safe_end = end
    while safe_end > start and not text[safe_end].isspace():
        safe_end -= 1

    # Edge case: if there's one giant word with no spaces at all,
    # we can't avoid breaking it — just fall back to the original cut point
    if safe_end == start:
        return end

    return safe_end


def get_all_ids_in_collection(collec_name):
    try:
        client = chromadb.PersistentClient(path=SKILL_DB_PATH)

        collection = client.get_or_create_collection(
            name=collec_name,
        )

        all_ids = collection.get()["ids"]

        return r_h(
            True,
            "get all id",
            all_ids,
        )

    except Exception as e:
        return r_h(False, "something went wrong while getting all ids", e)


def make_file_chunks(file_abslt_path, collection_name, cha_per_chunk=200, overlap=40):
    try:
        if not format_available(file_abslt_path):
            return r_h(
                False,
                "file format is not available",
            )

        documents = []
        ids = []

        # Safety check: if overlap is equal to or bigger than the chunk size,
        # 'start' would never move forward and we'd loop forever.
        if overlap >= cha_per_chunk:
            return r_h(
                False,
                "invalid chunk settings",
                "overlap must be smaller than cha_per_chunk",
            )

        # Read the whole file as plain text
        with open(file_abslt_path, "r", encoding="utf-8") as f:
            text = f.read()

        # Just the filename (no folder path) so ids stay short and readable
        file_name = os.path.basename(file_abslt_path)

        start = 0  # where the current chunk starts
        chunk_number = 0  # used to build a readable part of the id

        while start < len(text):
            raw_end = start + cha_per_chunk  # naive character cut point

            # Nudge that cut point back to the nearest space so words stay whole
            end = _find_safe_end(text, start, raw_end)

            chunk_text = text[start:end].strip()  # trim leading/trailing spaces

            if chunk_text:  # skip empty chunks (can happen near the end of the file)
                # uuid4().hex gives a random, near-impossible-to-collide suffix.
                # Combined with filename + chunk_number, this is both unique AND readable.
                while True:
                    unique_id = (
                        f"{file_name}_chunk_{chunk_number}_{uuid.uuid4().hex[:8]}"
                    )
                    if not unique_id in get_all_ids_in_collection(
                        collec_name=collection_name
                    ):
                        break

                documents.append(chunk_text)
                ids.append(unique_id)
                chunk_number += 1

            # Move the window forward based on where this chunk actually ended,
            # stepping back by `overlap` characters for context continuity
            new_start = end - overlap

            # Guard against getting stuck: always make sure we move forward at least 1 char
            start = new_start if new_start > start else end

        return r_h(
            True, "documents and ids are ready", {"documents": documents, "ids": ids}
        )
    except Exception as e:
        return r_h(False, "error occured why making file chunks", e)
