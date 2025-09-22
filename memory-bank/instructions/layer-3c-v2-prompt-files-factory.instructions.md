---
description: Layer 3C — Prompt Files Factory. Rules for *.prompt.md cards. Prompts orchestrate modes and instructions, declare variables, fix output shape, and embed a bounded self‑refinement loop. Store cards under memory-bank/prompts/. Add‑only merges, idempotence checks, and machine‑readable status.
---

<!-- memory-bank/instructions/layer-3c-prompt-files-factory.instructions.md -->

# Layer 3C — Prompt Files Factory

**Purpose.** Prompt files are on‑demand procedures. A card (1) selects or defers a chat **mode** (Layer 3B), (2) reuses **instruction files** (Layer 3A), (3) declares **inputs/variables**, and (4) pins a **deterministic output shape**. Each card also embeds a **self‑refinement loop** so agents steadily improve results without bloating the card body.

**Storage.** Place prompt cards in `memory-bank/prompts/`. This factory document remains in `memory-bank/instructions/`.

---

## Operating Principles (Hard Rules)
- **Add‑only; never overwrite.** Do not edit existing lines in any `*.prompt.md` without explicit human approval.
- **Idempotent.** A clean second run produces **no changes**.
- **Thin and link‑first.** Keep cards focused; push durable policy into `*.instructions.md` and reusable content into other cards.
- **Deterministic outputs.** Same inputs → same schema/sections.
- **Agentic growth.** Every card includes a compact, bounded Self‑Refinement Loop that asks for missing info, critiques the draft against the Goal/output schema, and revises **once**.

---

## Preflight (Discovery & Preconditions)
- **Require Layers 1 & 2 complete** and **Layer 3A (instructions) & 3B (modes)** present.
- **Enable prompt discovery** (add‑only merge to `.vscode/settings.json`):
  ```json
  {
    "chat.promptFiles": true,
    "chat.promptFilesLocations": { "memory-bank/prompts": true }
  }
  ```
  Do not remove other locations (e.g., `.github/prompts`).

---

## Prompt Authoring Procedure (Strict)
**Path.** `memory-bank/prompts/<stem>.prompt.md`

**Front‑matter (YAML):**
- `description: <short>` — **required**, non‑empty.
- `mode:` — **optional**. Accepts `ask | edit | agent` **or** a **custom mode name** defined under `memory-bank/chatmodes/`. If omitted, uses the current picker.
- `model:` — **optional**. If present, **immutable** (never add/change without explicit approval).
- `tools:` — **optional**. If present, **immutable** and must not contradict the chosen mode.
- No other keys.

**Path marker (required, exactly one blank line after front‑matter):**
```
<!-- memory-bank/prompts/<filename>.prompt.md -->
```

**Body order (target 300–600 words):**
1) `# <Title>` — one short paragraph stating the operational state and scope.
2) `## Slash Command: /<stem> — <one‑line purpose>` — clarifies the run state.
3) `### Context & Activation` — Scope; State (capabilities & constraints); Inputs (with `${input:*}` defaults & validation); Safety (out‑of‑scope actions).
4) `### Goal` — desired end‑state & measurable success criteria (no process talk).
5) `### Output format` — exact shape (strict Markdown sections or JSON schema).
6) `### Inputs` — `${selection}`, `${file}`, `${workspaceFolder}`, `${fileBasename}`, `${fileDirname}`, `${input:name}`.
7) `### Steps / Rules` — procedural bullets; encode **create / repair / no‑op** logic; link to `../instructions/*.instructions.md` as needed.
8) `### Self‑Refinement Loop (/ask‑to‑ask)` — **required** (see below).
9) `### Examples` — at least one **Input → Expected Output** pair.
10) `### Edge cases / Stop criteria` — pitfalls, halting conditions, and “do nothing if already compliant.”

**Linking.** Use **relative** links to instruction files and (optionally) a mode file; avoid duplication.

---

## Self‑Refinement Loop (required in every card)
A compact, bounded meta‑prompt that forces the agent to improve itself while preserving the declared output schema:

```
### Self‑Refinement Loop (/ask‑to‑ask)
- Clarify: ask up to N (≤3) focused questions if inputs are underspecified; propose defaults if unanswered.
- Critique: compare the draft to the Goal and Output format; list concrete gaps.
- Revise: update once using the critique; keep the same schema/sections.
- Record: append a short "Reflections" note (what improved, remaining risk).
```

Keep this loop brief; never change the declared output schema during revision.

---

## Merge‑Append Contract (Markdown, Add‑Only)
- Never change existing lines; only **append**.
- When adding bullets, append under the correct section; **dedupe** by normalized line text (trim, collapse spaces).
- Replace overlapping prose with a **relative link** to the canonical file.
- Validate that all relative links **resolve** before writing.

---

## Review Gate (Pass/Fail)
- Front‑matter present; `description` non‑empty; no extra keys.
- If `mode` names a custom mode, the file exists under `memory-bank/chatmodes/`; otherwise **fail**.
- Agent did **not** add/change `model` or `tools` on existing cards.
- Output format explicit and deterministic.
- Self‑Refinement Loop present.
- All links resolve (relative for internal, reputable when external).

---

## Verify & Bootstrap
1) **Ensure directory** `memory-bank/prompts/` exists; create if missing.
2) **Inventory & validate** all `*.prompt.md` against the schema and body order.
3) **Create missing dependencies (add‑only):** any referenced `*.instructions.md` (Layer 3A) or chat modes (Layer 3B) as minimal stubs if absent.
4) **Prettier guard:** if `.prettierignore` is missing, create it; else **append** patterns if absent (idempotent):
   ```ignore
   # Keep prompt/chatmode cards out of Prettier to preserve strict spacing/heading contracts
   *.prompt.md
   *.chatmode.md
   ```

---

## Health Check, Idempotence & Status
**Idempotence test.** Re‑run Layer 3C immediately. If in git, run `git diff --quiet --exit‑code`; else compare file hashes/mtimes. Differences → **FAIL** and list paths.

**Status JSON (single line).** Print a summary like:
```json
{
  "layer": "3C",
  "artifacts": {
    "dir": "present|created",
    "cards": ["<stem>.prompt.md:present|created|invalid"],
    "prettierignore": "present|created|appended"
  },
  "discovery": { "memory-bank/prompts": true },
  "idempotent": true,
  "notes": ["prompt_locations_merged", "missing_dependencies_stubbed:layer-3a,layer-3b"]
}
```
Include only notes that occurred.

---

## Minimal Adaptive Template (copy when creating a new card)
```prompt
---
description: One‑sentence purpose of this card (why/when to use)
# Optional keys below — add only with explicit human approval
# mode: agent | ask | edit | <customModeName>
# model: <modelName>
# tools: ["codebase", "githubRepo"]
---

<!-- memory-bank/prompts/<filename>.prompt.md -->

# <Title Case Stem>
One short paragraph setting the stage and framing the task.

## Slash Command: /<stem> — <one‑line purpose>
One short paragraph naming the operational state this command casts or lifts for this run.

### Context & Activation
- **Scope:** <files/entities in scope>
- **State:** <enabled capabilities and restrictions>
- **Inputs:** `${input:...}` defaults and validation
- **Safety:** <out‑of‑scope actions>

### Goal
<Desired end‑state and success criteria>

### Output format
<Exact output shape (JSON/checklist/table/markdown)>

### Inputs
- `${selection}` (optional)
- `${file}` (optional)
- `${workspaceFolder}` (optional)
- `${fileBasename}`, `${fileDirname}` (optional)
- `${input:arg}` (runtime named inputs)

### Steps / Rules
- If missing → generate.
- If partial/broken → repair.
- If complete → no‑op.
- Link standards: [Team rules]\(../instructions/<file>.instructions.md)

### Self‑Refinement Loop (/ask‑to‑ask)
- Clarify (≤3 Qs) → Critique → Revise once → Record (short Reflections note)

### Examples
**Input:** …  
**Expected Output:** …

### Edge cases / Stop criteria
- <pitfalls and halting conditions>
- Do nothing if already compliant
```

---

## Orchestrator Pseudocode (reference)
```
preflight()
  assert L1, L2 complete and L3A, L3B present
  ensure settings include memory-bank/prompts (add-only)

inventory_and_validate()
  scan memory-bank/prompts/*.prompt.md
  check header keys, body order, link resolution, output schema, self-refinement presence

bootstrap()
  stub missing instructions/modes (add-only)
  ensure .prettierignore contains patterns (append add-only)

health_and_status()
  run again for idempotence
  print single-line JSON status
```

---

## Completion Checklist
- [ ] `.vscode/settings.json` includes `chat.promptFiles` and maps `memory-bank/prompts`.
- [ ] All prompt cards pass the Review Gate.
- [ ] Self‑Refinement Loop exists in every card.
- [ ] Idempotence test passed (no changes on second run).
- [ ] Status JSON printed with `idempotent: true`.

