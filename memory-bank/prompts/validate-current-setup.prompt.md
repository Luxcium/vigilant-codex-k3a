---
description: Validate current setup for memory-bank, VS Code, and Copilot.  Ensure all directives are clear and ready for implementation.
tools: ["codebase", "usages", "fetch", "editFiles", "runCommands", "todos"]
---

# Validate current setup for memory-bank, VS Code, and Copilot

Recap accepted. Directives in stated order. We will either install our
procedure for a first time or if any of these files do not already exist,
we will validate and create them. If partially compliant you will update
the environment to have the basic structure and update them as needed.

## Declare a directive set

- Treat this thread as authoritative procedure.
- Look if files they already exist before creating.
- Resilient do not overwrite existing files.
- Use markdown format for all files.

## VS Code recipe

- Create `.vscode/settings.json`.
- Baseline: Node.js 22+.
- Enable Copilot thinking tool and chat todo list.
- Use ESLint flat config with Prettier integration.
- Turn on format on save and organize imports.

## Copilot setup

- Add `.github/copilot-instructions.md`.
- Guardrails: TypeScript, TSDoc, Node 22+, flat ESLint, `eslint-config-prettier`.
- `.chatmode.md` rules:
  - `model: GPT-5 (Preview)` or `model: GPT-5 mini (Preview)` only.
  - `tools: ['codebase', 'usages', 'fetch', 'editFiles', 'runCommands', 'todos']` exactly.
- Memory-bank is canonical context.

## Memory-bank initialization

Seek for the file ['copilot-memory-bank'](../instructions/copilot-memory-bank.instructions.md) that will give you the proper context and procedure to follow, you must understand it before proceeding, and following it is mandatory. Do not ask confirmation and insure that you keep the information if any and that you integrate it back within the upgraded `memory-bank/`.

- Maintain six important files under `memory-bank/`:

  - `activeContext.md`
  - `projectbrief.md`
  - `productContext.md`
  - `systemPatterns.md`
  - `techContext.md`
  - `progress.md`

### Memory-bank activation and priority

1. `activeContext.md`

   - Current focus and immediate tasks
   - Update every session
   - Shapes all other files
   - Defines core requirements and goals
   - Scope source of truth

2. `projectbrief.md`

   - Why the project exists
   - Problems solved and high-level goals
   - How it should work
   - UX goals

3. `productContext.md`

   - Product requirements and user needs
   - Business objectives
   - Current focus, recent changes, next steps
   - Active decisions, patterns, preferences
   - Learnings and insights

4. `systemPatterns.md`

   - Technical patterns and decisions
   - Code conventions and architecture
   - Component relationships
   - Critical implementation paths

5. `techContext.md`

   - Stack and constraints
   - Technical specs and limitations
   - Dev setup and dependencies
   - Tool usage patterns

6. `progress.md`

   - Completed work and remaining tasks
   - Milestones and achievements
   - Current status and known issues
   - Evolution of decisions

## Recap checkpoint

- Confirmed memory-bank is active and session-ready.

## Define the triad of special folders

- `memory-bank/instructions/`
- `memory-bank/prompts/`
- `memory-bank/chatmodes/`
- Refer to these collectively as **the triad**.

## Add READMEs

- Create `README.md` at repo root.
- Create `memory-bank/instructions/README.md`.
- Create `memory-bank/prompts/README.md`.
- Create `memory-bank/chatmodes/README.md`.

## VS Code settings for the triad

- Add these keys to `.vscode/settings.json`:

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.instructionsFilesLocations": { "memory-bank/instructions": true },
  "chat.promptFiles": true,
  "chat.promptFilesLocations": { "memory-bank/prompts": true },
  "chat.modeFilesLocations": { "memory-bank/chatmodes": true }
}
```

## Procedure status

- The above is the procedure so far.
- Next input will communicate each item as needed.
- Validate that the project is ready for these steps.
