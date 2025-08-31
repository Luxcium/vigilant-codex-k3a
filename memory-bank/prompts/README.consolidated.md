

## Purpose

Prompt files (`.prompt.md`) are executable templates that:

- Provide complete standalone chat prompts you can invoke manually
- Execute specific tasks when called (via `/promptname` or command palette)
- Include variables for customization and reusability
- Use tools to perform actions like file creation, code generation, or terminal commands

## Categories

### Template Management & AI Framework

- `template-manager.prompt.md` — Master template manager for all prompt/instruction file creation
- `ai-template-manager.prompt.md` — Specialized template manager for AI instruction/prompt generation
- `instruction-generator.prompt.md` — Generate `.instructions.md` files with validations
- `instruction-creation.prompt.md` — Create `.instructions.md` with QA-driven approach
- `instruction-creation-v2.prompt.md` — Enhanced instruction creation with validations
- `make-prompts.prompt.md` — Guardrails and validation for prompt files

### Environment & Infrastructure

- `codex-universal-environment.prompt.md` — Codex Universal Docker environment setup
- `python-environment-setup.prompt.md` — Conditional Python setup with runtime selection
- `docker-generator.prompt.md` — Parameterized Docker generator
- `docker-consolidated-template.prompt.md` — Consolidated Docker workflow template
- `docker-exotic-generator.prompt.md` — Advanced Docker configurations
- `docker-modular-workflow.prompt.md` — Modular Docker build/run workflow

### Development Components & Code Generation

- `typescript-component.prompt.md` — Generate TypeScript components with standards
- `web-project-structure.prompt.md` — Scaffold Next.js + TypeScript web projects
- `vit-implementation.prompt.md` — Vision Transformer implementation workflow

### Documentation & Memory Bank

- `memory-bank-update.prompt.md` — Update memory bank documentation and cross-refs
- `dependency-management.prompt.md` — Update and track dependencies
- `self-documentation.prompt.md` — Append self-documentation entries
- `tsdoc-typedoc.prompt.md` — Generate TypeDoc docs and API references
- `readme-update-review.prompt.md` — Validate and update README files

### Testing & Validation

- `validation-debugging-checklist.prompt.md` — Validation and debugging workflow
- `edge-devtools-debugging.prompt.md` — Edge DevTools debugging setup
- `test-prompt.prompt.md` — Verify prompt file execution
- `modern-eslint-flat-config.prompt.md` — ESLint v9+ flat config for TypeScript
- `setup-eslint-flat-config.prompt.md` — Install and scaffold ESLint v9+ flat config

### Web Standards & Meta Tags

- `theme-ui-meta.prompt.md` — Theming meta tags for light/dark
- `general-icon-link-tags.prompt.md` — Cross-platform icon tags
- `seo-meta-tags.prompt.md` — SEO meta tags
- `x-cards.prompt.md` — X/Twitter cards meta tags

### Git & Commit Standards

- `gitmoji-complete-list.prompt.md` — Gitmoji reference
- `commit-examples.prompt.md` — Commit message examples
- `breaking-changes.prompt.md` — Breaking changes guidance
- `git-hooks-automation.prompt.md` — Git hooks and automation

## Usage

### Manual Invocation

1. Open VS Code Copilot Chat
2. Type `/promptname` or use Command Palette
3. Follow any variable prompts
4. Review and approve tool actions

### Variables

Many prompts include `${input:variable}` placeholders that will prompt for values when invoked.

## Validation

```bash
# Count prompt files
find ./memory-bank/prompts -type f -name '*.prompt.md' | wc -l

# Check for lint issues
./scripts/check-markdown.sh memory-bank/prompts/ || true
```
