# Memory Bank

## Purpose

- Maintain project context, progress, and technical decisions.
- Store AI instruction files that guide code generation behavior.
- Provide reusable prompt files for common workflows.
- House custom chat modes for specialized AI interactions.

## Root Files

- `activeContext.md` — Current active workspace context and high-level directives.
- `progress.md` — Latest progress log for the main workspace.
- `productContext.md` — Product vision, goals, and outcomes.
- `projectbrief.md` — Concise summary of the project scope and assumptions.
- `techContext.md` — Technical stack, decisions, and constraints.
- `dependencies.md` — Tracked dependencies and version considerations.
- `docker-workflow.md` — Docker-based workflows and lifecycle.
- `root-contexts.md` — Canonical root contexts and how they interrelate.
- `readme-drift-resolution.md` — Protocol for resolving README drift.
- `testing-guide.md` — Testing strategy and practical guidance.

### Specialized Playgrounds

- `activeContext-questrade-example-playground.md` — Active context for the Questrade playground.
- `progress-questrade-example-playground.md` — Progress log for the Questrade playground.

## Subfolders

### archives/

Time-capsuled snapshots of major context files for historical reference.

### chatmodes/

Custom chat modes that guide AI behavior in VS Code. Each `.chatmode.md` defines:

- Operational parameters and tool configurations.
- Specialized workflows for domain-specific tasks.
- Integration settings for VS Code Copilot.

**Key chatmodes:**

- `api-architect.chatmode.md` — Architecture-first guidance for API design.
- `main-expert.chatmode.md` — Primary expert mode for general development.
- `notebook-master.chatmode.md` — Advanced notebook workflow controller.
- `questrade-sdk-developer.chatmode.md` — Domain-specific Questrade SDK mode.
- `setup-context.chatmode.md` — Project context initialization mode.
- `vscode-helper.chatmode.md` — VS Code task and workflow assistance.

### docs/

Supporting documents and protocol references.

### instructions/

Instruction files (`.instructions.md`) that automatically apply coding standards and rules. These work passively to ensure consistency across code generation.

**Categories:**

- **Authoring & System:** Framework for creating instructions and self-documentation.
- **Environment & Infrastructure:** Docker, Python, web dev server standards.
- **Language Standards:** TypeScript and Python coding conventions.
- **Project Organization:** Commit standards, component patterns, documentation.

### prompts/

Reusable prompt files (`.prompt.md`) for standalone workflows that can be invoked manually in VS Code Copilot chat.

**Categories:**

- **Template Management:** AI framework and instruction/prompt generation.
- **Environment & Infrastructure:** Docker and Python environment setup.
- **Development & Code Generation:** Component creation and project scaffolding.
- **Documentation & Memory Bank:** Update workflows and dependency tracking.
- **Testing & Validation:** Debugging, linting, and quality assurance.
- **Web Standards & Meta Tags:** SEO, PWA, and cross-platform optimization.

## VS Code Integration

Ensure these settings point to memory-bank locations:

```json
{
  "chat.modeFilesLocations": {
    "memory-bank/chatmodes": true
  },
  "chat.promptFilesLocations": {
    "memory-bank/prompts": true
  },
  "chat.instructionsFilesLocations": {
    "memory-bank/instructions": true
  }
}
```

## Validation Commands

```bash
# Count files by type
find ./memory-bank/instructions -type f -name '*.instructions.md' | wc -l
find ./memory-bank/prompts -type f -name '*.prompt.md' | wc -l
find ./memory-bank/chatmodes -type f -name '*.chatmode.md' | wc -l

# Check for lint issues
../scripts/check-markdown.sh memory-bank/ || true
../scripts/check-memory-bank.sh || true
```

## Documentation Standards

- All markdown files must pass markdownlint validation.
- READMEs in subfolders provide specific inventories and usage guidance.
- Cross-references use relative paths and remain synchronized.
- Front matter in instruction files includes proper `applyTo` patterns.