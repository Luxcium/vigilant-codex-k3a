---
description: Project-wide protocol to author, audit, refactor, migrate, and maintain compliant `.prompt.md` files in `memory-bank/prompts/`.
tools: ['codebase', 'problems', 'fetch', 'todos', 'editFiles', 'runCommands']
---

<!-- memory-bank/prompts/define-prompt-file.prompt.md -->

# Define Prompt File

> Slash command: /define-prompt-file

## Intent

Provide one strict procedure for all lifecycle tasks on `.prompt.md` files: creation, review, repair, refactor, migration, normalization, and documentation. Ensure reliability in VS Code, Copilot Chat, and related tooling.

## Inputs

- **Required:** Raw instructions or existing `.prompt.md` content.
- **Optional:** Existing `description`, `tools`, `mode`, or `model` front matter keys to retain.

## Preconditions

- Files reside under `memory-bank/prompts/`.
- Filenames are verb-first, lowercase kebab-case, ending with `.prompt.md`.
- This protocol overrides other conventions.

## Steps

1. **Identify task type**
   - create | audit | repair | refactor | migrate | normalize | explain
2. **Ingest source**
   - Create: use provided raw instructions
   - Other tasks: parse existing file
3. **Normalize front matter**
   - Allowed keys: `description` (required), `tools`, `mode`, `model`
   - Rewrite `description` to a single clear sentence
   - Remove other keys and add one blank line after `---`
4. **Insert path comment**
   - `<!-- memory-bank/prompts/<filename>.prompt.md -->`
   - Add one blank line after the comment
5. **Header and slash command**
   - `# <Verb-first Title>` matching filename stem
   - Next line: `> Slash command: /<filename-stem>`
6. **Required sections in order**
   - `## Intent`
   - `## Inputs`
   - `## Preconditions`
   - `## Steps`
   - `## Output Format`
   - `## Constraints`
   - `## Failure Modes and Recovery`
   - `## Examples` (≥2, each with input and expected output)
7. **Formatting rules**
   - Blank line before and after every heading and code block
   - LF newlines, ≤120 characters per line, spaces only
8. **README sync**
   - List file in `memory-bank/prompts/README.md` and update prompt count
   - Verify via `ls memory-bank/prompts/*.prompt.md -1 | wc -l`
9. **Verification**
   - Ensure front matter, path comment, section order, and formatting comply

## Output Format

Return the corrected `.prompt.md` file or an audit summary followed by the corrected file.

## Constraints

- Do not add or remove provided `tools`, `mode`, or `model`
- No additional front matter keys
- Exactly one blank line after front matter and after path comment

## Failure Modes and Recovery

- Missing or ambiguous description → synthesize or rewrite
- Disallowed front matter keys → remove
- Formatting violations → fix per rules
- Filename, header, or command mismatch → align

## Examples

### Example 1 – Audit and repair

**Input**

```
---
description: Make something
extra: nope
---
# do stuff
```

**Expected Output**

A corrected `.prompt.md` with only `description` in front matter, proper path comment, matching header and slash command, all required sections, and markdownlint-compliant spacing.

### Example 2 – Create from raw instructions

**Input**

```
Summarize a GitHub issue thread into a 5-bullet action plan with owners and due dates.
```

**Expected Output**

A new `summarize-thread.prompt.md` with concise description, path comment, header and slash command, all required sections, and two worked examples.

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
