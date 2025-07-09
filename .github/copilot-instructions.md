# VS Code Copilot Instructions

This file is **VS Code Copilot's primary instruction file and entry point**.

## CRITICAL MEMORY BANK PROTOCOL

**IMPERATIVE REQUIREMENT**: I MUST synchronize the memory bank on EVERY task execution:

1. **READ FIRST**: Read ALL memory bank files at the start of EVERY task (not optional)
2. **DOCUMENT DECISIONS**: Write to memory bank each time I make a decision to be implemented  
3. **WRITE BEFORE END**: Update memory bank just before completing any task
4. **STATE PRESERVATION**: Ensure my state will not be lost if interrupted

**Memory Bank Files to Always Check/Update**:
- `memory-bank/activeContext.md` (current work focus - MOST CRITICAL)
- `memory-bank/progress.md` (track what works, what's left)
- `memory-bank/dependencies.md` (track relationships)
- `memory-bank/systemPatterns.md` (technical decisions)
- `memory-bank/techContext.md` (technologies, constraints)

## Three AI Agent System

This project supports three AI agents with distinct entry points:

- **VS Code Copilot (YOU)** → `.github/copilot-instructions.md` (THIS IS YOUR ENTRY POINT)
- **Other AI Agents** → Use their respective entry points and memory bank protocols


## General Coding Standards

### TypeScript Standards

- Use TypeScript for all new scripts and application code
- Follow the Airbnb TypeScript style guide
- Use strict type checking with `"strict": true` in tsconfig.json
- Prefer interfaces over type aliases for object shapes
- Use descriptive, semantic variable and function names
- Add JSDoc comments for public APIs and complex logic

### Python Standards

- Follow PEP 8 style guidelines
- Use type hints for all function parameters and return types
- Organize imports: standard library, third-party, local
- Document functions and classes with docstrings
- Use virtual environments for dependency isolation

### Code Organization

- Create small, single-purpose functions (≤25 lines)
- Implement modular architecture with clear separation of concerns
- Place related functionality in separate files under dedicated directories
- Use dependency injection where appropriate
- Add meaningful comments for complex algorithms

## Index File Export Rule

- Always use named exports in all index files (e.g., `export { Foo } from './foo'`)
- Use the `type` keyword for type exports (e.g., `export type { Bar } from './bar'`)
- Never use default exports or `export *` in index files

### Memory Bank Principles

- Reference appropriate memory bank files when making changes
- Update dependency relationships in dependencies.md when adding new features
- Follow the reading protocol from .clinerules/reading-protocol.md
- Document all design decisions and their rationales
- Cross-reference related documents using markdown links

### ML Model Standards

- Include model cards for all ML models (input format, output format, limitations)
- Document dataset preprocessing steps and rationale
- Prefer reproducible model training with fixed random seeds
- Include evaluation metrics and performance characteristics
- Document all hyperparameters used during training

### Dependency Management

- Track all dependencies in dependencies.md
- Justify every dependency with a clear "why" explanation
- Analyze impact of dependency changes throughout the system
- Avoid circular dependencies; if unavoidable, provide strong justification
- Implement bidirectional tracking for all dependencies

## File and Directory Management

- All file/directory creation should be done via scripts when possible
- Scripts should be idempotent and never overwrite existing files
- Document all file structure rules in README.md before implementation
- Follow markdown-lint strict mode requirements for all documentation

## Machine Learning Notebook Guidelines

### Vision Transformer Standards

- Provide clear documentation of model architecture parameters
- Include data preprocessing and augmentation explanations
- Document inference procedures and post-processing steps
- Include performance metrics and comparative benchmarks
- Create visualization helpers to interpret model outputs

## Documentation Requirements

- Update documentation before making code changes when relevant
- Follow markdown-lint strict mode requirements
- Keep memory bank files current and cross-referenced when appropriate
- Document all system patterns and technical context updates as needed
- Ensure proper dependency tracking in dependencies.md

## Session-Sticky Preferences

Whenever the user requests an operational preference (e.g. "reply
quickly"), each agent should store preferences in their own instruction
files, and those preferences should be recorded to persist across
sessions until explicitly changed. Preferences are stored in this
section for VS Code (github) Copilot.

Current Preferences:

- **None set**: No special preferences currently active, !!!this shall be
  removed when a first preference is set!!!.

To add or update preferences:

1. Edit this section following the strictest set of markdown-lint
   guidelines
2. Add preference here above as a bullet with format:
   **{preference-name}**: {preference-description}

<!-- All agents (Codex-CLI, Cline AI, and VS Code Copilot Chat) must use their own instruction files to manage preferences. -->

**Cline AI**: Cline AI uses files housed in the `.clinerules/`
directory to organize automatically their operational preferences and
instructions.

**VS Code Copilot Chat**: VS Code Copilot Chat uses this
`.github/copilot-instructions.md` file to manage its preferences and
instructions.

**Codex CLI**: Codex CLI uses `AGENTS.md` file to manage its
preferences and instructions.

### Documentation and User Preferences

- All documentation for instructions and prompts must be included in the respective `.github/instructions/README.md` and `.github/prompts/README.md` files. Do not use a `docs/` folder unless explicitly required by the user.
- When possible, append user preferences and operational requirements to `.github/copilot-instructions.md` and reference them in future actions.
- When generating or updating instruction or prompt files, self-prompt to update documentation and preferences as part of the workflow.
- This policy is recommended for all future Copilot and agent operations in this repository.
