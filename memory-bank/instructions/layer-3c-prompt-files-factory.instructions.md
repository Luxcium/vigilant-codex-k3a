---
description: Layer 3C — Prompt Files Factory. Rules for *.prompt.md cards. Prompts orchestrate modes and instructions. Store prompts under memory-bank/prompts/.
---

<!-- memory-bank/instructions/layer-3c-prompt-files-factory.instructions.md -->

# Layer 3C — Prompt Files Factory

Purpose. Prompts are on-demand procedures. They call a chat mode (see [Layer 3B](./layer-3b-chatmodes-factory.instructions.md)), reuse instruction files (see [Layer 3A](./layer-3a-custom-instructions-factory.instructions.md)), define variables, and fix output shape.

Storage. Place actual prompt files in `memory-bank/prompts/`. The present document stays in `memory-bank/instructions/`.

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

### Review Gate
- No contradictions with the selected mode's tools/model.
- Links resolve. Prefer relative links internally; allow external links when they add clear value. No policy duplication. Outputs explicit.

## Verify & Bootstrap
- Create `memory-bank/prompts/` if missing.
- Ensure referenced mode exists; if absent, create it per Layer 3B.
- Ensure referenced instruction files exist; if absent, create minimal stubs per Layer 3A.

The goal is to generate a procedure that will follow all our guidelines for our `.prompt.md` files.

## Prompt Files Factory — Directives

The prompt files factory also governs authoring rules for `.prompt.md` cards. These cards orchestrate chat modes and instruction files, define variables, and specify output formats.

### Scope
- Governs `.prompt.md` cards only.
- Cards are standalone. Link `.instructions.md` files by relative paths.
- Out of scope: authoring rules for other file types.

### Storage and naming
- Store every card at `memory-bank/prompts/`.
- Do not use `.github/prompts/` in this project.
- Filename must end with `.prompt.md`.

### Frontmatter policy
- Nothing above frontmatter. First line is `---`.
- Allowed keys only:  
  - `description` — required. Explains why/when to use the card. Aids selection (draft vs repair).  
  - `tools`, `mode`, `model` — optional. Do not add unless explicitly requested. Preserve if present.
- Remove any other keys.
- Close with `---`, then exactly one blank line.

### Path marker
- After the blank line, insert the canonical path comment:
  `<!-- memory-bank/prompts/<filename>.prompt.md -->`
- Then exactly one blank line.

### Body structure (strict)
1) Exactly one H1 title.  
2) Exactly one or maximum two paragraphs under the H1 (no lists, no headings).  
3) First H2 is the Slash Command block:

```md
## Slash Command: /<stem> - <one-line purpose>
One short paragraph naming the operational state this command casts or lifts for this run.

> [!IMPORTANT]
> `/<stem>` has been called by the user to <one-line purpose>. The state above applies for this run.
````

4. Remaining sections are H3 or lower in this order:

* Context & Activation
* Goal
* Output format
* Inputs
* Steps / Rules
* Examples
* Edge cases / Stop criteria

Rules: hierarchical ATX headings only, no level skips. All lines ≤ 120 chars.

## Required section semantics

Adaptive template below. All sections marked required could be replace if the context forces it.

### Context & Activation

* **Scope:** files/entities/tasks in scope for this run.
* **State:** capabilities enabled and restrictions while active.
* **Inputs:** declare `${input:*}` with defaults and validation.
* **Safety:** explicit out-of-scope actions.

### Goal

* State the desired end-state and verifiable success criteria. No process talk.

### Output format

* Define exact shape (JSON schema, checklist, table, or Markdown block). Deterministic.

### Inputs

* Allowed variables: `${selection}`, `${file}`, `${input:var}` (runtime named inputs).
* May also use `${workspaceFolder}`, `${fileBasename}`, `${fileDirname}`, etc., when helpful.

### Steps / Rules

* Prescriptive, testable bullets. Use procedural language.
* Encode conditional logic for idempotence:

  * If missing → generate.
  * If partial/broken → repair.
  * If already compliant → no-op.
* Reference shared rules via relative links to `.instructions.md`.

### Examples

* At least one worked **Input → Expected Output** pair.

### Edge cases / Stop criteria

* List known pitfalls.
* Define when to stop or return partials.
* Always include “do nothing if already compliant.”

## Agentic prompting best practices (VS Code / Codex/Copilot / GPT-5)

* Write in imperative voice. State preconditions, actions, and acceptance checks.
* Bind scope via concrete paths and globs when useful. Avoid vague directives.
* Prefer small, composable outputs. Chain cards rather than overloading one card.
* Keep outputs reproducible. Avoid non-deterministic phrasing.
* Never restate shared instructions. Link them.
* Guard against drift: restate the intended end-state before actions.

## Mode / model / tools policy

* Valid optional fields: `mode`, `model`, `tools`.
* Do not add them unless explicitly requested.
* Never remove or change them if already present.

## Running and testing

* Run via `/card-name`, **Chat: Run Prompt**, or the editor play button.
* Use the play button to iterate quickly in a new chat or current session.
* Manually test before adoption.

## Authoring checklist (review gate)

* File lives in `memory-bank/prompts/` and ends with `.prompt.md`.
* Frontmatter at top; `description` present; only allowed keys; spacing is exact.
* Path marker present, followed by one blank line.
* Body order: H1 → one paragraph → H2 Slash Command → H3+ sections (in order).
* Context & Activation complete.
* Goal and Output format precise and verifiable.
* At least one Example included.
* Conditional create/repair/no-op logic present.
* Variables used appropriately; defaults and validation declared.
* Headings hierarchical; lines ≤ 120 chars.
* Manual test performed.

## Minimal adaptive template

```prompt
---
description: One-sentence purpose of this card (why/when to use)
---

<!-- memory-bank/prompts/<filename>.prompt.md -->

# <Title Case Stem>
One short paragraph setting the stage and framing the task.

## Slash Command: /<stem> - <one-line purpose>
One short paragraph naming the operational state this command casts or lifts for this run.

> [!IMPORTANT]
> `/<stem>` has been called by the user to <one-line purpose>. The state above applies for this run.

### Context & Activation
- **Scope:** <files/entities in scope>
- **State:** <enabled capabilities and restrictions>
- **Inputs:** `${input:...}` defaults and validation
- **Safety:** <out-of-scope actions>

### Goal
<Desired end-state and success criteria>

### Output format
<Exact output shape (JSON/checklist/table/markdown)>

### Inputs
- `${selection}` (optional)
- `${file}` (optional)
- `${input:arg}` (runtime named inputs)

### Steps / Rules
- If missing → generate.
- If partial/broken → repair.
- If complete → no-op.
- Link standards: [Team rules]\(../instructions/<file>.instructions.md)

### Examples
**Input:** …
**Expected Output:** …

### Edge cases / Stop criteria
- <pitfalls and halting conditions>
- Do nothing if already compliant
```

## Exclusions

Even if we do not plan to use prettier for the time being, we exclude the chatmode files from formatting to avoid any accidental reformatting that could alter the intended structure or readability of these files.

```ignore
# Keep prompt and chatmode cards out of Prettier to preserve strict spacing/heading contracts, generate a .prettierignore file with the 2 files types below:
*.prompt.md
*.chatmode.md
```
