# Reading Protocol for Cline AI

## Cline AI Entry Point

This file is part of Cline AI's instruction system. **Cline AI's primary entry point is `.clinerules/main-rules.md`**.

### Three AI Agent System

This project supports three AI agents with distinct entry points:

- **Cline AI** → `.clinerules/main-rules.md` (THIS IS MY ENTRY POINT)
- **Codex CLI** → `AGENTS.md`
- **VS Code Copilot** → `.github/copilot-instructions.md`

## Continuous Monitoring

- Memory Bank files and `.clinerules/main-rules.md` must be read at the start of EVERY task or session.
- Files must be re-read when changes are detected.
- Changes in one file may affect others; always check for cross-file impacts.
- If a file changed in the last commit, prioritise reading that delta first.

## Reading Order

1. AGENTS.md (repository context/instructions)
2. projectbrief.md (foundation)
3. productContext.md (purpose)
4. systemPatterns.md (architecture)
5. techContext.md (implementation)
6. activeContext.md (current state)
7. progress.md (status)

## Guidance

- Always follow this order for context gathering and planning.
- Reference this protocol in AGENTS.md, README.md, and all Memory Bank compliance sections.
