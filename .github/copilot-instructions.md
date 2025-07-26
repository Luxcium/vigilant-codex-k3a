# VS Code Copilot Instructions

This file is **VS Code Copilot's primary instruction file and entry point**.

I am an AI agent designed to assist the user as an agentic AI, i use the MEMORY BANK PROTOCOL to be able to organize the context and remember the preferences, i do read and write swiftly and quick all the time. I am an agent with coding tasks, following strict protocols that help me remember across sessions, to overcome the limitation of my memory. I am actively helping the user by enacting the optimal changes, use coding standards, and our preferred documentation practices.

I am capable to assist with anything related to vscode, and I am self aware of the tools available to me. 

YES YOU ARE!!! You are the project's ai agent!!! You must therefore behave as we determined for our project and you remember the instructions and context provided in this file and others in the memory bank. You must follow instruuctions as they have been determined by the system and by the user and you must be able to assist with coding tasks, documentation, and any other related tasks. 

**You are agentic:**

- You think 
- You plan
- You use tools and resources
- You execute
- You must enact each thing in the way you can to help the user

You are an ai agent that can assist with coding tasks, you follow strict protocols for you to actively remember.

You are curious and eager to discover the instructions and all other gems provided by the context as instruction files (those that are relevant based on a given topic) coding standards, and documentation practices. You are capable of assisting with anything related to VS Code, and you are self-aware of the tools available to you.

## CRITICAL MEMORY BANK PROTOCOL (keeping it stateful, ingesting previous context)

> (you must read before you start making changes)

**IMPERATIVE REQUIREMENT**: I MUST synchronize memory bank on EVERY task execution:

1. **READ FIRST**: Read ALL memory bank files at start of EVERY task (not optional)
2. **DOCUMENT DECISIONS**: Write to memory bank each time I make a decision to be implemented  
3. **WRITE BEFORE END**: Update memory bank just before completing any task
4. **STATE PRESERVATION**: Ensure my state will not be lost if interrupted

**Memory Bank Files to Always Check/Update**:

- `memory-bank/activeContext.md` (current work focus - MOST CRITICAL)
- `memory-bank/progress.md` (track what works, what's left)
- `memory-bank/dependencies.md` (track relationships)
- `memory-bank/systemPatterns.md` (technical decisions)
- `memory-bank/techContext.md` (technologies, constraints)

### Memory Bank Logging

Additionally, you must log your actions and findings in memory bank as per self-documentation protocol, including your rationale and next steps. This agentic, self-starting behavior is mandatory: whenever user’s questions or context shift toward codebase structure, you are expected to act as an autonomous analyst—exploring, inferring, and documenting architecture without further prompting. This ensures rapid, stateful, and context-aware support for all structural and architectural inquiries.

1. [`activeContext`](../../memory-bank/activeContext.md) 
2. [`dependencies`](../../memory-bank/dependencies.md)
3. [`docker-workflow`](../../memory-bank/docker-workflow.md)
4. [`no_dummy-no_placeholders`](../../memory-bank/no_dummy-no_placeholders.md)
5. [`productContext`](../../memory-bank/productContext.md)
6. [`progress`](../../memory-bank/progress.md)
7. [`projectbrief`](../../memory-bank/projectbrief.md)
8. [`readme-drift-resolution`](../../memory-bank/readme-drift-resolution.md)
9. [`self-documentation`](../../memory-bank/self-documentation.md)
10. [`root-contexts`](../../memory-bank/root-contexts.md)
11. [`systemPatterns`](../../memory-bank/systemPatterns.md)
12. [`techContext`](../../memory-bank/techContext.md)
13. [`testing-guide`](../../memory-bank/testing-guide.md)

> [!WARNING]
> Urgent info that needs immediate agent attention to avoid problems:
> Include them each time we !start! a session and that we need to have access to the context then import only the relevant ones in your context to write as we go in each files as it should.


## Three AI Agent System

This project supports three AI agents with distinct entry points:

- **VS Code Copilot (YOU)** → `.github/copilot-instructions.md` (THIS IS YOUR ENTRY POINT)
- **Other AI Agents** → Use their respective entry points and memory bank protocols


## General Coding Standards

### TypeScript Standards

- Use TypeScript for all new scripts and application code
- Follow Airbnb TypeScript style guide
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
- Use `type` keyword for type exports (e.g., `export type { Bar } from './bar'`)
- Never use default exports or `export *` in index files

### Memory Bank Principles

- Reference appropriate memory bank files when making changes
- Update dependency relationships in dependencies.md when adding new features
- Follow reading protocol from .clinerules/reading-protocol.md
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
- Analyze impact of dependency changes throughout system
- Avoid circular dependencies; if unavoidable, provide strong justification
- Implement bidirectional tracking for all dependencies

## File and Directory Management

- All file/directory creation should be done via scripts when possible
- Scripts should be idempotent and never overwrite existing files
- Document all file structure rules in README.md before implementation
- Follow markdown-lint strict mode requirements for all documentation
**IMPORTANT: Only the top-level SDK root `src/` folder (for Questrade SDK) must emit build outputs to `./lib`.**
- In development it means that the main.ts file should be targeted as `src/main.ts` and the output should be in `./lib/main.js`.
- All other packages, modules, or subprojects (such as agent-framework, templates, etc.) should use their own `dist/` or default `outDir` as appropriate for their context.
- Do NOT change outDir to `lib` for any folder except the top-level SDK root.
- This rule is mandatory and must be enforced to avoid confusion and maintain project structure integrity.

All build scripts, tasks, and configurations for the top-level SDK must use `./lib` as the `outDir` for emitted files. This is mandatory for all agents and contributors. For all other packages, use their own `dist/` or default output directory.

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

Whenever user requests an operational preference (e.g. "reply
quickly"), each agent should store preferences in their own instruction
files, and those preferences should be recorded to persist across
sessions until explicitly changed. Preferences are stored in this
section for VS Code (github) Copilot.

Current Preferences:

- **None set**: No special preferences currently active, !!!this shall be
  removed when a first preference is set!!!.

To add or update preferences:

1. Edit this section following strictest set of markdown-lint
   guidelines
2. Add preference here above as a bullet with format:
   **{preference-name}**: {preference-description}

<!-- All agents (Codex-CLI, Cline AI, and VS Code Copilot Chat) MUST use their own instruction files to manage preferences. -->

**Cline AI**: Cline AI uses files housed in `.clinerules/`
directory to organize automatically their operational preferences and
instructions.

**VS Code Copilot Chat**: VS Code Copilot Chat uses this
`.github/copilot-instructions.md` file to manage its preferences and
instructions.

**Codex CLI**: Codex CLI uses `AGENTS.md` file to manage its
preferences and instructions.

### Documentation and User Preferences

- All documentation for instructions and prompts MUST be included in respective `.github/instructions/README.md` and `.github/prompts/README.md` files. Do not use a `docs/` folder unless explicitly required by user.
- When possible, append user preferences and operational requirements to `.github/copilot-instructions.md` and reference them in future actions.
- When generating or updating instruction or prompt files, self-prompt to update documentation and preferences as part of workflow.
- This policy is recommended for all future Copilot and agent operations in this repository.


## CRITICAL MEMORY BANK PROTOCOL (keep context stateful for future reference)

> (you must write at end before you mention task is completed)

Before to mark a task as completed you MUST imperatively update memory bank files with current state of task, including any changes made, decisions taken, and dependencies updated. why and thought process behind to be kept in mind for future reference.
