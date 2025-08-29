---
description: Layer 3C — Prompt Files Factory. Rules for *.prompt.md cards. Prompts orchestrate modes and instructions. Store prompts under memory-bank/prompts/.
---

<!-- memory-bank/instructions/layer-3c-prompt-files-factory.instructions.md -->

# Layer 3C — Prompt Files Factory

Purpose. Prompts are on-demand procedures. They call a chat mode (see `[Layer 3B](./layer-3b-chatmodes-factory.instructions.md)`), reuse instruction files (see `[Layer 3A](./layer-3a-custom-instructions-factory.instructions.md)`), define variables, and fix output shape.

Storage. Place actual prompt files in `memory-bank/prompts/`. The present document stays in `memory-bank/instructions/`.

## Heading Contract
- **No H1 in `.prompt.md`.**
- First header must be:  
  `## Slash Command: /<stem> - <label>`
- All subsequent headers are `###` or lower.

## Prompt Authoring Procedure
- Path: `memory-bank/prompts/<stem>.prompt.md`
- Front-matter:
  - `description: <short>`
  - `mode: ask | edit | agent` (omit to default to agent)
  - Optional `model` and `tools` may be set but must not contradict the selected mode.
- Body:
  - One-paragraph operational state.
  - `### Inputs` — list `${selection}`, `${file}`, `${workspaceFolder}`, and `${input:name}` variables.
  - `### Steps` — concise, numbered actions.
  - `### Outputs` — explicit format (Markdown sections or JSON schema).
  - Relative links to instruction files and the chosen mode file.
- Keep total length ~300–600 words. Split if larger.

## Verify & Bootstrap
- Create `memory-bank/prompts/` if missing.
- Ensure referenced mode exists; if absent, create it per Layer 3B.
- Ensure referenced instruction files exist; if absent, create minimal stubs per Layer 3A.

## Review Gate
- Heading contract satisfied; no H1.
- No contradictions with the selected mode's tools/model.
- Relative links only. No policy duplication. Outputs explicit.