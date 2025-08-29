---
description: Layer 3B — Chat Modes Factory. Rules for *.chatmode.md files. Minimal modes that bind model + tools + behavior. Store modes under memory-bank/chatmodes/.
---

<!-- memory-bank/instructions/layer-3b-chatmodes-factory.instructions.md -->

# Layer 3B — Chat Modes Factory

Purpose. Modes are switches. They set model and tools, then defer to instructions. Keep mode text thin. Point to rules in `[Layer 3A](./layer-3a-custom-instructions-factory.instructions.md)` and reference prompts in `[Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.

Storage. Place actual mode files in `memory-bank/chatmodes/`. The present document stays in `memory-bank/instructions/`.

## Constraints
- Front-matter must include:
  - `description: <short>`
  - `tools: ['codebase', 'editFiles', 'fetch']`  ← exact
  - `model: GPT-5 (Preview)` **or** `model: GPT-5 mini (Preview)`  ← only these
- One `#` H1 in the mode file body. Relative links only. No external URLs.

## Mode Authoring Procedure
- Path for mode file: `memory-bank/chatmodes/<name>.chatmode.md`
- Body ≤ 200 words. State:
  - Purpose.
  - Inputs expected.
  - Outputs format.
  - Hard boundaries (what the mode must not do).
- Link to instruction files in `memory-bank/instructions/` for detailed policy.

## Verify & Bootstrap
- Create `memory-bank/chatmodes/` if missing.
- Never change an existing mode's `tools` or `model` lines without explicit approval. Flag instead.
- Factor common text into an instructions file and link to it.

## Review Gate
- Front-matter present and compliant.
- Body minimal. Inputs/outputs/boundaries explicit.
- Only relative links. No duplication of instruction text.