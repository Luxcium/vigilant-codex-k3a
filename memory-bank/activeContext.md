## [2025-02-06]
# activeContext.md

## Purpose
This file tracks the current work focus, recent changes, next steps, and active decisions for any project. It is the primary reference for understanding the present state of the project, independent of any specific topic at initialization.

## Structure
- **Current Work Focus:** What is being worked on right now.
- **Recent Changes:** Summary of the latest updates.
- **Next Steps:** Planned actions and priorities.
- **Active Decisions:** Key choices and considerations.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Current Work Focus

Completed conditional Python environment framework that provides three environment modes (local virtual environment, Docker isolated, Docker volume-mounted) through parameterized instructions and scripts. The framework defers hard implementation choices to runtime via ENV_MODE parameter, following project's script-driven creation protocols.

## Recent Changes

- **Conditional Python Environment Framework**: Created comprehensive conditional setup system:
  - `.github/instructions/python-environment-conditional.instructions.md` - Parameter-driven conditional instructions
  - `.github/prompts/python-environment-setup.prompt.md` - User-facing prompt for mode selection
  - `scripts/setup_python_env.sh` - Main entry script with ENV_MODE parameter routing
  - `scripts/setup_python_local.sh` - Local virtual environment setup with comprehensive documentation
  - `scripts/setup_python_docker_isolated.sh` - Fully isolated Docker environment setup
  - `scripts/setup_python_docker_volume.sh` - Volume-mounted Docker environment with live editing
- **Parameter-Driven Architecture**: Implemented true conditional logic:
  - ENV_MODE parameter determines runtime behavior (local, docker_isolated, docker_volume)
  - PYTHON_VERSION and PROJECT_NAME parameters for customization
  - No hard-coded choices in instruction files or scripts
  - Mode-specific README.md generation with complete documentation
- **Project Protocol Compliance**: Followed established patterns:
  - Script-driven creation in `scripts/` directory
  - Idempotent scripts with existence checks and user prompts
  - Cross-references to Memory Bank and instruction files
  - Integration with three AI agent system (Cline AI, Codex CLI, VS Code Copilot)
- **Quality Assurance**: Comprehensive testing and validation:
  - Docker build verification in isolated and volume modes
  - Python version checking and virtual environment testing
  - Mode-switching capabilities documented and tested
  - Complete troubleshooting guides for each environment type

## Next Steps

### Documentation Updates
- Update `memory-bank/dependencies.md` with conditional Python environment dependencies
- Update `memory-bank/docker-workflow.md` with new conditional Docker patterns
- Update `memory-bank/progress.md` with completed framework status

### Testing
- Run each environment mode to validate behavior

### Expansion
- Document lessons learned about conditional instruction design
- Explore applying framework to other languages (Node.js, etc.)

## Active Decisions

- Adopted and documented a standardized project root organization by language and framework.
- All setup and file/folder creation must be performed via scripts in the `scripts/` directory, never manually.
- Scripts must be idempotent, must not overwrite existing files, and must warn or skip if files/folders exist.
- All documentation and scripts must be markdown-lint strict mode compliant.
- **Conditional Framework Standard**: Instruction files must use parameter-driven conditional sections rather than hard-coded implementation choices.
- **Runtime Decision Deferral**: Environment setup modes determined by ENV_MODE parameter at script execution time, not at instruction creation time.
- **Mode-Specific Documentation**: Each environment mode generates complete, standalone documentation appropriate for that specific setup.

## Dependencies and Relationships

- **Depends On:** techContext.md, systemPatterns.md, projectbrief.md
- **Required By:** progress.md, all prompt and instruction file creation
- **Why This Order:** activeContext.md must reflect current AI Agent Framework understanding before implementing new conditional prompt patterns
- **Impact Analysis:** Changes to prompt file protocols affect all AI agents (Cline AI, Codex CLI, VS Code Copilot) and their collaborative workflows

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as work progresses.**  
> **Do not proceed with new work or changes until this file accurately reflects the current state and priorities.**  
> **Update this file immediately upon any change in work focus, plans, or decisions.**

## AI Agent Instructions

This project supports three AI agents with specific entry points:
- **Cline AI** → `.clinerules/main-rules.md` (Cline AI's primary instruction file)
- **Codex CLI** → `AGENTS.md` (Codex CLI's primary instruction file)
- **VS Code Copilot** → `.github/copilot-instructions.md` (VS Code Copilot's primary instruction file)

**See [.clinerules/process-evolution.md](../.clinerules/process-evolution.md), [.clinerules/verification.md](../.clinerules/verification.md), and [.clinerules/learning-journal.md](../.clinerules/learning-journal.md) for required protocols and self-regulation guidance.**

---
