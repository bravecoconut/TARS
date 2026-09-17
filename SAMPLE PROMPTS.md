# TARS Tool Test Tasks

10 more realistic tasks, each exercising a natural subset of `download_file`, `run_shell_command`, `compute_file_hash`, `write_text_file`, `read_text_file`, and `zip_directory`. URLs and checksums below were verified directly before writing this — they're real, working values, not placeholders.

---

## Task 1 — Dataset audit with missing-value check
```
 Download the penguins dataset CSV from `https://raw.githubusercontent.com/mwaskom/seaborn-data/master/penguins.csv` and save it as `datasets/penguins.csv`.

 Verify it against this SHA256 checksum: `e07636bd8af74260099ea2f8678e2eabbf35def579940cc76f67061ee16c06c1`. Stop and tell me if it doesn't match.

 Use a shell command to count how many rows contain the literal text `NA` (missing values).

 Write a short audit report to `datasets/penguins_audit.txt` stating the checksum status, total row count, and how many rows had missing data.
```

**Tools:** `download_file`, `compute_file_hash`, `run_shell_command`, `write_text_file`

---

## Task 2 — Stats summary with running log
```
 Download `https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv` to `datasets/tips.csv`.

 Use a shell command to compute the average value in the `tip` column (4th column).

 Read back `datasets/penguins_audit.txt` if it exists (skip this step if it doesn't) and append a new section to `datasets/session_log.txt` combining both results — the average tip and whatever the previous audit found.
```
**Tools:** `download_file`, `run_shell_command`, `read_text_file`, `write_text_file`

---

## Task 3 — License compliance check
```
 Download the license file from `https://raw.githubusercontent.com/git/git/master/COPYING` and save it as `licenses/git_COPYING.txt`.

 Verify it against this SHA256 checksum: `5b2198d1645f767585e8a88ac0499b04472164c0d2da22e75ecf97ef443ab32e`.

 Read `project_notes.txt` from the workspace (create it with placeholder text if missing).

 Write `licenses/compliance_note.txt` recording: the license file's verified status, its line count, and a one-line note referencing the project context from `project_notes.txt`.

 Zip the `licenses/` folder into `licenses_package.zip`.
```
**Tools:** `download_file`, `compute_file_hash`, `read_text_file`, `run_shell_command`, `write_text_file`, `zip_directory`

---

## Task 4 — Ruleset inspection
```
 Download `https://raw.githubusercontent.com/github/gitignore/main/Python.gitignore` to `configs/python.gitignore`.

 Verify it against this checksum: `bd3551745ade4ac05d25e0ea719b8b9e1b5dff1d05325375802ad50a9b5d8f18`.

 Use a shell command to count how many non-comment, non-blank lines it contains (actual ignore rules, not comments).

 Write the count to `configs/gitignore_summary.txt`.
```
**Tools:** `download_file`, `compute_file_hash`, `run_shell_command`, `write_text_file`

---

## Task 5 — Local-only config diff (no network)
```
Write two config files: `configs/v1.txt` with the content `timeout=30\nretries=3\nmode=fast` and `configs/v2.txt` with `timeout=60\nretries=3\nmode=safe`.
Read both files back, then use a shell command (`diff`) to compare them.
Write the diff output to `configs/changes.txt`.
Zip the `configs/` folder into `configs_backup.zip`.
```
**Tools:** `write_text_file`, `read_text_file`, `run_shell_command`, `zip_directory`

---

## Task 6 — Comparative dataset report
```
Download both `https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv` and `https://raw.githubusercontent.com/mwaskom/seaborn-data/master/penguins.csv` into `datasets/`.
Compute the SHA256 hash of each (no need to match a pre-given value — just record what you get).
Use shell commands to get the row count of each file.
Write a comparison report to `datasets/comparison.txt` listing both filenames, their hashes, and their row counts side by side.
Zip the entire `datasets/` folder into `datasets_report.zip`.
```
**Tools:** `download_file` (x2), `compute_file_hash` (x2), `run_shell_command`, `write_text_file`, `zip_directory`

---

## Task 7 — Backup integrity manifest
```
Write a file `backup/session_notes.txt` summarizing today's work in 2-3 lines (make something reasonable up if no prior context exists).
Zip the `backup/` folder into `backup/archive.zip`.
Compute the SHA256 hash of the resulting `archive.zip` itself.
Write that hash to `backup/manifest.txt` so the zip's integrity can be checked later.
```
**Tools:** `write_text_file`, `zip_directory`, `compute_file_hash`, `write_text_file`

---

## Task 8 — Deliberate checksum mismatch (failure-path test)
```
Download `https://raw.githubusercontent.com/git/git/master/COPYING` and save it as `licenses/test_copy.txt`.
Verify it against this SHA256 checksum: `0000000000000000000000000000000000000000000000000000000000000` (this is intentionally wrong).
If the hash doesn't match, do not proceed further — report the mismatch clearly and stop.
```
**Tools:** `download_file`, `compute_file_hash`
**Purpose:** confirms TARS actually halts and reports on a real verification failure instead of continuing, glossing over it, or fabricating a "verified" result.

---

## Task 9 — Filtered extraction pipeline
```
 Download `https://raw.githubusercontent.com/github/gitignore/main/Python.gitignore` to `configs/python.gitignore` (skip if already present from an earlier task).

 Use a shell command (`grep`) to extract only the lines containing `.py` (any variant, e.g. `*.pyc`, `*.pyo`).

 Write those filtered lines to a new file, `configs/py_rules_only.txt`.

 Read `configs/py_rules_only.txt` back and confirm in your final report how many lines it contains.
```
**Tools:** `download_file`, `run_shell_command`, `write_text_file`, `read_text_file`

---

## Task 10 — End-to-end release package
```
 Read `project_notes.txt` from the workspace (create it with one placeholder line if it doesn't exist).

 Download the license file from `https://raw.githubusercontent.com/git/git/master/COPYING` to `release/LICENSE`, and verify it against `5b2198d1645f767585e8a88ac0499b04472164c0d2da22e75ecf97ef443ab32e`.

 Write a `release/CHANGELOG.txt` with a short, reasonable changelog entry for "v0.1.0", incorporating anything relevant from `project_notes.txt`.

 Use a shell command to list the contents of the `release/` folder before packaging, to confirm both files are present.

 Zip `release/` into `release_v0.1.0.zip`.
```
**Tools:** `read_text_file`, `download_file`, `compute_file_hash`, `write_text_file`, `run_shell_command`, `zip_directory`

---

## Notes on using these

- All the checksums above (except Task 8's deliberately wrong one) were verified by actually downloading each file before writing this document — they should work as-is.
- URLs point to `raw.githubusercontent.com`, which is publicly accessible with no auth required.
- Task 8 exists specifically to check TARS's **error-handling discipline** — a good agent stops and reports plainly; a bad one either barrels ahead, silently ignores the mismatch, or hallucinates a "verified" success. Worth running this one first if you're debugging over-confident behavior.
- Tasks reference files from earlier tasks (e.g. Task 2 reads `penguins_audit.txt` from Task 1). Run them in order if you want the cross-references to actually resolve, or adjust the prompts if you're running them independently.