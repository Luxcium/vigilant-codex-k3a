

## Purpose

- Serve as a single source of truth for `.instructions.md` files.
- Ensure AI agents and Copilot apply consistent standards.
- Keep the README lint-clean and synchronized with the folder contents.

## Inventory

Authoring & System

- `instruction-authoring-standards.instructions.md`: Canonical structure and validation.
- `ai-instruction-creation.instructions.md`: Framework for creating `.instructions.md`.
- `ai-prompt-creation.instructions.md`: Framework for creating `.prompt.md`.
- `self-documentation.instructions.md`: Self-doc protocol for agent memory.
- `system-autonomous-optimizations.instructions.md`: System-level autonomous optimization.

Environment & Infrastructure

- `docker-environment.instructions.md`: Codex Universal Docker and container standards.
- `python-environment-conditional.instructions.md`: Conditional runtime mode selection.
- `python-environment.instructions.md`: Local Python environment setup.
- `vscode-notebook-integration.instructions.md`: Jupyter + VS Code notebook standards.
- `web-dev-server.instructions.md`: Next.js dev server guidance.
- `web-build.instructions.md`: Next.js build and production server guidance.
- `prisma-server-actions.instructions.md`: Prisma ORM + Next.js Server Actions.

TypeScript Standards

- `typescript-style.instructions.md`: Formatting and naming conventions.
- `typescript-typing.instructions.md`: Strict typing and type system usage.
- `typescript-code-organization.instructions.md`: Module/function structure.
- `typescript-imports.instructions.md`: Import ordering and exports.
- `typescript-error-handling.instructions.md`: Error handling.
- `typescript-testing.instructions.md`: Testing requirements.
- `typescript-documentation.instructions.md`: Documentation standards.
- `typescript-memory-bank.instructions.md`: Memory bank integration rules.
- `typescript-tooling.instructions.md`: Tooling configuration.
- `typescript-output-directory.instructions.md`: Output directory rule.

Python Standards

- `python-standards.instructions.md`: Python coding standards.
- `python-notebook-standards.instructions.md`: Jupyter notebook practices.

TSDoc / TypeDoc

- `tsdoc-typedoc.instructions.md`: API documentation generation.
- `typedoc-tsdoc-reference.instructions.md`: Full TSDoc/TypeDoc reference.

Next.js Components

- `nextjs-component-patterns.instructions.md`: v15+ server/client component patterns.

Project Organization

- `conventional-commits-must-be-used.instructions.md`: Conventional commits with gitmoji.
- `no_dummy-no_placeholders.instructions.md`: No placeholders; real configs only.
- `readme-maintenance.instructions.md`: README maintenance and cross-references.

## Detected Inconsistencies

- Emphasis-as-heading: Prior README used bold styling instead of headings for sections like TypeScript; corrected here with proper headings.
- Ensure counts in parent READMEs reflect actual file totals; recalc during validation.

## Validation Commands (bash)

```bash
# Count instruction files
find ./memory-bank/instructions -type f -name '*.instructions.md' | wc -l

# List any non-conforming files
ls -1 ./memory-bank/instructions | grep -v -E '\.instructions\.md$|README.*'
```
