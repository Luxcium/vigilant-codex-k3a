---
description: Author and run *.prompt.md cards under memory-bank/prompts/ with our strict format and guardrails.
---

<!-- memory-bank/prompts/prompt-files-guide.prompt.md -->

# Prompt Files Guide

## Slash Command: /prompt-files-guide - Author and run *.prompt.md cards

This command activates “Prompt Authoring Mode” for this run: you generate or refactor prompt cards
that comply with our repository rules and produce ready-to-use `.prompt.md` files.

> [!IMPORTANT]
> `/prompt-files-guide` has been called by the user to author compliant `.prompt.md` cards. The state above applies for this run.

### Context & Activation

* **Scope:** Create or rewrite files under `memory-bank/prompts/` only. Do not touch `.github/prompts/`.
* **State:** Enforce our prompt-card contract. No H1. First header is the Slash Command H2. Use only allowed frontmatter.
* **Inputs:** `${input:stem}` (required), `${selection}` (optional), `${file}` (optional), `${input:label}` (optional).
* **Safety:** Never add `mode`, `model`, or `tools` frontmatter if they are absent. If present in an existing card, preserve them unchanged. Prefer relative links to our instructions; include external links when they materially clarify or cite authoritative sources.

### Goal

Produce a single, valid `.prompt.md` card that runs in VS Code Chat and conforms to our formatting,
storage, and linking rules without manual post-edits.

### Output format

Return one complete Markdown file:

1. YAML frontmatter with only `description` unless optional keys already exist in the source.
2. Path marker comment `<!-- memory-bank/prompts/<stem>.prompt.md -->`.
3. `## Slash Command: /<stem> - <label>` then the IMPORTANT block exactly as below.
4. Sections: **Context & Activation**, **Goal**, **Output format**, **Inputs**, **Steps / Rules**, **Examples**, **Edge cases / Stop criteria**.

### Inputs

* `${selection}`: current editor selection, if any.
* `${file}`: current file path, if useful.
* `${input:stem}`: canonical slash name, e.g. `create-react-form`.
* `${input:label}`: short purpose label.

### Steps / Rules

* Store at `memory-bank/prompts/<stem>.prompt.md`.
* Frontmatter:

  * Required: `description`.
  * Optional: `mode`, `model`, `tools` — never add if missing; never edit or remove if present.
  * No other keys.
* Spacing:

  * Frontmatter fenced with `---`.
  * Exactly one blank line after `---`.
  * Then the path marker comment on its own line.
  * Then exactly one blank line before the body.
* Headings:

  * No H1. First header is `## Slash Command: /<stem> - <label>`.
  * All other headers are `###` or lower. No level skips.
  * Lines ≤120 characters.
* Links and refs:

  * Use only relative links. Prefer referencing our rules:

    * `[Prompt Files Factory](../instructions/layer-3c-prompt-files-factory.instructions.md)`
    * `[Custom Instructions Factory](../instructions/layer-3a-custom-instructions-factory.instructions.md)`
    * `[Chatmodes Factory](../instructions/layer-3b-chatmodes-factory.instructions.md)`
* Variables:

  * Support `${selection}`, `${file}`, `${input:*}` where useful.
* Content:

  * Define a clear Goal and Output format for the task the card performs.
  * Provide at least one worked example.
* Storage:

  * Never write to `.github/prompts/` or profile locations.

### Examples

**Input:** `${input:stem}=create-react-form`, `${input:label}=Scaffold a React form`
**Expected Output (minimal card):**

```markdown
---
description: Scaffold a typed React form component with react-hook-form and schema validation.
---

<!-- memory-bank/prompts/create-react-form.prompt.md -->

## Slash Command: /create-react-form - Scaffold a React form
This command enables “React Form Scaffolding Mode” to generate a typed form component quickly.

> [!IMPORTANT]
> `/create-react-form` has been called by the user to scaffold a React form. The state above applies for this run.

### Context & Activation
- **Scope:** Generate component files; read templates; cite internal rules and authoritative external sources when helpful.
- **State:** Use Next.js + TypeScript conventions if detected; otherwise plain React + TS.

### Goal
Create `src/components/${input:name}/${input:name}.tsx` and a matching schema and types.

### Output format
- Diff or file contents for new files.
- A checklist of follow-up steps.

### Inputs
- `${input:name}` (required), `${selection}` (optional)

### Steps / Rules
- Use `react-hook-form`. Define types for form data.
- Prefer uncontrolled inputs with `register`. Provide `defaultValues`.
- Create a Zod schema in `src/components/${input:name}/schema.ts`.
- Export `Form${input:name}` component and `Form${input:name}Schema`.

### Examples
**Input:** `/create-react-form: name=UserProfile`
**Expected:** Files + a TODO checklist.
### Edge cases / Stop criteria
- If project has no React, return a short plan instead of files and stop.
```

### Edge cases / Stop criteria

* If an existing card includes `mode`, `model`, or `tools`, keep them exactly as-is.
* If the stem is missing or invalid, stop and emit a one-line error.
* If you cannot meet all rules, return the largest valid partial that compiles to Markdown and stop.
