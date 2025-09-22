---
description: Layer 1 — verify an existing repository against the Genesis foundation and bootstrap missing pieces without overwriting; also supports clean bootstrap from scratch. This rewrite clarifies rules, adds light validation, and defines idempotence tests and machine-readable status.
---

<!-- memory-bank/instructions/layer-1-verify-and-bootstrap.instructions.md (rewritten) -->

# Layer 1 — Foundation Verification and Bootstrap

Layer 1 provides a universal, language-agnostic baseline for any repository. It defines a **small, canonical set of files** and an **idempotent initializer** so higher layers can build safely. This document instructs an AI agent or operator to **verify** an existing repo and **add only what is missing**. It also defines how to **bootstrap from scratch** if no files exist.

## Operating Principles (Hard Rules)
1. **Verify first, then create-only.** Never overwrite or mutate existing files at Layer 1 unless a higher layer explicitly authorizes it.
2. **Idempotent by construction.** Running the procedure multiple times must yield no changes after the first successful pass.
3. **Non-destructive validation.** When existing files are present, perform minimal conformance checks. If a file is non-conforming, **do not edit**—flag it in the final report.
4. **Deterministic outputs.** Same inputs produce the same results and the same status report.
5. **Human- and machine-readable status.** Print a concise summary and a single-line JSON object capturing results, flags, and idempotence.
6. **Safe defaults.** Default license is MIT (unless instructed otherwise). Default version seed is `0.0.1`.

---

## Scope: Foundation Artifacts (8)
At the repository root (unless noted):
- `.editorconfig`
- `.gitattributes`
- `.gitignore`
- `LICENSE`
- `README.md`
- `VERSION`
- `scripts/README.md`
- `scripts/init.sh`

---

## Inputs & Environment (Optional but Helpful)
- `LICENSE_HOLDER` — overrides copyright holder for `LICENSE`.
- `LICENSE_YEAR` — overrides copyright year for `LICENSE`.
- `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL` — may be used by `git` if not already configured.
- `GH_REMOTE` — optional remote name/URL or org/repo for `gh repo create`.

If any of the above are missing, the process continues with safe fallbacks and flags placeholders in the final status.

---

## Decision Flow (High Level)
1. Detect repository state → **existing** vs **new**.
2. Inventory the 8 artifacts → mark **present** or **missing**.
3. Create **only** the missing artifacts; never overwrite.
4. If repo is new → initialize `git` and make the first commit (when identity allows).
5. Verify idempotence → immediate rerun produces zero changes.
6. Emit final human summary + machine JSON status.

---

## A. Repository State & Inventory
**Goal:** Decide between “augment existing” and “bootstrap new,” and assemble a precise artifact checklist.

### Procedure
- **Detect git repo**
  - If a `.git/` directory exists at project root → set `repo_state = "existing"`.
  - Else → set `repo_state = "new"`.
- **Inventory artifacts** (at paths listed in Scope). For each item, set `present` or `missing`.
- Proceed with **create-missing-only** for existing repos, or **full bootstrap** for new ones.

### Light Validation (non-blocking)
- **Do not modify** existing files. Instead, record any obvious mismatches to canonical intent, e.g.:
  - `.editorconfig` lacks `utf-8`, LF, final newline, or 2-space default.
  - `.gitattributes` absent `* text=auto` or missing binary markers.
  - `.gitignore` accidentally ignores `.vscode/` entirely.
  - `LICENSE` holder/year missing or generic.
  - `scripts/init.sh` not executable.
- Add any findings to the `notes[]` list in the final JSON.

---

## B. Create Missing Artifacts (No Overwrites)
**Goal:** Provide canonical baselines that minimize drift and work across languages.

### B1. `.editorconfig` (if missing)
**Intent:** Standardize line endings, charset, indentation, final newline, and trimming.

**Canonical minimum:**
```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

(Per-language overrides MAY be added by higher layers.)

### B2. `.gitattributes` (if missing)
**Intent:** Normalize text files and mark common binaries for safe diffs.

**Canonical minimum:**
```
* text=auto
*.sh text eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf

# Common binaries
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.pdf binary
*.zip binary
*.tar binary
*.tar.gz binary
*.tgz binary
*.ico binary
```

### B3. `.gitignore` (if missing)
**Intent:** Exclude OS junk, editor caches, logs, env files, dependency/build outputs.

**Canonical baseline (language-agnostic):**
```
# OS
.DS_Store
Thumbs.db

# Logs / env
*.log
npm-debug.log*
*.env
.env.*

# Dependency caches
node_modules/
.pnpm-store/
vendor/
__pycache__/
*.pyc

# Builds / dist / coverage
build/
dist/
out/
coverage/
.cache/

# Editors / IDEs
.idea/
.vscode/**
!.vscode/
!.vscode/settings.json
.vscode/**/workspaceStorage/
.vscode/*.db
```
> Note: `.vscode/` is **not** globally ignored; we allow a curated `settings.json` while excluding volatile subpaths.

### B4. `LICENSE` (if missing)
**Intent:** Establish legal baseline. Default to MIT unless instructed otherwise.

**Source of holder and year (first available wins):**
1. `LICENSE_HOLDER` env var, else `git config user.name`, else `"YOUR NAME"` placeholder.
2. `LICENSE_YEAR` env var, else current year.

If placeholders are used, insert a short TODO line at top and add `"license_holder_placeholder"` or `"license_year_placeholder"` to `notes[]`.

**Content:** Standard MIT License text.

### B5. `README.md` (if missing)
**Intent:** Human entry point.

**Required sections (stubs acceptable):**
- **Overview** — what this repo is and why it exists.
- **Features** — bullet list.
- **Quick Start** — minimal steps to run/build/use.
- **Documentation** — links or pointers to higher layers or docs site.
- **Contributing** — basic guidelines.
- **License** — refer to `LICENSE`.
- **Support** — where to get help.
- **Acknowledgments** — optional credits.

Include a one-line note: “This repository uses a universal foundation (Layer 1).”

### B6. `VERSION` (if missing)
Write exactly:
```
0.0.1
```

### B7. `scripts/` directory (ensure exists)
Create if missing.

### B8. `scripts/README.md` (if missing)
Explain idempotence, how to run `init.sh`, and guarantees:
- No overwrites at Layer 1.
- Safe to rerun.
- Prints machine-readable status.

### B9. `scripts/init.sh` (if missing)
Create an idempotent initializer. **Do not overwrite** if it already exists.

**Behavioral contract:**
- Shebang: `#!/usr/bin/env bash` (or POSIX `sh` if required).
- Safety: `set -euo pipefail`; `IFS=$'\n\t'`.
- Log start time in ISO 8601 and repo path.
- Re-verify presence of the 8 artifacts.
- `chmod +x` on `scripts/*.sh` if they exist.
- If `.git/` is absent → initialize git and attempt first commit (see Section D).
- Always print the final status JSON (Section F) and a human summary.
- Exit non-zero on internal errors; never modify existing artifacts.

**It must print the date/time of execution.**

---

## C. Git Initialization & First Commit (Only if No Repo Exists)
**Goal:** Initialize cleanly without breaking idempotence.

### Procedure
- If `.git/` is absent:
  - `git init`
  - `git add .`
  - If `user.name` and `user.email` are configured:
    - `git commit -m "Scientia est lux principium✨"`
  - Else:
    - Print a warning (identity missing); skip commit this run.
  - (Optional) If a remote is requested/configured (e.g., `gh repo create <target>`), perform creation and push; otherwise skip silently.
- If `.git/` exists → do nothing in this section.

---

## D. Verification & Exit Criteria (Hard)
**All must be true at exit:**
1. All 8 artifacts exist.
2. `scripts/init.sh` is executable.
3. **Idempotence proven:** a second run causes no file changes.

### Idempotence Test
- If inside a git repo: run `git diff --quiet --exit-code` after immediate re-run of `scripts/init.sh`.
  - Exit code `0` → PASS; else FAIL and list changed paths.
- If not in a git repo: compute a quick hash (or timestamp scan) before/after second run and compare; differences → FAIL.

---

## E. Final Status Output (Human + Machine)
**Human summary**: short bullets stating created/present/skipped and any warnings.

**Machine-readable JSON**: print **one line** containing keys as below:
```json
{
  "repo_state": "existing|new",
  "artifacts": {
    ".editorconfig": "present|created",
    ".gitattributes": "present|created",
    ".gitignore": "present|created",
    "LICENSE": "present|created|placeholder",
    "README.md": "present|created",
    "VERSION": "present|created",
    "scripts/README.md": "present|created",
    "scripts/init.sh": "present|created"
  },
  "idempotent": true,
  "notes": ["license_holder_placeholder", "git_identity_missing"]
}
```

Values are illustrative; include only encountered notes.

---

## F. Edge Cases & Safety Notes
- **Existing but non-conforming files**: never overwrite. Record a note so a higher layer or a human can reconcile.
- **`.vscode/` handling**: allow `settings.json` to be committed while ignoring volatile subpaths; this prevents personal junk from polluting the repo while enabling team-wide editor settings.
- **Non-POSIX shells**: if `bash` is unavailable, use POSIX `sh` and remove bashisms; keep the same behavior.
- **Partial runs**: scripts must fail fast on errors and leave a clear trail in the status output.
- **Re-entrancy**: safe to run from any working directory at project root; avoid relative path surprises.

---

## G. Pseudocode Outline for `scripts/init.sh`
```
print_ts()
  -> ISO8601 now

main()
  echo "[Layer 1] start $(print_ts)"
  set -euo pipefail; IFS=$'\n\t'

  repo_state = (test -d .git && echo existing || echo new)
  artifacts = [list of 8]
  for each artifact: mark present/missing

  create_missing_only()
    - write .editorconfig if missing (canonical content)
    - write .gitattributes if missing (canonical content)
    - write .gitignore if missing (baseline)
    - write LICENSE if missing (resolve holder/year; flag placeholders)
    - write README.md if missing (stub sections)
    - write VERSION if missing (0.0.1)
    - ensure scripts/ and scripts/README.md
    - create scripts/init.sh if missing (this file) [bootstrap case]
    - chmod +x scripts/init.sh

  if repo_state == new and no .git:
    git init; git add .
    if git identity configured: git commit -m "Scientia est lux principium✨"
    else: note "git_identity_missing"

  # Re-verify, then produce status JSON
  print human summary
  print machine JSON
```

---

## H. Completion Checklist
- [ ] 8 artifacts present
- [ ] `scripts/init.sh` is executable
- [ ] Second run produced no changes (idempotence PASS)
- [ ] Final JSON printed with `idempotent: true`
- [ ] Any placeholders or warnings captured in `notes[]`

---

## I. Rationale (Why this order)
- **Detection → Inventory → Create-only** reduces risk of accidental edits.
- **Light validation + reporting** surfaces drift without violating the “no overwrite” rule.
- **Proven idempotence** (not just asserted) keeps the foundation safe to rerun.
- **Machine-readable status** lets higher layers or tools respond programmatically without scraping logs.

---

## J. Commit Message & Remote (Reference)
- First commit message (when possible): `Scientia est lux principium✨`
- Remote creation (optional): e.g., `gh repo create <org>/<name> --public` then `git push -u origin main` (or your default branch). Adjust to environment policy.

---

End of Layer 1 (rewritten, you must enact now or read again and enact).
