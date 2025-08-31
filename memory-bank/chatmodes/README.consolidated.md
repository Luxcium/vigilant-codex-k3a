

## Purpose

Chat mode files (`.chatmode.md`) define:

- Operational parameters and tool configurations for specific workflows
- Domain-specific AI behavior and response patterns
- Integration settings and context for VS Code Copilot
- Specialized prompts and instructions for particular use cases

## Available Chatmodes

- `api-architect.chatmode.md` — Architecture-first guidance for API design and reviews
- `iterative-nextjs.chatmode.md` — Iterative development mode for Next.js projects
- `main-expert.chatmode.md` — Primary expert mode for general development tasks
- `notebook-master.chatmode.md` — Master controller for complex notebook workflows
- `notebook-specialist.chatmode.md` — Specialist notebook mode for advanced data tasks
- `plan.chatmode.md` — Planning and high-level task breakdown mode
- `proto-notebook-advanced.chatmode.md` — Advanced prototyping for notebooks
- `proto-notebook.chatmode.md` — Prototype notebook creation and iteration
- `questrade-sdk-developer.chatmode.md` — Domain-specific mode for Questrade SDK development
- `setup-context.chatmode.md` — Setup mode for initializing project contexts
- `tsdoc-typedoc.chatmode.md` — Documentation-focused mode for TSDoc/TypeDoc
- `vscode-helper.chatmode.md` — Helper mode for VS Code tasks and workflows

## Subfolder

- `planification-agent/` — Supporting artifacts for planning agent workflows

## Usage

Chat modes are activated through VS Code Copilot's mode selector or by using the mode toggle command.

## Configuration

Ensure VS Code settings include the chatmodes directory:

```json
{
  "chat.modeFilesLocations": {
    "memory-bank/chatmodes": true
  }
}
```

## Validation

```bash
# Count chatmode files
find ./memory-bank/chatmodes -type f -name '*.chatmode.md' | wc -l

# List all chatmodes
ls -1 ./memory-bank/chatmodes/*.chatmode.md
```

## Workflow Integration

Chatmodes complement the workspace's Recursive Output-Verified Playground Workflow:

1. Build and run the current playground (e.g., `src/example.ts`)
2. Verify output in `.keys/example-sdk-demo.json` for correctness
3. Log demonstration and output verification in memory bank
4. Repeat for each iteration, ensuring robust development
