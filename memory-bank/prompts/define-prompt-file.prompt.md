---
description: Project-wide protocol to author, audit, refactor, migrate, and maintain compliant `.prompt.md` files in `memory-bank/prompts/`.
tools: ['codebase', 'problems', 'fetch', 'todos', 'editFiles', 'runCommands']
---

<!-- memory-bank/prompts/define-prompt-file.prompt.md -->

# Define Prompt File
Establishes a single lifecycle procedure for creating, auditing, repairing, refactoring, migrating, and normalizing prompt cards.

> [!NOTE]
> Supersedes [archives/make-prompts.prompt.md](./archives/make-prompts.prompt.md) and [archives/prompt-files.prompt.md](./archives/prompt-files.prompt.md).

## Slash Command: /define-prompt-file - Manage `.prompt.md` lifecycle
One authoritative workflow to keep prompt cards valid across creation and maintenance.

> [!IMPORTANT]
> `/define-prompt-file` has been called by the user to manage `.prompt.md` files. The state above applies for this run.

### Context & Activation
- **Scope:** `.prompt.md` files in `memory-bank/prompts/`
- **State:** Normalize front matter, path comment, headers, and sections
- **Inputs:** `${input:file}` path or raw instructions
- **Safety:** Do nothing if the file already matches this protocol

### Goal
Produce a prompt file that fully complies with repository standards or report when already compliant.

### Output format
Return a corrected `.prompt.md` ready to commit, or an audit summary followed by the corrected file.

### Inputs
- `${input:file}` (optional) target file path
- `${selection}` (optional) existing prompt content
- `${input:raw}` (optional) instructions to transform into a prompt card

### Steps / Rules
1. Identify task type: create, audit, repair, refactor, migrate, normalize, explain
2. Ingest source content or raw instructions
3. Normalize front matter with allowed keys only
4. Insert path comment `<!-- memory-bank/prompts/<filename>.prompt.md -->`
5. Add H1 matching filename stem and short opening paragraph
6. Add slash command H2 `## Slash Command: /<stem> - <purpose>`
7. Ensure sections in order: Context & Activation; Goal; Output format; Inputs; Steps / Rules; Examples; Edge cases / Stop criteria
8. Validate filename, header, and slash command alignment
9. Verify spacing: one blank line after front matter and path comment
10. Return corrected file or report no changes needed

### Examples
**Example 1 – Audit and repair**
_Input:_ Existing malformed prompt file  
_Output:_ Corrected file matching protocol

**Example 2 – Create from raw instructions**
_Input:_ "Summarize a GitHub issue thread into a 5-bullet action plan"  
_Output:_ `summarize-thread.prompt.md` with all required sections

### Edge cases / Stop criteria
- Stop and report if filename is invalid
- Do nothing if file already compliant
- Preserve existing `mode`, `model`, or `tools` entries

