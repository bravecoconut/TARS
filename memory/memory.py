from fluid.toolkit.tool_registry import tool
import json


@tool(skill="OS")
def set_memory(new_memory):
    """
    Append a new memory entry about the user to their memory file.

    Reads the user's memory file path from "user.json" (key: "memory_path"),
    then appends the given memory as a new line to that file, surrounded by
    blank lines for readability. Does not overwrite or deduplicate existing
    memories — each call adds a new entry.

    Args:
        new_memory (str): The memory text to save (e.g. a user preference,
            fact, or piece of context worth remembering for future sessions).

    Returns:
        None

    Side effects:
        - Reads "user.json" from the current working directory.
        - Opens and appends to the file at da["memory_path"].

    Notes:
        - Assumes "user.json" exists and contains a valid "memory_path" key.
        - No error handling for missing files, malformed JSON, or missing keys.
    """
    with open("user.json") as file:
        da = json.load(file)
    with open(da["memory_path"], "a") as file:
        file.write(f"\n{new_memory}\n")
