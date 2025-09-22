---
description: Layer 2 — verify and extend a repository’s development environment without overwriting; add only missing VS Code, Copilot, and memory‑bank triad elements; supports clean bootstrap after Layer 1. This rewrite clarifies add‑only merge rules, idempotence testing, schema checks, and machine‑readable status.
---

<!-- memory-bank/instructions/layer-2-verify-and-bootstrap.instructions.md (rewritten) -->

# Layer 2 — Development Environment Verification and Bootstrap

Layer 2 extends a complete Layer 1 with workspace ergonomics: **VS Code** settings, **Copilot** guardrails, and a **memory‑bank triad** for durable context. The agent must **verify** what exists, **add what is missing**, and **never overwrite**. If Layer 1 is absent, complete it first.

## Operating Principles (Hard Rules)
1. **Add‑only, never overwrite.** Existing files/values remain untouched. We only create files that are missing and only insert keys that do not already exist.
2. **Idempotent by design.** A second run after a successful pass yields no changes.
3. **Non‑destructive validation.** If existing content conflicts with the standard, do not edit it—flag it in the final report.
4. **Deterministic outputs.** Same inputs → same file set, same status JSON.
5. **Keep Layer 1 intact.** Do not restate or mutate Layer‑1 artifacts.
6. **Conservative defaults.** Reasonable settings that work immediately. Adjustments belong to higher layers.

---

## Preflight
- **Require Layer 1 to be complete.** If any L1 exit criteria are missing, stop (or run Layer 1) before proceeding.

---

## Scope: Layer‑2 Artifacts
- `.vscode/`
- `.vscode/settings.json` (JSON **with comments**; merged add‑only)
- (Optional) `.vscode/extensions.json` (recommendations only)
- `.github/copilot-instructions.md`
- `memory-bank/instructions/`, `memory-bank/prompts/`, `memory-bank/chatmodes/` (triad dirs)
- Triad READMEs under each dir
- Six core memory files under `memory-bank/`:
  - `activeContext.md`, `projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`
- (Optional, add‑only) new chatmode files under `memory-bank/chatmodes/`

---

## Inputs & Environment (Optional)
- `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL` — may affect commit behavior if Layer 1 ran in this session.
- `GH_REMOTE` — optional remote target (not required for L2).
- **Extensions**: VS Code + GitHub Copilot Chat recommended. Keys that rely on extensions are added safely even if the extension isn’t installed.

---

## Decision Flow (High Level)
1. Confirm Layer‑1 readiness → proceed or stop.
2. Ensure `.vscode/` and **merge‑append** `settings.json` keys (no value changes).
3. Ensure `.github/copilot-instructions.md` with guardrails (create only if missing).
4. Ensure triad dirs, triad READMEs, and the six core memory files (create only if missing).
5. (Optional) Introduce new chatmodes using a strict schema; never change existing chatmodes.
6. Document ESLint + Prettier posture (write only if `copilot-instructions.md` was created by this layer).
7. Run Health Check + Idempotence, then emit status JSON.

---

## A. VS Code Workspace Configuration
**Goal:** Predictable editor behavior and triad connectivity.

### A1. `.vscode/` directory
- Ensure it exists; create if missing.

### A2. `.vscode/settings.json` (JSONC add‑only merge)
- If missing → create a minimal JSONC file `{}`.
- Load as **JSON with comments** (JSONC). If parse error → do **not** write; add `jsonc_parse_error` to notes.
- **Add these keys only if absent** (never change existing values):
  - `"editor.formatOnSave": true`
  - `"editor.codeActionsOnSave": { "source.organizeImports": "explicit" }`
  - `"github.copilot.chat.codeGeneration.useInstructionFiles": true`
  - `"chat.instructionsFilesLocations": { "memory-bank/instructions": true }`
  - `"chat.promptFiles": true`
  - `"chat.promptFilesLocations": { "memory-bank/prompts": true }`
  - `"chat.modeFilesLocations": { "memory-bank/chatmodes": true }`
  - (Optional) `"files.eol": "\n"` to align with Layer 1; add only if absent.
- **Array/Map merging rule:** for object keys, insert if missing; for arrays, append unique values only. Preserve existing order/comments.
- On successful insertion of ≥1 new key → write file; else leave untouched.

### A3. `.vscode/extensions.json` (optional)
- If missing, create with non‑binding recommendations (no effect on existing files):
  ```json
  {
    "recommendations": [
      "github.copilot-chat",
      "dbaeumer.vscode-eslint",
      "esbenv.prettier-vscode"
    ]
  }
  ```
- If present → do not modify. If parse error → `json_parse_error:extensions` note.

### A4. Node.js baseline (informational)
- Document **Node 22+** in `copilot-instructions.md` (Section B) or as a comment in `settings.json` if and only if `settings.json` was created by this layer.

---

## B. Copilot Setup and Guardrails
**Goal:** Constrain Copilot behavior and connect it to the project’s durable context.

### B1. `.github/` directory
- Ensure it exists; create if missing.

### B2. `.github/copilot-instructions.md`
- If missing → create with these guardrails (bullets/stubs acceptable):
  - **Language & docs:** TypeScript focus; use **TSDoc** for public APIs.
  - **Runtime:** Node.js **22+** baseline (informational; not enforced by L2).
  - **Lint/format posture:** ESLint **flat config** expected; all fixable rules default to **warnings**; Prettier integrated via `eslint-config-prettier` (no `eslint-plugin-prettier`).
  - **Context source:** Treat **memory‑bank triad** as canonical context; prefer those files for instructions/prompts/modes.
  - **VS Code behaviors:** format‑on‑save and organize‑imports‑on‑save are enabled at workspace scope.
- If present → do not modify. If it conflicts with the above → add a `copilot_instructions_conflict` note (no edits).

### B3. Chat modes (add‑only)
- Only introduce **new** chatmode files under `memory-bank/chatmodes/` if none exist or a new mode is explicitly requested by a higher layer.
- **Schema (front‑matter or header) required for new files:**
  - `name: <string>`
  - `model: GPT-5 (Preview) | GPT-5 mini (Preview)`
  - `tools: ['codebase','usages','fetch','editFiles','runCommands','todos']` **exactly**
- **Never modify** `model` or `tools` of existing chatmode files. If a conflict is detected → add `chatmode_conflict` to notes.

---

## C. Memory‑Bank Triad and Core Files
**Goal:** Create the triad + six durable context files without clobbering existing project memory.

### C1. Directories
- Ensure these exist; create any missing:
  - `memory-bank/instructions/`
  - `memory-bank/prompts/`
  - `memory-bank/chatmodes/`

### C2. Directory READMEs (create if missing)
- Minimal content: purpose, how agents use this folder, and update expectations.

### C3. Honor higher‑order instructions
- If `memory-bank/instructions/copilot-memory-bank.instructions.md` exists, **read and honor** it. Do not overwrite any referenced files.

### C4. Six core memory files (create if missing)
- `activeContext.md` — seed:
  ```md
  # Active Context
  _Update first each session. Keep tight._

  | Now | Next | Blockers |
  | --- | ---- | -------- |
  |     |      |          |

  _Last updated: <ISO8601>_
  ```
- `projectbrief.md` — purpose, problem framing, high‑level goals, UX intent (headers only acceptable).
- `productContext.md` — user needs, business goals, current focus, decisions.
- `systemPatterns.md` — architecture notes, conventions, critical paths.
- `techContext.md` — stack, constraints, setup, dependencies, tool usage.
- `progress.md` — done vs remaining, milestones, status, known issues.

### C5. Writable check for `activeContext.md`
- Attempt to open for append and write a reversible marker; if not writable, report `activeContext_not_writable` in notes and revert the marker.

---

## D. ESLint + Prettier Posture (Workspace Level)
**Goal:** Make expectations visible without altering repo code.

- If **and only if** `copilot-instructions.md` was created by this layer, include the following posture text:
  - ESLint **flat config** expected.
  - All fixable ESLint rules → **warnings** by default.
  - Prettier via **`eslint-config-prettier`**; do **not** use `eslint-plugin-prettier`.
- Do **not** create or modify any config files in L2.

---

## E. Health Check and Exit Criteria
**Pass only if all are true:**
1. `.vscode/settings.json` exists and includes the triad keys listed in A2 (keys may already have been present; that’s fine).
2. `.github/copilot-instructions.md` exists.
3. Triad directories exist and contain READMEs.
4. Six memory files exist; `activeContext.md` is writable.
5. **Idempotence proven** (Section F).

---

## F. Idempotence Test & Status Output

### F1. Idempotence test
- If inside a git repo: after running L2, immediately run it again and then `git diff --quiet --exit-code`.
  - Exit `0` → PASS; else FAIL and list changed paths.
- If not a git repo: snapshot file mtimes/hashes pre/post second run; differences → FAIL.

### F2. Status JSON (single line)
Output a **single‑line JSON** summary:
```json
{
  "layer": 2,
  "artifacts": {
    ".vscode/": "present|created",
    ".vscode/settings.json": "present|created|updated(add-only)|jsonc-parse-error",
    ".vscode/extensions.json": "present|created|skipped",
    ".github/copilot-instructions.md": "present|created",
    "memory-bank/dirs": "ok|created",
    "memory-bank/readmes": "present|created",
    "memory-bank/files": {
      "activeContext.md": "present|created|not-writable",
      "projectbrief.md": "present|created",
      "productContext.md": "present|created",
      "systemPatterns.md": "present|created",
      "techContext.md": "present|created",
      "progress.md": "present|created"
    },
    "chatmodes": "present|created|skipped|conflict"
  },
  "idempotent": true,
  "notes": ["jsonc_parse_error", "extension_missing:copilot", "chatmode_conflict", "activeContext_not_writable", "node_version_unenforced"]
}
```
Include only the notes that occurred.

---

## G. JSONC Merge Contract (for `.vscode/settings.json`)
- Treat file as **JSON with comments**.
- **Parse:** if parse fails → do not write; add `jsonc_parse_error`.
- **Insert‑only:** for each required key, if it does not exist at the path, insert the specified value. Never change existing values.
- **Objects:** shallow insert (no deep rewrites). If parent object missing, create it.
- **Arrays:** append only **unique** values; keep order stable.
- **Comments & formatting:** preserve existing comments and indentation when possible; otherwise minimally reformat while retaining content.

---

## H. Orchestrator Pseudocode (reference)
```
preflight()
  assert layer1_ready or stop

vscode()
  ensure .vscode/
  settings = load_jsonc(.vscode/settings.json)
  if parse_error: note 'jsonc_parse_error' and skip writes
  else add_only_keys(settings, REQUIRED_KEYS)
  maybe create extensions.json with recommendations

copilot()
  ensure .github/
  if missing copilot-instructions.md: create with guardrails
  else note conflicts without edits
  manage chatmodes: add-only with schema; never modify existing

memory_bank()
  ensure triad dirs + READMEs
  create missing of six core files
  writable_check(activeContext.md)

posture_note()
  if we created copilot-instructions.md: append ESLint/Prettier posture text

health_and_status()
  re-run idempotence test
  print human summary + single-line JSON status
```

---

## I. Edge Cases & Safety
- **JSONC errors:** never write partial files; report.
- **Permissions:** if write fails, mark the exact artifact as `not-writable`.
- **Extension absence:** settings keys may be inert; still safe to add.
- **Existing divergent chatmodes:** never edit; report `chatmode_conflict`.
- **Concurrent edits to `activeContext.md`:** add‑only creation; avoid timestamp churn; writable check must be reversible.
- **Dry‑run:** support a flag to compute status without writing.

---

## J. Completion Checklist
- [ ] `.vscode/settings.json` has triad keys (or was already configured).
- [ ] `.github/copilot-instructions.md` present.
- [ ] Triad dirs + READMEs present.
- [ ] Six memory files present; `activeContext.md` writable.
- [ ] Idempotence test passed.
- [ ] Status JSON printed with `idempotent: true`.

---

End of Layer 2 (rewritten, you must enact now or read again and enact).
