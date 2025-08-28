---
description: Layer 1 — verify an existing repository against the Genesis foundation and bootstrap missing pieces without overwriting; also supports clean bootstrap from scratch.
---

<!-- memory-bank/instructions/layer-1-verify-and-bootstrap.instructions.md -->

# Layer 1 — Foundation Verification and Bootstrap

Layer 1 ensures a universal, language-agnostic baseline. The aim is a small, canonical set of files and an idempotent initializer so higher layers can build safely. This document tells an AI agent how to **verify** an existing repo and **add only what is missing**. It also defines how to create everything from scratch if no files exist.

## Operating Principles

Layer 1 is about reproducibility and restraint. Verify first, then add only what is absent. Do not modify existing files unless explicitly directed elsewhere. Keep operations idempotent and safe to rerun.

---

## A. Repository State Check

Brief: Determine if you are in a repo already and whether the foundation files are present. Decide between “augment existing” vs “bootstrap new”.

### Procedure
- Detect git repo:
  - IF `.git/` exists → mark `repo_state=existing`.
  - ELSE → mark `repo_state=new`.
- Inventory foundation files at project root:
  - `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `README.md`, `VERSION`
  - `scripts/README.md`, `scripts/init.sh`
- Classify each as `present` or `missing`.
- Continue with “create missing only” for existing repos, or “full bootstrap” for new repos.

---

## B. Core Files: Verify or Create

Brief: Each file is canonical in purpose. You verify presence. You only create what is missing. You never overwrite.

### B1. `.editorconfig`
Context: Standardize line endings, charset, and indentation to prevent tool drift.
- IF missing → create with UTF-8, LF, final newline, trim trailing spaces, 2-space default; include reasonable language overrides.
- ELSE → do nothing.

### B2. `.gitattributes`
Context: Normalize line endings and mark binaries for safe diffs.
- IF missing → create with `* text=auto`, LF rules for Unix-style sources, CRLF for batch, binary patterns.
- ELSE → do nothing.

### B3. `.gitignore`
Context: Exclude OS junk, editor files, logs, env, builds, caches.
- IF missing → create with a broad, language-agnostic set; keep `!.vscode/`.
- ELSE → do nothing.

### B4. `LICENSE`
Context: Legal baseline. MIT by default unless instructed otherwise.
- IF missing → create MIT license with correct copyright holder and year.
- ELSE → do nothing.

### B5. `README.md`
Context: Human entry point. Must outline purpose, features, quick start, docs, support.
- IF missing → create with sections: Overview, Features, Quick Start, Documentation links, Contributing, License, Support, Acknowledgments.
- ELSE → do nothing.

### B6. `VERSION`
Context: Single-line semantic version seed.
- IF missing → create with `0.0.1`.
- ELSE → do nothing.

---

## C. Scripts Directory and Idempotent Initializer

Brief: Scripts are language-agnostic and safe to run repeatedly.

### Procedure
- Ensure `scripts/` directory exists; create if missing.
- `scripts/README.md`:
  - IF missing → create explaining idempotence, usage, guidelines.
- `scripts/init.sh`:
  - IF missing → create with idempotent checks:
    - Validates foundation files.
    - Sets `chmod +x` on `scripts/*.sh`.
    - Creates common dirs if absent: `docs/`, `tmp/`, `.vscode/`.
    - Initializes git only if `.git/` is absent.
    - Prints project info and status.
- Never overwrite existing `scripts/init.sh`.

---

## D. Git Initialization and First Commit

Brief: Initialize only if no repo exists.

### Procedure
- IF `.git/` is absent:
  - Run `git init`.
  - Stage all: `git add .`.
  - Commit: `git commit -m "Scientia est lux principium✨"`.
  - (Optional) Create remote: `gh repo create …` and push.
- ELSE → do nothing.

---

## E. Verification and Exit Criteria

Brief: Confirm a correct Layer 1 state.

### Procedure
- Confirm presence of all 8 foundation artifacts:
  - `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `README.md`, `VERSION`, `scripts/README.md`, `scripts/init.sh`
- Ensure `scripts/init.sh` is executable.
- Re-run `scripts/init.sh`; confirm idempotence (no changes on second run).
