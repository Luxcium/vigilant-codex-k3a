---
description: Layer 3a — Custom Instructions Factory. Canonical authoring rules for *.instructions.md. Single source of truth, add‑only merges, idempotent behavior, and machine‑readable status.
---

<!-- memory-bank/instructions/layer-3a-custom-instructions-factory.instructions.md (rewritten) -->

# Layer 3a — Custom Instructions Factory

**Purpose.** Define durable guardrails for all AI runs. Author, validate, and evolve `*.instructions.md` files stored in `memory-bank/instructions/`. Keep rules **atomic**, link rather than duplicate, and ensure VS Code/Copilot can **discover** them.

**Scope.** Creation, verification, and evolution of `*.instructions.md`. Front‑matter `description` is **mandatory**. `applyTo` is **optional** and **immutable once present** (only a higher‑layer, explicit approval can change it). Never add `applyTo` unless your human user has asked for a specific glob.

> Layer 2 configured the workspace to look for instruction files. Layer 3a specifies how to author and govern them. It also adds two anchor instruction files (L1/L2) if they’re missing, and commits all pending changes per the commit rules below.

---

## Operating Principles (Hard Rules)
- **Add‑only, never overwrite.** Existing files/values stay untouched. Only create what’s missing and insert keys/lines that don’t exist.
- **Idempotent by design.** A second run after a successful pass produces **no changes**.
- **Prefer links over prose duplication.** Relative links for intra‑repo; external links only when authoritative and directly useful.
- **Short, atomic rules.** One idea per bullet, testable statements, 200–400 words per file. Split large topics.
- **Deterministic outputs.** Same inputs → same file set and same status JSON.

---

## Preflight (Discovery & Preconditions)
- **Require Layer 1 & 2 complete.** If their exit criteria aren’t met, stop (or run those layers first).
- **VS Code discovery check.** Confirm the workspace searches `memory-bank/instructions/` for instruction files. If not, add‑only merge this mapping in `.vscode/settings.json`:
  ```json
  {
    "chat.instructionsFilesLocations": { "memory-bank/instructions": true }
  }
  ```
  Do not remove other existing locations (e.g., `.github/instructions`).

---

## Authoring Procedure (Strict)
**Path.** `memory-bank/instructions/<topic>.instructions.md`

**Front‑matter (YAML):**
- `description: <concrete what/why>` — **required**, non‑empty.
- `applyTo:` — **omit** unless the human user provides it. If present, it is **immutable**. Only a higher‑layer, explicit approval may alter it.
- No other keys.

**Path marker comment (required):**
```
<!-- memory-bank/instructions/<filename>.instructions.md -->
```

**Body structure (normalized):**
1) Exactly one `#` H1 title.  
2) One short paragraph (intent/when to use).  
3) `## /rules` as the first (and usually only) H2, with **bulleted** atomic rules.  
4) Optional compact sections (e.g., `## /links`, `## /references`) if needed; keep them short.

**Writing style:** "If X → Do Y"; avoid narratives; prefer relative links to sibling rules: e.g., `[Layer 3B](./layer-3b-chatmodes-factory.instructions.md)`, `[Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.

---

## Merge‑Append Contract (Markdown, Add‑Only)
- **Never change existing lines.**
- When adding rules, append under `## /rules`.
- **Deduplicate** by normalized line text (trim, collapse spaces, case‑sensitive).
- Replace overlapping prose with a **relative link** to the canonical file rather than copying text.
- Verify that all relative links **resolve** before writing. Broken links fail the Review Gate.

---

## Verify & Bootstrap
1) **Inventory** `memory-bank/instructions/*.instructions.md`; validate each against the schema and size target.  
2) **Create missing** instruction files only under `memory-bank/instructions/`:
   - `layer-1-foundation.instructions.md` — anchors Layer 1.
   - `layer-2-workspace.instructions.md` — anchors Layer 2.
   Each should be minimal (title + one paragraph + `## /rules` linking to the source layer docs).
3) **Do not change** existing `applyTo` values. If a file lacks `description`, fail the gate and emit a corrective message.
4) Log a one‑liner in `memory-bank/progress.md` summarizing creations/links.

---

## Review Gate (Pass/Fail)
- `description` present and concrete.
- No new or modified `applyTo` without explicit approval.
- Links resolve; prefer **relative** links internally.
- No duplication (dedup rules applied). Within 200–400 words.

---

## Commit Rules (Create‑Only)
- Stage all created files and any explicit add‑only merges performed in this layer.  
- If Git identity is configured → commit with:
  - `chore(layer-3a): bootstrap instructions factory + anchors`
- If identity missing → print a clear warning and **skip** commit (no partial commits).

---

## Health Check & Exit Criteria
- The two anchor instruction files exist (or were already present) and validate.
- All inspected instruction files pass the Review Gate.
- Workspace discovery includes `memory-bank/instructions/`.
- A second run produces no changes (**idempotence proven**).
- Final **single‑line JSON** status printed (below).

---

## Status JSON (single line)
```json
{
  "layer": 3,
  "artifacts": {
    "anchors": [
      "layer-1-foundation.instructions.md:present|created",
      "layer-2-workspace.instructions.md:present|created"
    ],
    "validated": <number>
  },
  "lints": [
    "missing_description:<count>",
    "broken_links:<count>",
    "dup_rules:<count>",
    "applyTo_violation:<count>"
  ],
  "discovery": {
    "memory-bank/instructions": true
  },
  "idempotent": true,
  "notes": [
    "commit_skipped_no_identity",
    "settings_merged_add_only"
  ]
}
```

---

## Minimal Templates (Use When Creating Missing Files)

### Template — Layer 1 Anchor
```markdown
---
description: Canonical entry point to the repository foundation rules (Layer 1) for verification and bootstrap.
---

<!-- memory-bank/instructions/layer-1-foundation.instructions.md -->

# Repository Foundation — Layer 1

Use this file to route developers and agents to the Layer‑1 baseline. It verifies core artifacts and adds only what is missing.

## /rules
- Read: [Layer 1 — Foundation Verification & Bootstrap](./layer-1-verify-and-bootstrap.instructions.md)
- Follow add‑only, idempotent behavior.
- Do not overwrite existing files.
```

### Template — Layer 2 Anchor
```markdown
---
description: Workspace ergonomics and guardrails (Layer 2): VS Code settings, Copilot instructions, memory‑bank triad.
---

<!-- memory-bank/instructions/layer-2-workspace.instructions.md -->

# Development Environment — Layer 2

Use this file to route to Layer‑2 workspace setup: VS Code discovery, Copilot guardrails, and the memory‑bank triad.

## /rules
- Read: [Layer 2 — Development Environment Verification & Bootstrap](./layer-2-verify-and-bootstrap.instructions.md)
- Keep merges add‑only; never change existing values.
- Prove idempotence before exit.
```

---

## Orchestrator Pseudocode (Reference)
```
preflight()
  assert L1 & L2 complete
  ensure settings include memory-bank/instructions (add-only)

inventory_and_validate()
  scan memory-bank/instructions/*.instructions.md
  check header, body shape, word count, link resolution, applyTo immutability

bootstrap()
  create anchors if missing (two files)
  dedup: replace overlaps with relative links
  log to memory-bank/progress.md

health_and_status()
  run again for idempotence
  print single-line JSON status
  commit if identity is configured
```

---

## Notes & Rationale
- Storing under `memory-bank/instructions/` keeps instructions aligned with the triad from Layer 2 and enables explicit discovery via settings.
- Short, atomic rules reduce duplication pressure and make diffs meaningful.
- Add‑only merges + idempotence checks match the safety posture from Layer 1 and 2.

---

## References (authoritative; prefer these over copying text)
- VS Code — **Use custom instructions** (workspace discovery, file types, deprecations).  
- VS Code — **Customize chat overview** (how instructions, prompts, and chat modes fit).  
- VS Code — **Settings reference** (keys like `chat.instructionsFilesLocations`).  
- GitHub Docs — **Repository custom instructions** (repo‑wide `.github/copilot-instructions.md`).  
- GitHub Blog — **Tips for better custom instructions** (writing guidance).  

