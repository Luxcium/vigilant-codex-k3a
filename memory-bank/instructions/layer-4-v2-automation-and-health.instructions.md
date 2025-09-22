---
description: Layer 4 — Automation, Validation, and Triad Health. Resilient, add‑only automation around the triad (instructions, chat modes, prompts), with validators, VS Code tasks, self‑healing/status JSON, commit discipline, and memory/state hooks. Built to reinforce First Principles Reasoning (FPR) across all runs.
---

<!-- memory-bank/instructions/layer-4-automation-and-health.instructions.md -->

# Layer 4 — Automation, Validation, and Triad Health

## Intent
Wire a light but durable automation layer around Layers 1–3 so the system stays verifiable, reproducible, and agentic. Do **add‑only** merges, keep everything **idempotent**, and surface status as machine‑readable JSON. Scripts live in `scripts/` and remain modular and reusable.

## Operating Principles
- **Idempotent + additive.** Create missing; never overwrite; append only.
- **FPR alignment.** Every script/run must declare `Objective & Metric`, separate facts/assumptions, check units/scale, and emit a falsifiable prediction (see Self‑healing loop below).
- **Agentic memory.** Read `memory-bank/activeContext.md` before action; write a short outcome note after action. Update `memory-bank/progress.md` with provenance.
- **Modular shell.** Prefer small, composable POSIX‑leaning `bash` scripts in `scripts/`. Share helpers; avoid duplication. When a script grows >200 lines or mixes concerns, propose a split.
- **Relative links.** Prefer intra‑repo relative links; allow reputable external links in docs when they add clear value.
- **No destructive edits.** If a repair would overwrite content, stop and report.

---

## Preflight (must pass before other steps)
1) **Layer presence.** Verify Layers **1, 2, 3A, 3B, 3C** exist.
2) **Prompt discovery (merge‑append).** Ensure VS Code recognizes prompt cards in `memory-bank/prompts/` by appending these settings to `.vscode/settings.json` if absent:
   ```json
   {
     "chat.promptFiles": true,
     "chat.promptFilesLocations": { "memory-bank/prompts": true }
   }
   ```
3) **Commit message assistance (merge‑append).** Point Copilot’s commit message generator at our Conventional‑Commits guidance without removing existing entries:
   ```json
   {
     "github.copilot.chat.commitMessageGeneration.instructions": [
       { "file": "memory-bank/instructions/conventional-commits-must-be-used.instructions.md" }
     ]
   }
   ```
4) **Prettier guard (add‑only).** Ensure a root `.prettierignore` exists and includes:
   ```ignore
   *.prompt.md
   *.chatmode.md
   ```

---

## Artifacts to ensure

### A) Script governance (top‑level `scripts/`)
All scripts use the common header and are safe to re‑run:
```sh
#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'
```
Principles:
- **Reusable helpers.** Place shared utilities in `scripts/lib/` (e.g., `log.sh`, `json.sh`, `fs.sh`).
- **Logging.** Emit concise, single‑line JSON events to stdout when useful; human text to stderr.
- **Exec bits.** Set `chmod +x` on all scripts you create.
- **Static checks.** Favor `shellcheck`/`shfmt` in validation (warnings don’t block, errors do).

Required scripts (create if missing):
- `scripts/validate-instructions.sh` — Validates `memory-bank/instructions/*.instructions.md`:
  - Front‑matter has `description`.
  - If `applyTo` exists, treat as **immutable**.
  - Links: prefer relative for intra‑repo; allow authoritative externals.
- `scripts/validate-chatmodes.sh` — Validates `memory-bank/chatmodes/*.chatmode.md`:
  - Front‑matter has `description`. `tools`/`model` are **optional**; if present, do **not** change them.
  - Exactly one `#` H1. All internal links resolve and are relative.
- `scripts/validate-prompts.sh` — Validates `memory-bank/prompts/*.prompt.md`:
  - Path marker comment matches filename; exactly one blank line; exactly one H1; first H2 is **Slash Command**.
  - `description` present; includes a **Self‑Refinement Loop** section per Layer 3C.
- `scripts/list-slash-commands.sh` — Prints all `## Slash Command:` lines from `memory-bank/prompts/` for quick discovery.
- `scripts/triad-health.sh` — Runs all validators; verifies discovery settings; checks `.prettierignore`; prints a single‑line **status JSON** (see below).

**Safe auto‑repairs (non‑destructive):**
- Create missing directories/files using minimal, valid scaffolds.
- Append missing settings/ignore lines without touching unrelated keys/lines.
- Add executable bits on `scripts/*.sh`.
- Never alter existing `applyTo`, `tools`, or `model` values.

**Failure review & refactor rules:**
- If the same validator fails **≥3 consecutive runs** for the same file, record a `Refactor‑Consideration` note in `progress.md` and propose **split/merge** of the relevant script or card.
- When a script performs >1 responsibility (validate + repair + index), propose a split into focused helpers.

### B) VS Code tasks (merge‑append only)
Append tasks to `.vscode/tasks.json` if missing; leave unrelated tasks untouched. Use `version: "2.0.0"` and `type: "shell"`.
- `Validate 3A Instructions` → `./scripts/validate-instructions.sh`
- `Validate 3B Chatmodes`  → `./scripts/validate-chatmodes.sh`
- `Validate 3C Prompts`     → `./scripts/validate-prompts.sh`
- `Triad Health Check`      → `./scripts/triad-health.sh`
- `List Slash Commands`     → `./scripts/list-slash-commands.sh`

### C) Memory‑bank index (living map)
Ensure `memory-bank/index.md` exists and **appends**:
- Links to Layer 3A/3B/3C and this Layer 4.
- A counted inventory: `instructions: N`, `chatmodes: M`, `prompts: P` with bullet lists.

### D) Commit policy (advice + enforcement)
- Keep guidance files (create if missing):
  - `conventional-commits-must-be-used.instructions.md`
  - `commit-examples.instructions.md`
  - `breaking-changes-commits.instructions.md`
  - `gitmoji-complete-list.instructions.md`
- **Optional but recommended enforcement:** add commit linting via project tooling (config and CI hook). Do not run if a package manager is intentionally absent.

### E) Additional prompt cards (repository‑specific)
Create/ensure and validate with Layer 3C:
- `memory-bank/prompts/bootstrap-genesis.prompt.md`
- `memory-bank/prompts/prompt-files.prompt.md`

---

## Self‑healing loop (FPR‑backed)
Each validator and the health script must:
1) **Objective & Metric.** State the check(s) and pass criteria.
2) **Ask‑to‑ask (≤3 Qs).** If inputs are underspecified, ask; otherwise propose safe defaults.
3) **Critique vs. Goal/Schema.** List concrete gaps.
4) **Repair once (safe).** Apply non‑destructive fixes; never overwrite.
5) **Emit status JSON** (single line) and append a short `Reflections` note to `progress.md`.

**Status JSON example:**
```json
{
  "layer": "4",
  "checks": {"instructions":"ok","chatmodes":"ok","prompts":"ok"},
  "discovery": {"prompts": true},
  "fixes": ["prettierignore_appended"],
  "idempotent": true,
  "timestamp": "2025-09-21T00:00:00Z"
}
```

---

## Acquisition (copy from canonical sources when bootstrapping)
When aligning a new repo to this posture, copy canonical artifacts from the source context of this project:
- `memory-bank/instructions/copilot-memory-bank.instructions.md`
- `memory-bank/instructions/conventional-commits-must-be-used.instructions.md`
- `memory-bank/instructions/commit-examples.instructions.md`
- `memory-bank/instructions/breaking-changes-commits.instructions.md`
- `memory-bank/instructions/gitmoji-complete-list.instructions.md`

Rules:
- Preserve contents and front‑matter exactly; never modify existing `applyTo`.
- Set exec bits on scripts; then run validators + triad health.
- Record provenance and outcomes in `activeContext.md` and `progress.md`.

---

## Health check & exit criteria
- All scripts present and executable; validators pass; **Triad Health** prints `idempotent: true`.
- `.vscode/tasks.json` contains the listed tasks (append‑only).
- Prompt discovery is enabled for `memory-bank/prompts/`.
- `.prettierignore` contains `*.prompt.md` and `*.chatmode.md`.
- `memory-bank/index.md` updated with counts and links.
- Memory updated with brief notes in `activeContext.md` and `progress.md`.

