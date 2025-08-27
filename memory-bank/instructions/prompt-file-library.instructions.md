Shared is a **project directive document**. It defines how `.prompt.md` files must be created, structured, and maintained inside our VS Code–based repos. Here is what it establishes, in plain terms you must follow instructions:

* **Purpose**
  Build a library of precise, reproducible prompt files (`.prompt.md`) for VS Code Copilot. Each file encodes a specific workflow or task as a “prompt card.”

* **Scope and separation**

  * Rules apply only within this ChatGPT Project.
  * Biograms = ChatGPT’s internal memory (never written into repos).
  * `memory-bank/` = repo storage for `.prompt.md` (never ChatGPT’s memory).
  * Project directives = meta-rules like this document, enforced here only.

* **Objectives**

  * Output files that are ready to commit without cleanup.
  * Enforce strict formatting and metadata guardrails.
  * Keep clear boundary between ChatGPT’s own memory and repo content.

* **Authority hierarchy**

  1. This directive (highest).
  2. Stored biograms.
  3. User-supplied `.prompt.md`.
  4. Model defaults (lowest).

* **Operations**

  * All prompt authoring happens inside this Project context.
  * Drafting via Canvas, or with uploaded repo files.
  * When generating, always follow the guardrails.

* **Guardrails for `.prompt.md`**

  * **Filename**: verb-first, lowercase kebab-case, ending in `.prompt.md`.
  * **Front matter**: YAML block with only `description` (mandatory, concrete), plus optional `tools`, `mode`, `model`. Nothing else. One blank line after.
  * **Path comment**: must follow immediately (`<!-- memory-bank/prompts/<filename>.prompt.md -->`).
  * **Header + slash command**: H1 = Title Case stem, then `> Slash command: /<stem>`.
  * **Sections** in order:

    1. Intent
    2. Inputs
    3. Preconditions
    4. Steps
    5. Output Format
    6. Constraints
    7. Failure Modes and Recovery
    8. Examples (at least 2, with input + expected output)
  * **Formatting**: strict rules (LF, ≤120 chars per line, spaces only, etc.).
  * **Storage**: always in `memory-bank/prompts/`.

* **VS Code / Copilot interplay**

  * VS Code can load these from `./memory-bank/prompts/`.
  * Copilot web ignores them; if needed, mirror into `.github/copilot-prompts.md`.

* **Overrides vs defaults**

  * Microsoft default location is `.github/prompts/`; your rule forces `memory-bank/prompts/`.
  * Microsoft allows arbitrary metadata; your rule restricts to the minimal set.

* **Execution style**

  * Responses concise, no fluff.
  * All work delivered inline.
  * No promises of hidden background tasks.
  * Web lookups only when facts can change (VS Code updates, OpenAI features).

* **Separation reminders**

  * Don’t leak biogram content into repo.
  * Don’t restate global defaults inside `.prompt.md`; only put file-specific guidance.

* **End note**
  This directive is the shared baseline. The agent should not re-explain it every time; just apply it consistently unless asked about it.

In essence: it’s a **rulebook for authoring `.prompt.md` prompt cards**. It locks down naming, metadata, structure, formatting, storage, and the chain of authority. It also clarifies what belongs to ChatGPT vs what belongs to your repo.
