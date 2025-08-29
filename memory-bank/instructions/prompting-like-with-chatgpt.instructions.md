---
description: Directive for ChatGPT to create `.prompt.md` files for VS Code Copilot with strict formatting, metadata, and structure.
---
# Intention Behind the Directive (User’s Goals)

The person who authored that directive wants to **standardize the creation of `.prompt.md` files** for VS Code Copilot so that every file is consistent, reproducible, and useful as a “prompt card” library. The intent is not casual prompting, but a **bank of durable, codified procedures** that can be committed, versioned, and reused across projects.

Their desired outcome is a **procedural workflow** where ChatGPT (and other AI agents) produce `.prompt.md` files automatically with no ambiguity, mistakes, or formatting drift.

---

## Procedural Interpretation of User’s Intention

### 1. **Establish a Controlled Environment**

* All `.prompt.md` work must happen **inside this Project** so ChatGPT has the directives, memory, and context in scope.
* Context separation enforced:

  * **Biograms** = AI’s memory, not in repo.
  * **memory-bank/** = repo files, permanent and versioned.
  * **Project Directives** = meta-rules (like the doc we reviewed), active only here.

---

### 2. **Authority and Enforcement**

* Clear priority chain:

  1. Project directives (supersede all else).
  2. Biograms (long-term rules).
  3. Repo prompt files (as provided by user).
  4. Model defaults.
* This ensures ChatGPT cannot “drift” back to default Copilot or VS Code assumptions.

---

### 3. **Production of `.prompt.md` Files**

Each file is a **procedural artifact**. The user expects these to be ready-to-commit without cleanup.

**Mandatory workflow for file creation:**

```markdown
1. Choose filename
   - verb-first
   - lowercase kebab-case
   - ends with `.prompt.md`
   - correct typos like `.prompts.md`

2. Add front matter
   ---
   description: <concrete summary of purpose>
   tools: [ ]   # optional
   mode: ...    # optional
   model: ...   # optional
   ---
   (exactly one blank line after)

3. Add path comment
   <!-- memory-bank/prompts/<filename>.prompt.md -->
   (exactly one blank line after)

4. Insert header and slash command
   # Title Case Stem
   > Slash command: /<stem>

5. Add required sections in strict order:
   ## Intent
   ## Inputs
   ## Preconditions
   ## Steps
   ## Output Format
   ## Constraints
   ## Failure Modes and Recovery
   ## Examples
   (≥ 2 examples, each with input and expected output)

6. Apply formatting guardrails
   - LF newlines
   - max 120 chars per line
   - spaces only, no tabs
   - blank lines before/after headings and code fences
   - hierarchical headings only
   - no trailing spaces

7. Save file under `memory-bank/prompts/`
```

---

### 4. **Interaction Rules**

* Do not explain these rules back every time.
* Simply apply them, unless the user explicitly asks for clarification.
* Do not restate defaults or global behavior in prompt files—only include file-specific guidance.
* Deliver files inline with **`path:` block + full file contents**.

---

### 5. **Alignment With Tools**

* VS Code reads from `memory-bank/prompts/`.
* Copilot web ignores local workspace files. If needed, mirror into `.github/copilot-prompts.md`.
* Override Microsoft defaults (location, metadata) to enforce reproducibility and clarity.

---

### 6. **Execution Style**

* Always respond **first with the deliverable** (file, patch, etc.).
* Use **short, direct sentences**.
* No fluff, no emotions, no persona leakage.
* Perform all work inline (no promises of “background tasks”).
* Web lookups only when context might be outdated (VS Code updates, OpenAI feature docs).

---

### 7. **Core Context References**

* **Project directives** (the doc you shared) = ultimate rulebook for `.prompt.md`.
* **Copilot customization docs** (uploaded separately) = baseline reference for official Microsoft defaults.
* **GPT-5 prompting guide** = provides best practices in structuring prompts and reasoning depth; this directive adapts those practices into rigid file templates.
* **Triad of repo folders** (from prior conversations):

  * `memory-bank/instructions/`
  * `memory-bank/prompts/`
  * `memory-bank/chatmodes/`

---

### 8. **User’s Ultimate Goal**

The user wants to:

* Build a **bank of reproducible, codified prompt cards**.
* Guarantee **strict uniformity** across files (naming, metadata, structure, formatting).
* Enforce a **separation of roles**: ChatGPT’s memory vs repo contents.
* Achieve **ready-to-commit artifacts** that slot directly into VS Code + Copilot workflows.
* Treat prompt files as **procedures, not prose**—operational instructions for agents.

---

✅ **Record set:** The person behind the directive intends to create a **rigid procedural framework for authoring `.prompt.md` files**, ensuring that AI outputs are always deterministic, properly structured, and repo-ready.
