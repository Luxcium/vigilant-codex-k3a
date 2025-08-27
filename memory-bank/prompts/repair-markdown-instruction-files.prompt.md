---
description: Directive for your ai agent to repair `.instructions.md` files for VS Code Copilot with strict formatting, metadata, and structure.
---

# Maintenance and Repair of `.instructions.md` Files for VS Code Copilot

This directive is for your AI agent to **maintain and repair `.instructions.md` files** used in VS Code Copilot. The goal is to ensure that these instruction files are consistently formatted, contain the correct metadata, and follow a standardized structure. The AI agent should be able to identify and fix common issues such as formatting errors, missing sections, and incorrect metadata.

## Key Responsibilities of the AI Agent

### File Naming and Location

1. **File Naming and Location**
   - Ensure all instruction files are named in lowercase kebab-case, ending with `.instructions.md`.
   - Verify that files are stored in the `memory-bank/instructions/` directory for this current project.

2. **Front Matter Verification**
   - Check for the presence of a YAML front matter block at the top of the file.
   - Ensure the front matter includes a `description` field that is relevant to the file's content. Do not make any changes if it do have at least a `description` field, and that field is relevant and specific. Add or modify only if it is missing or incorrect.
    - Remove any extraneous fields that are not part of the allowed metadata set.
    - Keep any `applyTo` fields if they are present, as they may be relevant you must never remove them, and if missing you should never add them.
    - Ensure there is exactly one blank line after the front matter block.

3. **Path Comment**
   - Verify the presence of a path comment immediately following the front matter.
   - Ensure the path comment matches the file's actual path and filename or update it accordingly.

4. **Header and Slash Command**
   - Confirm that the file contains an H1 header that is a Title Case version of the filename stem it may follow emdash and extended header if present.
   - Ensure there is no slash command present in the header of instructions file.
   - Unlike a `.prompt.md` file the presence of a slash command is irrelevant in the context of an `.instructions.md` file, so do not add that or resolve it, if the target file is a `.prompt.md` file this protocol does not apply please abort, verify if you should have or could have an `.instructions.md` file taht should have been working on, if only `.prompt.md` that is not the correct file type and specify that in your response, they have a completely different protocol to follow.

### Section Structure and Content

Must comply with markdown formatting rules:
   - Use LF for line endings.
   - Use spaces only (no tabs).
   - Use proper markdown syntax for hierarchical headers, lists, code blocks, etc.
