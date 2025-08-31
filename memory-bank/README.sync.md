

## Goals

- Keep the memory bank organized and discoverable.
- Synchronize README content with the actual files present.
- Surface conflicts, drift, and gaps for correction.

## Root Files

- `activeContext.md`: Current active workspace context and high-level directives.
- `progress.md`: Latest progress log for the main workspace.
- `productContext.md`: Product vision, goals, and outcomes.
- `projectbrief.md`: Concise summary of the project scope and assumptions.
- `techContext.md`: Technical stack, decisions, and constraints.
- `dependencies.md`: Tracked dependencies and version considerations.
- `docker-workflow.md`: Docker-based workflows and lifecycle.
- `root-contexts.md`: Canonical root contexts and how they interrelate.
- `readme-drift-resolution.md`: Protocol for resolving README drift.
- `testing-guide.md`: Testing strategy and practical guidance.

Specialized playgrounds

- `activeContext-questrade-example-playground.md`: Active context for the Questrade playground.
- `progress-questrade-example-playground.md`: Progress log for the Questrade playground.

## Subfolders

Archives

- `archives/`: Time-capsuled snapshots of major context files.

Chatmodes

- `chatmodes/`: Custom chat modes that guide AI behavior in VS Code.

Docs

- `docs/`: Supporting documents and protocol references.

Instructions

- `instructions/`: Instruction files that act as persistent generation standards.

Prompts

- `prompts/`: Reusable prompt files (standalone workflows) for Copilot chat.

Notebooks

- `../notebooks/`: Jupyter notebooks used in this workspace (referenced by prompts/instructions where relevant).

## Detected Inconsistencies

- README drift: Subfolder README files (chatmodes, prompts, instructions) are partially out of sync with current files.
- Cross-reference drift: Some READMEs mention paths under `.github/` while files live under `memory-bank/`; ensure settings (`chat.modeFilesLocations`, `chat.promptFilesLocations`, `chat.instructionsFilesLocations`) reflect `memory-bank/*`.
- Matrix references: Ensure "when-to-use-what-matrix" links resolve to the correct path.

## Validation Commands (bash)

```bash
# Count root-level files (exclude folders)
find ./memory-bank -maxdepth 1 -type f | wc -l

# Count instruction files
find ./memory-bank/instructions -type f -name '*.md' | wc -l

# Count prompt files
find ./memory-bank/prompts -type f -name '*.prompt.md' | wc -l

# Count chatmodes
find ./memory-bank/chatmodes -type f -name '*.chatmode.md' | wc -l
```

## Next Actions

- Update each subfolder README using the synced inventories below.
- Normalize references from `.github/*` to `memory-bank/*` in settings and documentation.
- Add missing overviews for any new files and mark deprecated ones, if any.
