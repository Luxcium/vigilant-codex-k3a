

## Purpose

- Provide concise, accurate descriptions for each `.prompt.md`.
- Keep the list synchronized, replacing manually curated drifted lists.
- Ensure lint-clean formatting and discoverability.

## Inventory (by category)

Template Management & AI Framework

- `template-manager.prompt.md`: Master template manager for generating prompts/instructions.
- `ai-template-manager.prompt.md`: Template manager specialized for AI instruction/prompt generation.
- `instruction-generator.prompt.md`: Generate `.instructions.md` with validations.
- `instruction-creation.prompt.md`: Create `.instructions.md` with a QA-driven approach.
- `instruction-creation-v2.prompt.md`: Enhanced instruction creation with validations.
- `make-prompts.prompt.md`: Guardrails and validation for prompt files.

Environment & Infrastructure

- `codex-universal-environment.prompt.md`: Codex Universal Docker environment setup.
- `python-environment-setup.prompt.md`: Conditional Python setup with runtime selection.
- `docker-generator.prompt.md`: Parameterized Docker generator.
- `docker-consolidated-template.prompt.md`: Consolidated Docker workflow template.
- `docker-exotic-generator.prompt.md`: Advanced Docker configurations.
- `docker-modular-workflow.prompt.md`: Modular Docker build/run workflow.

Development Components & Code Generation

- `typescript-component.prompt.md`: Generate TypeScript components with standards.
- `web-project-structure.prompt.md`: Scaffold Next.js + TypeScript web projects.
- `vit-implementation.prompt.md`: Vision Transformer implementation workflow.

Notebook Development & Data Science

- `notebook-development-workflow.prompt.md`: Notebook development automation.

Documentation & Memory Bank

- `memory-bank-update.prompt.md`: Update memory bank documentation and cross-refs.
- `dependency-management.prompt.md`: Update and track dependencies.
- `self-documentation.prompt.md`: Append self-documentation entries.
- `tsdoc-typedoc.prompt.md`: Generate TypeDoc docs and API references.
- `readme-update-review.prompt.md`: Validate and update README files.

Project Automation & Scripting

- `script-generator.prompt.md`: Create resilient automation scripts.
- `iterative-selfautonomus-ai-agent.prompt.md`: Iterative autonomous agent workflow.
- `launch-browser-monitor.prompt.md`: Launch browser error monitoring.

Web Standards & Meta Tags

- `theme-ui-meta.prompt.md`: Theming meta tags for light/dark.
- `general-icon-link-tags.prompt.md`: Cross-platform icon tags.
- `seo-meta-tags.prompt.md`: SEO meta tags.
- `x-cards.prompt.md`: X/Twitter cards meta tags.

Testing & Validation

- `validation-debugging-checklist.prompt.md`: Validation and debugging workflow.
- `edge-devtools-debugging.prompt.md`: Edge DevTools debugging setup.
- `test-prompt.prompt.md`: Verify prompt file execution.
- `modern-eslint-flat-config.prompt.md`: ESLint v9+ flat config for TypeScript.
- `setup-eslint-flat-config.prompt.md`: Install and scaffold ESLint v9+ flat config.

Git & Commit Standards

- `gitmoji-complete-list.prompt.md`: Gitmoji reference.
- `commit-examples.prompt.md`: Commit message examples.
- `breaking-changes.prompt.md`: Breaking changes guidance.
- `git-hooks-automation.prompt.md`: Git hooks and automation.

Miscellaneous

- `file-organization.prompt.md`: File organization guidance.

## Detected Inconsistencies

- Prior README lists a count of 38 prompt files—validate actual count and update.
- Ensure each listed file exists and descriptions match file headers inside the prompt files.

## Validation Commands (bash)

```bash
# Count prompt files
find ./memory-bank/prompts -type f -name '*.prompt.md' | wc -l

# Diff against this inventory (quick check)
ls -1 ./memory-bank/prompts | grep '\.prompt\.md$' | sort
```
