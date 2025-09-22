---
description: Layer 3B — Chat Modes Factory. Rules for *.chatmode.md files. Minimal modes that bind behavior, optionally pin model and tools. Store modes under memory-bank/chatmodes/. Add-only merges, idempotence checks, and machine-readable status.
---

<!-- memory-bank/instructions/layer-3b-chatmodes-factory.instructions.md -->

# Layer 3B — Chat Modes Factory

**Purpose.** Modes are switches. Keep mode text thin: set the **intent** and guardrails here, then defer durable policy to `*.instructions.md` (Layer 3A) and reusable prompt files (Layer 3C).

**Storage.** Place mode files in `memory-bank/chatmodes/`. This factory document remains in `memory-bank/instructions/`.

---

## Operating Principles (Hard Rules)
- **Add-only, never overwrite.** Do not edit existing lines or change existing metadata in mode files.
- **Idempotent by design.** A second run after success produces **no changes**.
- **Minimal body, link out.** One short paragraph + a compact `/mode` block. Put policies in instructions; long prompts belong in prompt files.
- **Deterministic outputs.** Same inputs → same file set and status JSON.
- **Discovery explicit.** Ensure VS Code searches `memory-bank/chatmodes/` via workspace settings before authoring.

---

## Preflight (Discovery & Preconditions)
- **Require Layers 1 & 2 complete** and **Layer 3A present**.
- **VS Code discovery check**: add-only merge into `.vscode/settings.json` if needed:
  ```json
  {
    "chat.modeFilesLocations": { "memory-bank/chatmodes": true }
  }
  ```
  Do not remove other locations (e.g., `.github/chatmodes`).

---

## Mode Authoring Procedure (Strict)
**Path.** `memory-bank/chatmodes/<name>.chatmode.md`

**Front-matter (YAML):**
- `description: <short purpose>` — **required**, non-empty.
- `tools:` — **optional**. If present, **immutable** (never add/change without explicit human approval). If omitted, tools are selected in the UI.
- `model:` — **optional**. If present, **immutable** (never add/change without explicit human approval). If omitted, the mode uses the current picker.
- No other keys.

**Path marker (required, one blank line after front-matter):**
```
<!-- memory-bank/chatmodes/<filename>.chatmode.md -->
```

**Body shape (≤ 200 words total):**
```
# <Mode title>

<One short paragraph: what the mode is for and when to use it. Link to instructions/prompts.>

## /mode
- Inputs: <what the mode expects>
- Outputs: <how results are returned/formatted>
- Boundaries: <what the mode must NOT do>
```

**Linking.** Prefer **relative** links to internal files, e.g. `[Rules — Layer 3A](./layer-3a-custom-instructions-factory.instructions.md)` and `[Prompts — Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.

---

## Merge-Append Contract (Markdown, Add-Only)
- Never change existing lines.
- Append under `## /mode` if adding bullets; **dedupe** by normalized line text (trim, collapse spaces).
- Replace overlapping prose with a **relative link** to the canonical file instead of copying.
- Validate that relative links **resolve** before writing.

---

## Verify & Bootstrap
1) **Ensure directory** `memory-bank/chatmodes/` exists; create if missing.
2) **Inventory & validate** existing `*.chatmode.md` against the schema and body shape above.
3) **Create missing** starter content **only on new projects** (when the directory is empty):
   - `plan.chatmode.md` — a minimal planning mode that makes no edits and links to relevant instructions/prompt files.
4) **Never modify** `tools` or `model` lines of existing modes; if they conflict with team guidance, flag in status notes.
5) **Prettier guard**: if `.prettierignore` is missing, create it with lines below; otherwise **append** lines if absent (idempotent):
   ```ignore
   # Keep prompt and chatmode cards out of Prettier to preserve strict spacing/heading contracts
   *.prompt.md
   *.chatmode.md
   ```

---

## Review Gate (Pass/Fail)
- Front-matter present and compliant; `description` non-empty; no extra keys.
- Agent did **not** add or change `tools`/`model` for existing files.
- Body ≤ 200 words; Inputs/Outputs/Boundaries explicit.
- Links resolve; relative for internal references; external links authoritative.

---

## Health Check, Idempotence & Status
**Idempotence test.** Re-run Layer 3B immediately. If in git, run `git diff --quiet --exit-code`; else compare file hashes/mtimes. Differences → FAIL and list paths.

**Status JSON (single line).** Print a summary like:
```json
{
  "layer": "3B",
  "artifacts": {
    "dir": "present|created",
    "modes": [
      "plan.chatmode.md:present|created|invalid"
    ],
    "prettierignore": "present|created|appended"
  },
  "discovery": { "memory-bank/chatmodes": true },
  "idempotent": true,
  "notes": ["mode_locations_merged", "tools_model_immutable", "tools_unknown:githubRepo"]
}
```
Include only notes that occurred.

---

## Minimal Template — Plan Mode (starter for empty dirs)
```markdown
---
description: Generate a concise implementation plan without modifying files.
---

<!-- memory-bank/chatmodes/plan.chatmode.md -->

# Planning mode

Use this mode to produce an implementation plan for a feature or refactor. **Do not** make edits; link the plan to specific files and reference the rules/prompts for details.

## /mode
- Inputs: feature/refactor summary; constraints; target files/areas to inspect.
- Outputs: Markdown plan with Overview, Requirements, Steps, Tests; file-level checklist.
- Boundaries: no edits, no commands; cite assumptions; prefer relative links to code.
```

---

## Orchestrator Pseudocode (Reference)
```
preflight()
  assert L1 & L2 complete and L3A present
  ensure settings include memory-bank/chatmodes (add-only)

inventory_and_validate()
  scan memory-bank/chatmodes/*.chatmode.md
  check header keys, body shape, word count, link resolution, immutability of tools/model

bootstrap()
  if directory empty: create plan.chatmode.md
  ensure .prettierignore contains patterns (append add-only)

health_and_status()
  run again for idempotence
  print single-line JSON status
```

---

## Notes & Rationale
- Thin modes avoid duplication and drift; policy lives in instructions, reusable content in prompt files.
- Optional `tools`/`model` metadata respects UI-based selection and evolving toolsets while allowing strict pinning when humans approve it.
- Add-only merges + idempotence checks match the safety posture from prior layers.

---

## Related Reading
- Use chat modes in VS Code (overview)
- Customize chat to your workflow (instructions, prompts, modes)
- Use agent mode (tools & capabilities)
- Copilot settings reference (locations for mode files)

