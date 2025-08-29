---
description: Layer 3A — Custom Instructions Factory. Canonical authoring rules for *.instructions.md. Single source of truth, short atomic rules, no external links.
---

<!-- memory-bank/instructions/layer-3a-custom-instructions-factory.instructions.md -->

# Layer 3A — Custom Instructions Factory

Purpose. Define durable guardrails for all AI runs. Store every instructions file in `memory-bank/instructions/`. Keep rules atomic and reusable. Do not duplicate text; link relatively.

Scope. Creation, verification, and evolution of `*.instructions.md`. Front-matter `description` is mandatory. `applyTo` is optional and **immutable** once present. Do not add `applyTo` without explicit glob from Benjamin.

## Operating Principles
- One idea per bullet. Keep language testable.
- Prefer linking to existing rules over repeating.
- Idempotent changes. No overwrites. Merge-append only.
- Relative links only. No external URLs. No placeholders.

## Authoring Procedure
- Path: `memory-bank/instructions/<topic>.instructions.md`
- Front-matter:
  - `description: <concrete what/why>`
  - `applyTo:` omit unless provided; if present, never change.
- Body:
  - Bulleted rules. Avoid long narratives.
  - "If X → Do Y" format for conditions.
  - Link to sibling rules like `[Layer 3B](./layer-3b-chatmodes-factory.instructions.md)` and `[Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.
- Size target: 200–400 words. Split large topics.

## Verify & Bootstrap
- Create missing file under `memory-bank/instructions/` only.
- If overlap exists, replace duplication with a relative link.
- Do not change existing `applyTo`.
- Log brief changes in `memory-bank/progress.md`.

## Review Gate
- `description` present and concrete.
- No new or modified `applyTo` without explicit approval.
- All links are relative and resolve.
- No external links. No duplication. Within size target.