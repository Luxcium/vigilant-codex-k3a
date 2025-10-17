---
description: Layer 1 — verify an existing repository against the Genesis foundation and bootstrap missing pieces without overwriting; also supports clean bootstrap from scratch.
---

<!-- memory-bank/instructions/layer-1-verify-and-bootstrap.instructions.md -->

# Layer 1 — Foundation Verification and Bootstrap

Layer 1 ensures a universal, language-agnostic baseline. The aim is a small, canonical set of files and an idempotent initializer so higher layers can build safely. This document tells an AI agent how to **verify** an existing repo and **add only what is missing**. It also defines how to create everything from scratch if no files exist.

## Operating Principles

Layer 1 is about reproducibility and restraint. Verify first, then add only what is absent. Do not modify existing files unless explicitly directed elsewhere. Keep operations idempotent and safe to rerun.

---

## Process Summary

This verification and bootstrap process follows 5 sequential stages:

### Stage A: Repository State Check
- **Purpose:** Determine if working with existing or new repository
- **Actions:** Detect `.git/` directory, inventory 8 foundation files
- **Decision:** Route to "augment existing" or "full bootstrap" mode
- **Artifacts Checked:** `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `README.md`, `VERSION`, `scripts/README.md`, `scripts/init.sh`

### Stage B: Core Files Verification/Creation
- **Purpose:** Ensure all 6 root-level foundation files exist
- **Actions:** Create only missing files, never overwrite existing
- **Files Managed:**
  - **B1:** `.editorconfig` — Editor consistency (UTF-8, LF, indentation)
  - **B2:** `.gitattributes` — Line ending normalization, binary handling
  - **B3:** `.gitignore` — Exclude generated/system files (preserve `.vscode/`)
  - **B4:** `LICENSE` — Legal baseline (MIT default)
  - **B5:** `README.md` — Project documentation entry point
  - **B6:** `VERSION` — Semantic version seed (0.0.1)

### Stage C: Scripts Directory Setup
- **Purpose:** Establish automation foundation
- **Actions:** Create `scripts/` directory and core initialization script
- **Files Managed:**
  - `scripts/README.md` — Script usage guidelines
  - `scripts/init.sh` — Idempotent initializer with validation, permissions, datetime logging

### Stage D: Git Initialization
- **Purpose:** Initialize version control if not present
- **Actions:** Create git repository, stage files, make first commit
- **Condition:** Only executes if `.git/` absent
- **Commit Message:** "Scientia est lux principium✨"

### Stage E: Verification and Exit
- **Purpose:** Confirm successful Layer 1 completion
- **Actions:** Validate all 8 artifacts present and functional
- **Tests:** File presence, script executability, idempotence verification

---

## A. Repository State Check

Brief: Determine if you are in a repo already and whether the foundation files are present. Decide between "augment existing" vs "bootstrap new".

### Procedure
- Detect git repo:
  - IF `.git/` exists → mark `repo_state=existing`.
  - ELSE → mark `repo_state=new`.
- Inventory foundation files at project root:
  - `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `README.md`, `VERSION`
  - `scripts/README.md`, `scripts/init.sh`
- Classify each as `present` or `missing`.
- Continue with "create missing only" for existing repos, or "full bootstrap" for new repos.

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
- IF missing → create with a broad, language-agnostic set; keep `!.vscode/` meaning it MUST NOT BE ignored, it must be inside the repo files.
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
    - Initializes git only if `.git/` is absent.
    - Prints project info and status.
    - It must print date time of execution.
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
