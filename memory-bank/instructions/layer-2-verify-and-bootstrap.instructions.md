--- 
description: Layer 2 — verify and extend a repository’s development environment without overwriting; add only missing VS Code, Copilot, and memory-bank triad elements; supports clean bootstrap after Layer 1.
---

<!-- memory-bank/instructions/layer-2-verify-and-bootstrap.instructions.md -->

# Layer 2 — Development Environment Verification and Bootstrap

Layer 2 extends a complete Layer 1 with workspace ergonomics: VS Code settings, Copilot guardrails, and a memory-bank triad for durable context. The goal is to **verify** what exists, **add what is missing**, and never overwrite. If Layer 1 is absent, complete it first.

## Operating Principles

Do not restate or duplicate Layer-1 artifacts. Keep actions idempotent. Prefer additive changes. Use conservative defaults that match the documented guardrails and allow immediate use.

---

## A. VS Code Workspace Configuration

Brief: Establish predictable editor behavior and connect the triad so the agent can locate instructions, prompts, and chat modes.

### Procedure
- Ensure `.vscode/` exists; create if missing.
- Ensure `.vscode/settings.json` exists; create if missing, then **merge-append** keys below if not present:
  - `"github.copilot.chat.codeGeneration.useInstructionFiles": true`
  - `"chat.instructionsFilesLocations": { "memory-bank/instructions": true }`
  - `"chat.promptFiles": true`
  - `"chat.promptFilesLocations": { "memory-bank/prompts": true }`
  - `"chat.modeFilesLocations": { "memory-bank/chatmodes": true }`
- Ensure baseline behaviors exist; add only if absent:
  - Format on save.
  - Organize imports on save.
  - Node.js baseline 22+ noted in workspace docs or settings comment.

---

## B. Copilot Setup and Guardrails

Brief: Constrain Copilot with explicit standards and valid chat mode metadata so agent runs stay consistent.

### Procedure
- Ensure `.github/` exists; create if missing.
- `.github/copilot-instructions.md`:
  - IF missing → create with project guardrails:
    - TypeScript focus, TSDoc usage.
    - Node.js 22+ baseline.
    - ESLint flat config with `eslint-config-prettier` integration.
    - Instruction to treat memory-bank as canonical context.
- Chat modes (`memory-bank/chatmodes/…*.chatmode.md`):
  - IF introducing chat modes, enforce:
    - `model: GPT-5 (Preview)` or `model: GPT-5 mini (Preview)` only.
    - `tools: ['codebase', 'usages', 'fetch', 'editFiles', 'runCommands', 'todos']` exactly.
  - Never change an existing `model` or `tools` clause without explicit user approval.

---

## C. Memory-Bank Triad and Core Files

Brief: Create the triad folders and six persistent context files to anchor project memory and flow.

### Procedure
- Ensure triad directories exist; create any missing:
  - `memory-bank/instructions/`
  - `memory-bank/prompts/`
  - `memory-bank/chatmodes/`
- Add `README.md` to each triad directory IF missing, stating purpose and how agents should use it.
- Maintain six core memory files under `memory-bank/`; create any that are missing with minimal scaffolds:
  - `activeContext.md` — current focus and immediate tasks; update each session first.
  - `projectbrief.md` — purpose, problem framing, high-level goals, UX intent.
  - `productContext.md` — user needs, business goals, current focus, decisions.
  - `systemPatterns.md` — architecture, conventions, critical paths.
  - `techContext.md` — stack, constraints, setup, dependencies, tool usage.
  - `progress.md` — done vs remaining, milestones, status, known issues.
- If present, read and honor `memory-bank/instructions/copilot-memory-bank.instructions.md` before writing to memory files.

---

## D. ESLint + Prettier Posture (Workspace Level)

Brief: Make the baseline expectations explicit without altering repo code.

### Procedure
- Document in `copilot-instructions.md` or a workspace note:
  - ESLint flat config is expected.
  - All fixable ESLint rules set to **warnings**.
  - Prettier integrated via `eslint-config-prettier` (no `eslint-plugin-prettier`).
- Do not write config files unless explicitly requested; this layer only signals expectations.

---

## E. Health Check and Exit Criteria

Brief: Confirm Layer-2 readiness and idempotence.

### Procedure
- `.vscode/settings.json` contains triad keys above.
- `.github/copilot-instructions.md` exists with guardrails.
- Triad directories exist with READMEs.
- Six memory files exist; `activeContext.md` is present and writable.
- Re-run this procedure; no changes on second pass (idempotent).
