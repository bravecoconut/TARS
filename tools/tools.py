from fluid.toolkit.tool_registry import tool

"""
type_safe_utils.py

Five standalone, type-safe utility functions. Each is fully self-contained --
no class instantiation, no config files, no env vars required. Import and
call directly: FUNCTION(ARGS).

Dependencies: standard library only, except `download_file`, which uses
`requests` (pip install requests).

- running model's parallel tool calls sequencially is feature, not a bug., just to
 save api requests.
"""


import hashlib
import shutil
import subprocess
import time
from pathlib import Path

import requests


# --------------------------------------------------------------------------
# 1. Download a file from a URL
# --------------------------------------------------------------------------
@tool(skill="OS", usually_takes=30)
def download_file(
    url: str,
    dest: str,
    timeout: int = 30,
    overwrite: bool = False,
) -> str:
    """
    Download a file from `url` and save it to `dest`. Streams the response
    so large files never get fully buffered in memory.

    Returns the absolute path of the saved file as a string.

    Raises:
        FileExistsError: if `dest` already exists and overwrite=False.
        requests.HTTPError: if the server returns a 4xx/5xx status.
        requests.Timeout: if the request exceeds `timeout` seconds.

    Example:
        >>> download_file("https://example.com/file.zip", "downloads/file.zip")
        '/home/user/downloads/file.zip'
    """
    dest_path = Path(dest)
    if dest_path.exists() and not overwrite:
        raise FileExistsError(
            f"{dest_path} already exists (pass overwrite=True to replace it)"
        )

    dest_path.parent.mkdir(parents=True, exist_ok=True)

    with requests.get(url, stream=True, timeout=timeout) as response:
        response.raise_for_status()
        tmp_path = dest_path.with_suffix(dest_path.suffix + ".part")
        with open(tmp_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        tmp_path.replace(dest_path)  # only becomes the real file once fully written

    return str(dest_path.resolve())


# --------------------------------------------------------------------------
# 2. Run a shell command safely (structured result as a string)
# --------------------------------------------------------------------------
@tool(skill="OS")
def run_shell_command(
    cmd: str,
    timeout: int = 30,
    cwd: str = "",
) -> str:
    """
    Run a shell command string and return a structured text result showing
    the return code, stdout, and stderr. Safe to use — captures output and
    never raises on non-zero exit codes.

    Args:
        cmd: The shell command to run, e.g. "ls -la /tmp" or "python3 script.py"
        timeout: Maximum seconds to wait before killing the command.
        cwd: Working directory to run the command in. Empty string = current directory.

    Returns a string with this format:
        RETURNCODE: 0
        STDOUT:
        <output here>
        STDERR:
        <errors here, if any>

    Example:
        >>> run_shell_command("ls -la /tmp")
        'RETURNCODE: 0\\nSTDOUT:\\ntotal 40\\ndrwxrwxrwt ...\\nSTDERR:\\n'
    """
    work_dir = cwd if cwd else None
    try:
        completed = subprocess.run(
            cmd,
            cwd=work_dir,
            timeout=timeout,
            capture_output=True,
            text=True,
            shell=True,
        )
        return (
            f"RETURNCODE: {completed.returncode}\n"
            f"STDOUT:\n{completed.stdout}\n"
            f"STDERR:\n{completed.stderr}"
        )
    except subprocess.TimeoutExpired as e:
        return (
            f"RETURNCODE: -1 (timed out after {timeout}s)\n"
            f"STDOUT:\n{e.stdout or ''}\n"
            f"STDERR:\n{(e.stderr or '')} [command timed out after {timeout}s]"
        )
    except FileNotFoundError as e:
        return (
            f"RETURNCODE: -1\n"
            f"STDOUT:\n\n"
            f"STDERR:\n[command not found: {e}]"
        )
    except Exception as e:
        return (
            f"RETURNCODE: -1\n"
            f"STDOUT:\n\n"
            f"STDERR:\n[unexpected error: {e}]"
        )


# --------------------------------------------------------------------------
# 3. Compute a file's hash digest
# --------------------------------------------------------------------------
@tool(skill="OS")
def compute_file_hash(
    path: str,
    algorithm: str = "sha256",
) -> str:
    """
    Compute the hex digest of a file without loading it fully into memory.

    Args:
        path: Path to the file to hash.
        algorithm: Hash algorithm to use. One of: md5, sha1, sha256, sha512.

    Returns the hex digest string.

    Raises:
        FileNotFoundError: if `path` doesn't exist.
        ValueError: if `algorithm` isn't supported.

    Example:
        >>> compute_file_hash("interface.py")
        'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3...'
    """
    file_path = Path(path)
    if not file_path.is_file():
        raise FileNotFoundError(f"No such file: {file_path}")

    try:
        hasher = hashlib.new(algorithm)
    except ValueError:
        raise ValueError(f"Unsupported algorithm: {algorithm!r}") from None

    with open(file_path, "rb") as f:
        while True:
            chunk = f.read(65536)
            if not chunk:
                break
            hasher.update(chunk)

    return hasher.hexdigest()


# --------------------------------------------------------------------------
# 4. Write text content to a file
# --------------------------------------------------------------------------
@tool(skill="OS")
def write_text_file(
    path: str,
    content: str,
    overwrite: bool = False,
) -> str:
    """
    Write text content to a file. Creates parent directories if needed.

    Args:
        path: Destination file path, e.g. "/home/user/notes/summary.txt"
        content: The text content to write to the file.
        overwrite: If True, overwrite existing file. If False, raise error if file exists.

    Returns a confirmation string with the absolute path and byte count.

    Example:
        >>> write_text_file("/tmp/hello.txt", "Hello World!")
        'Written 12 bytes to /tmp/hello.txt'
    """
    file_path = Path(path)
    if file_path.exists() and not overwrite:
        raise FileExistsError(
            f"{file_path} already exists (pass overwrite=True to replace it)"
        )

    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding="utf-8")

    return f"Written {len(content.encode('utf-8'))} bytes to {file_path.resolve()}"


# --------------------------------------------------------------------------
# 5. Zip a directory
# --------------------------------------------------------------------------
@tool(skill="OS", usually_takes=5)
def zip_directory(
    source_dir: str,
    output_path: str,
    overwrite: bool = False,
) -> str:
    """
    Compress an entire directory tree into a .zip file, preserving relative
    paths inside the archive.

    Args:
        source_dir: Path to the directory to compress.
        output_path: Where to save the .zip file.
        overwrite: If True, overwrite existing zip. If False, raise error if exists.

    Returns the absolute path of the created .zip file as a string.

    Raises:
        NotADirectoryError: if `source_dir` isn't a directory.
        FileExistsError: if `output_path` exists and overwrite=False.

    Example:
        >>> zip_directory("build/", "release/build.zip")
        '/home/user/release/build.zip'
    """
    src = Path(source_dir)
    if not src.is_dir():
        raise NotADirectoryError(f"Not a directory: {src}")

    out = Path(output_path)
    if out.exists() and not overwrite:
        raise FileExistsError(
            f"{out} already exists (pass overwrite=True to replace it)"
        )

    out.parent.mkdir(parents=True, exist_ok=True)

    # shutil.make_archive wants a base path without the extension
    base_name = str(out.with_suffix(""))
    archive_path = shutil.make_archive(base_name, "zip", root_dir=src)
    return str(Path(archive_path).resolve())


# --------------------------------------------------------------------------
# 6. Read text file contents
# --------------------------------------------------------------------------
@tool(skill="OS")
def read_text_file(
    path: str,
    max_chars: int = 5000,
) -> str:
    """
    Read and return the text contents of a file.

    Args:
        path: Path to the file to read.
        max_chars: Maximum number of characters to return (to avoid huge outputs).
                   Set to 0 to read the entire file.

    Returns the file contents as a string. If the file is longer than max_chars,
    only the first max_chars characters are returned with a truncation notice.

    Example:
        >>> read_text_file("/tmp/hello.txt")
        'Hello World!'
    """
    file_path = Path(path)
    if not file_path.is_file():
        raise FileNotFoundError(f"No such file: {file_path}")

    content = file_path.read_text(encoding="utf-8", errors="replace")

    if max_chars > 0 and len(content) > max_chars:
        return content[:max_chars] + f"\n\n... [truncated, {len(content)} total chars]"

    return content
