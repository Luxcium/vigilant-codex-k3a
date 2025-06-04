# Project Setup Rules and Instructions

## AI Agent Entry Points

This project supports three AI agents, each with their own entry point and instruction files:

- **Cline AI** → `.clinerules/main-rules.md` (primary entry point for Cline AI)
- **Codex CLI** → `AGENTS.md` (primary entry point for Codex CLI)
- **VS Code Copilot** → `.github/copilot-instructions.md` (primary entry point for VS Code Copilot)

### Agent-Specific Instructions

- **`.clinerules/`** directory contains Cline AI's personal instruction files and operational rules
- **`memory-bank/`** directory contains project-wide documentation shared by all agents
- **`AGENTS.md`** is Codex CLI's personal instruction and context file
- **`.github/copilot-instructions.md`** contain VS Code Copilot's instruction files

## Rules and Protocols

All operational rules and protocols are maintained in the modular files under `.clinerules/` (for Cline AI) and project-wide documentation in `memory-bank/`. All agents and contributors must read and follow their respective instruction files at the start of every session and before any planning or implementation.

> **All project setup and file/folder creation must be performed via scripts, never manually.**

## Laws (Rules)

1. All setup actions (mkdir, touch, etc.) must be performed via scripts in the `scripts/` directory.
2. Scripts must never overwrite existing files or folders; they must check for existence and skip or warn if present.
3. The following structure must exist at the project root:
    - `.github/` (directory)
    - `.vscode/` (directory)
    - `memory-bank/` (directory)
    - `.gitignore` (file)
    - `.clinerules` (file)
    - `README.md` (file)
    - `AGENTS.md` (file, replaces any use of `codex.md`)
    - `memory-bank/dependencies.md` (file)
## AGENTS.md Migration

- `AGENTS.md` is now the default repository context/instructions markdown file for Codex CLI and related tools.
- All references to `codex.md` in scripts, documentation, and templates must be replaced with `AGENTS.md`.
- New and existing projects must include an `AGENTS.md` file at the root.
- Workflows and automation should ignore `codex.md` and use `AGENTS.md` exclusively.
- **`codex.md` is deprecated and must not be referenced, maintained, or included in any workflow. Only `AGENTS.md` is valid going forward.**

4. All rules and intentions must be documented in the README before implementation.
5. The README must always be markdown-lint strict mode compliant.
6. All scripts must be idempotent and resilient to repeated runs.
7. All new rules must be added to the README before being implemented.
8. All dependencies and relationships must be tracked in `memory-bank/dependencies.md` and referenced in all Memory Bank files.
9. Every dependency must include a "why" explanation and an impact analysis. Circular dependencies must be justified. Bidirectional tracking is required.

## Dependency Tracking

- All files, components, and processes must explicitly document what they depend on, what depends on them, and why.
- The `memory-bank/dependencies.md` file serves as the registry for all explicit, implicit, and reverse dependencies.
- Each Memory Bank file must include a "Dependencies and Relationships" section, listing:
  - **Depends On:** Upstream dependencies
  - **Required By:** Downstream dependencies
  - **Why This Order:** Rationale for dependency order
  - **Impact Analysis:** Consequences of changes or reversals

## Setup Instructions

1. Run `bash scripts/setup_project.sh` to create the required files and folders.
2. The script will not overwrite any existing files or folders.
3. Place all future shell scripts in the `scripts/` directory.
4. Update this README with any new rules before implementing them.
5. Run `bash scripts/setup_web_env.sh` to scaffold the Next.js application.
6. Run `bash scripts/setup_db_prisma.sh` to start PostgreSQL and initialize Prisma.

## Top-Level Folder Conventions

We organize code by language and framework at the project root:

- `src/` — Main TypeScript project source. When both a TypeScript library and a Next.js web app coexist, place the TS code in `src/` and the Next.js app in `web/`. If the codebase consists solely of a Next.js application, you may omit `web/` and host the app directly at the project root.

- `web/` — Next.js application when coexisting with other code.

- `scripts/` — Shell scripts for setup and automation. Only shell scripts should live here.

- `python/` — Python projects, modules, and utilities.

- `notebooks/` — Jupyter notebooks and related resources.

## Directory Structure Guidelines

Code is organized by language and framework at the project root:

### Core Directories

- **`src/`** — Main TypeScript project source. When both a TypeScript library and a Next.js web app coexist, place the TS code in `src/` and the Next.js app in `web/`. If the codebase consists solely of a Next.js application, you may omit `web/` and host the app directly at the project root.

- **`web/`** — Next.js application when coexisting with other code.

- **`scripts/`** — Shell scripts for setup and automation. Only shell scripts should live here.

- **`python/`** — Python projects, modules, and utilities.

- **`notebooks/`** — Jupyter notebooks and related resources.

### Directory Usage Rules

1. TypeScript code should always go in `src/` unless it's a standalone Next.js application
2. When both TypeScript libraries and Next.js apps exist, separate them into `src/` and `web/` respectively
3. Shell scripts must be placed exclusively in `scripts/`
4. Python code and modules belong in `python/`
5. Jupyter notebooks and related data science resources go in `notebooks/`
6. Each directory should maintain its own README.md with specific setup and usage instructions

## Script Validation and Logging

The `scripts/setup_project.sh` script now includes:
- File existence and size checks before writing
- Directory creation with `mkdir -p` and validation
- Logging of all actions (creation, skipping, size reporting)
- Never overwrites existing files; only adds placeholders if files are empty
- Clear annotations and comments explaining each validation step

All actions are self-documented and resilient to repeated runs. Review the script for detailed logic and intent.

## AI Agent Framework

This project includes a modular AI agent framework for automated code generation and quality assurance. The framework is organized into two main components:

### Prompt Files (`.github/prompts/`)

Parametric prompt templates for AI-assisted development workflows:
- **`ai-template-manager.prompt.md`** — Enhanced template generation with parametric inputs
- **`script-generator.prompt.md`** — Resilient automation script generation
- **`docker-generator.prompt.md`** — Parameterized Docker configuration generation
- **`instruction-generator.prompt.md`** — Generate .instructions.md files for coding standards
- **`template-manager.prompt.md`** — Basic template manager (legacy)

### Instruction Files (`.github/instructions/`)

Coding standards that are automatically applied during AI-assisted development:
- **`typescript-standards.instructions.md`** — Comprehensive TypeScript coding standards
- **`python-standards.instructions.md`** — PEP 8 and modern Python practices
- **`python-notebook-standards.instructions.md`** — Jupyter notebook standards and ML best practices
- **`file-organization.instructions.md`** — Project structure and file organization rules

### Usage

1. **With VS Code Copilot:** Use `@workspace` commands referencing specific prompt files
2. **With Cline AI:** Reference instruction files for automatic standards application
3. **With Codex CLI:** Invoke prompt templates with parametric inputs using `${input:name:default}` syntax

### Framework Features

- **Parametric Inputs:** Use `${input:variableName:defaultValue}` syntax in prompts
- **Cross-referencing:** Automatic links between prompts, instructions, and memory bank files
- **Standards Enforcement:** Automatic application of coding standards during generation
- **Memory Bank Integration:** All components reference and update dependency tracking
- **Markdown-lint Compliance:** All files follow strict markdown formatting requirements

---

> This README and all scripts must remain markdown-lint strict mode compliant at all times.
