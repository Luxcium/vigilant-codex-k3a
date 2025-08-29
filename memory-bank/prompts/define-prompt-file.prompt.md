---
  description: Project-wide protocol to author, audit, refactor, migrate, and maintain compliant `.prompt.md` files in `memory-bank/prompts/`.
  tools: ['codebase', 'problems', 'fetch', 'todos', 'editFiles', 'runCommands']
---
    
  # description: Project-wide protocol to author, audit, refactor, migrate, and maintain compliant `.prompt.md` files in `memory-bank/prompts/`.

  <!-- memory-bank/prompts/define-prompt-file.prompt.md -->

  ## Define Prompt File

  > [!IMPORTANT]
  > Slash command: /define-prompt-file used to call this prompt card please enact this prompt card when you see this file being referenced by the user or another prompt.

  ## Intent

  Provide one strict procedure for all lifecycle tasks on `.prompt.md` files: creation, review, repair, refactor, migration, normalization, and documentation. Filename work is a single validation step. Ensure reliability in VS Code, Copilot Chat, and related tooling.

  ## Inputs

  * **Required:** Raw instructions or existing `.prompt.md` content.
  * **Optional:** Existing front matter keys (`description`, `tools`, `mode`, `model`) to retain as-is.

  ## Preconditions

  * Files reside under `memory-bank/prompts/`.
  * Filenames are verb-first, lowercase kebab-case, ending with `.prompt.md`.
  * This protocol overrides other conventions.

  ## Steps

  1. **Identify task type**

    * Classify: create | audit | repair | refactor | migrate | normalize | explain.
    * If multiple files, process per-file and summarize.

  2. **Ingest source**

    * Create: use provided raw instructions.
    * Audit/refactor: parse the existing `.prompt.md`.

  3. **Normalize front matter**

    * Use `---` fences.
    * Allowed keys only: `description` (mandatory), `tools` (optional), `mode` (optional), `model` (optional).
    * Rewrite `description` to a single clear sentence if missing or vague.
    * Remove all other keys.
    * Add exactly one empty line after the closing `---`.

  4. **Insert path comment**

    * Add `<!-- memory-bank/prompts/<filename>.prompt.md -->`.
    * Replace `<filename>` with the exact filename.
    * Add exactly one empty line after the comment.

  5. **Header and slash command**

    * `# <Verb-first Title>` in Title Case, matching the filename stem.
    * Next line: `> Slash command: /<filename-stem>`.

  6. **Required sections (in order)**

    * `## Intent`
    * `## Inputs`
    * `## Preconditions`
    * `## Steps`
    * `## Output Format`
    * `## Constraints`
    * `## Failure Modes and Recovery`
    * `## Examples` (≥2, each with input and expected output)

  7. **Formatting rules (markdownlint)**

    * One blank line before and after every heading and code block.
    * Hierarchical headings only.
    * LF newlines.
    * Max 120 characters per line.
    * Spaces only; no tabs; no trailing spaces.

  8. **Filename validation**

    * Verb-first, lowercase kebab-case, `.prompt.md` suffix.
    * Header and slash command match the filename stem.
    * Treat any `*.prompts.md` file name as a typo; correct to `.prompt.md`. Folder is `prompts/` (plural), file is `prompt` (singular).

  9. **Verification**

    * All required sections exist and are ordered.
    * Front matter keys are allowed and `description` is unambiguous.
    * Spacing complies with Step 7.

  10. **Deliverables**

      * Create/repair/refactor/migrate: return the corrected `.prompt.md`.
      * Audit-only: return an Audit Report followed by the corrected file.

  ## Output Format

  Produce either:

  1. A complete `.prompt.md` that passes this protocol, or
  2. An audit summary followed by the corrected `.prompt.md`.

  ## Constraints

  * Do not add `tools`, `mode`, or `model` unless provided.
  * Do not remove provided `tools`, `mode`, or `model`.
  * Do not introduce conventions not listed here.
  * All instructions must be imperative and explicit.
  * Keep exactly one empty line after front matter and after the path comment.

  ## Failure Modes and Recovery

  * **Missing description** → Synthesize a precise one from context.
  * **Ambiguous description** → Rewrite for clarity and actionability.
  * **Disallowed front matter keys** → Remove them.
  * **Formatting violations** → Fix per Step 7.
  * **Section order wrong or missing** → Reorder and add.
  * **Filename/header/command mismatch** → Align all three.

  ## Examples

  ### Example 1 – Audit and repair a malformed file

  **Input**

  ```
  ---
  description: Make something
  extra: nope
  ---
  # do stuff
  ```

  **Expected Output**

  A corrected `.prompt.md` with only `description` in front matter, proper path comment, matching header and slash command, all required sections in order, and markdownlint-compliant spacing.

  ### Example 2 – Create from raw instructions

  **Input**

  ```
  Summarize a GitHub issue thread into a 5-bullet action plan with owners and due dates.
  ```

  **Expected Output**

  A new `summarize-thread.prompt.md` that defines a precise `description`, includes the path comment, header, and `/summarize-thread`, provides all required sections with imperative steps, and two worked examples.

  ## What to Keep in Mind

  * Protocol: author, audit, refactor, migrate, and maintain `.prompt.md` files in `memory-bank/prompts/`.
  * Scope: full lifecycle coverage; filename work reduced to validation only.
  * Location: all files under `memory-bank/prompts/`.
  * Filename rule: verb-first, lowercase kebab-case, suffix `.prompt.md`; treat any `*.prompts.md` as a typo; folder is `prompts/` plural.
  * Inputs: required raw instructions or existing `.prompt.md`; optional `description`, `tools`, `mode`, `model` to retain.
  * Overrides: this protocol supersedes other conventions.
  * Step 1 — Identify task type: create | audit | repair | refactor | migrate | normalize | explain; handle multi-file per-file.
  * Step 2 — Ingest source: create→use raw input; audit/refactor→parse existing file.
  * Step 3 — Normalize front matter: `---` fences; allowed keys only; rewrite concise `description`; remove others; one empty line after.
  * Step 4 — Insert path comment: `<!-- memory-bank/prompts/<filename>.prompt.md -->`; one empty line after.
  * Step 5 — Header and slash: `# <Verb-first Title>` matching filename; next line `> Slash command: /<filename-stem>`.
  * Step 6 — Sections order: Intent; Inputs; Preconditions; Steps; Output Format; Constraints; Failure Modes and Recovery; Examples (≥2).
  * Step 7 — Formatting rules: blank line around headings and code; hierarchical headings; LF newlines; ≤120 chars/line; spaces only; no trailing spaces.
  * Step 8 — Filename validation: enforce rule; header and slash command must match filename stem.
  * Step 9 — Verification: sections present and ordered; allowed front matter; unambiguous description; spacing per rules.
  * Step 10 — Deliverables: corrected `.prompt.md`; or Audit Report + corrected file.
  * Output format: either complete compliant file or audit summary followed by corrected file.
  * Constraints: don’t add `tools`/`mode`/`model` unless provided; don’t remove provided ones; no new conventions; imperative instructions; exactly one empty line after front matter and after path comment.
  * Failure modes: missing description; ambiguous description; disallowed keys; formatting violations; wrong section order; filename/header/command mismatch.
  * Recovery actions: synthesize or rewrite description; remove disallowed keys; fix formatting; reorder/add sections; align names.
  * Examples included: Example 1 (audit/repair malformed file); Example 2 (create from raw instructions).


## Tools 

### Todos

Manage a structured todo list to track progress and plan tasks throughout your coding session. Use this tool VERY frequently to ensure task visibility and proper planning.

When to use this tool:

Complex multi-step work requiring planning and tracking
When user provides multiple tasks or requests (numbered/comma-separated)
After receiving new instructions that require multiple steps
BEFORE starting work on any todo (mark as in-progress)
IMMEDIATELY after completing each todo (mark completed individually)
When breaking down larger tasks into smaller actionable steps
To give users visibility into your progress and planning
When NOT to use:

Single, trivial tasks that can be completed in one step
Purely conversational/informational requests
When just reading files or performing simple searches
CRITICAL workflow:

Plan tasks by writing todo list with specific, actionable items
Mark ONE todo as in-progress before starting work
Complete the work for that specific todo
Mark that todo as completed IMMEDIATELY
Move to next todo and repeat
Todo states:

not-started: Todo not yet begun
in-progress: Currently working (limit ONE at a time)
completed: Finished successfully
IMPORTANT: Mark todos completed as soon as they are done. Do not batch completions.

---
