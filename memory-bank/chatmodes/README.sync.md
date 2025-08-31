

## Purpose

- Describe each `*.chatmode.md` for discoverability.
- Keep documentation synchronized and lint-clean.
- Cross-link to relevant VS Code Copilot settings where needed.

## Inventory

- `api-architect.chatmode.md` — Architecture-first guidance for API design and reviews.
- `iterative-nextjs.chatmode.md` — Iterative development mode for Next.js projects.
- `main-expert.chatmode.md` — Primary expert mode for general development tasks.
- `notebook-master.chatmode.md` — Master controller for complex notebook workflows.
- `notebook-specialist.chatmode.md` — Specialist notebook mode for advanced data tasks.
- `plan.chatmode.md` — Planning and high-level task breakdown mode.
- `proto-notebook-advanced.chatmode.md` — Advanced prototyping for notebooks.
- `proto-notebook.chatmode.md` — Prototype notebook creation and iteration.
- `questrade-sdk-developer.chatmode.md` — Domain-specific mode for Questrade SDK.
- `setup-context.chatmode.md` — Setup mode for initializing project contexts.
- `tsdoc-typedoc.chatmode.md` — Documentation-focused mode for TSDoc/TypeDoc.
- `vscode-helper.chatmode.md` — Helper mode for VS Code tasks and workflows.

Subfolder

- `planification-agent/` — Supporting artifacts for planning agent workflows.

## Validation Commands

```bash
# Count chatmode files
find ./memory-bank/chatmodes -type f -name '*.chatmode.md' | wc -l

# List files for reconciliation
ls -1 ./memory-bank/chatmodes | sort
```

## Settings Notes

Ensure VS Code Copilot settings include `memory-bank/chatmodes` in `chat.modeFilesLocations` if using workspace-level chat modes.

```json
{
  "chat.modeFilesLocations": {
    "memory-bank/chatmodes": true
  }
}
```
