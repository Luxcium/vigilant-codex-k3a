# GitHub Copilot Prompts

This directory contains reusable prompt files that can be invoked by VS Code Copilot to execute specific workflows and tasks. Each prompt file represents a complete, standalone workflow that can be triggered manually for automated development operations across the polyvalent workspace.

## Quick Reference: Meta-Configuration & Manifest Matrix

For a one-page summary of all manifest and meta configuration goals (PWA, iOS, Windows, Chrome Extension, etc.), see:

**[when-to-use-what-matrix.instructions.md](../instructions/when-to-use-what-matrix.instructions.md)** — This matrix provides authoritative mapping of integration goals to configuration files and sources. For detailed implementation standards, see the corresponding instruction files in `memory-bank/instructions/README.md`.

This README focuses on workflow automation and validation prompts. For meta-configuration and manifest standards, always start with the matrix above, then consult the detailed instructions.

## What are Prompt Files?

Prompt files (`.prompt.md`) are executable templates that:

- Provide complete standalone chat prompts you can invoke manually
- Execute specific tasks when called (via `/promptname` or command palette)
- Include variables for customization and reusability
- Use tools to perform actions like file creation, code generation, or terminal commands

## Available Prompts (35 Files)

> **Note:** This list must be kept in sync with the actual prompt files in this directory. Add new prompts and update descriptions as needed.

### Template Management & AI Framework

- **[template-manager.prompt.md](./template-manager.prompt.md)** — Master template manager for all prompt/instruction file creation, featuring a decision matrix, workflow, and intelligent file management for the entire project.
- **[ai-template-manager.prompt.md](./ai-template-manager.prompt.md)** — Specialized template manager for generating prompt/instruction files with strict markdown-lint compliance and advanced AI agent collaboration features.
- **[instruction-generator.prompt.md](./instruction-generator.prompt.md)** — Generate `.instructions.md` files with a focus on structure, standards, and detailed validation templates for coding requirements.
- **[instruction-creation.prompt.md](./instruction-creation.prompt.md)** — Create `.instructions.md` files using a process-oriented, QA-driven approach, emphasizing validation, error prevention, and best practices.
- **[instruction-creation-v2.prompt.md](./instruction-creation-v2.prompt.md)** — Enhanced instruction file creation with advanced validation.

### Environment & Infrastructure

- **[codex-universal-environment.prompt.md](./codex-universal-environment.prompt.md)** — Codex Universal Docker environment generation and management.
- **[python-environment-setup.prompt.md](./python-environment-setup.prompt.md)** — Conditional Python environment setup with runtime mode selection.
- **[docker-generator.prompt.md](./docker-generator.prompt.md)** — Parameterized Docker configuration generator.
- **[docker-consolidated-template.prompt.md](./docker-consolidated-template.prompt.md)** — Consolidated Docker workflow template (four-phase approach).
- **[docker-exotic-generator.prompt.md](./docker-exotic-generator.prompt.md)** — Advanced Docker config for complex/exotic deployments.
- **[docker-modular-workflow.prompt.md](./docker-modular-workflow.prompt.md)** — Modular Docker build/run workflow generator.

### Development Components & Code Generation

- **[typescript-component.prompt.md](./typescript-component.prompt.md)** — Generate TypeScript components with strict standards.
- **[web-project-structure.prompt.md](./web-project-structure.prompt.md)** — Generate complete web project structure (Next.js, TypeScript).
- **[vit-implementation.prompt.md](./vit-implementation.prompt.md)** — Vision Transformer (ViT) implementation for ML workflows.

### Notebook Development & Data Science

- **[notebook-development-workflow.prompt.md](./notebook-development-workflow.prompt.md)** — Notebook development workflow automation with VS Code integration.

### Documentation & Memory Bank Management

- **[memory-bank-update.prompt.md](./memory-bank-update.prompt.md)** — Update memory bank documentation and cross-references.
- **[dependency-management.prompt.md](./dependency-management.prompt.md)** — Track and update project dependencies.
- **[self-documentation.prompt.md](./self-documentation.prompt.md)** — Execute and append self-documentation entries.
- **[tsdoc-typedoc.prompt.md](./tsdoc-typedoc.prompt.md)** — Generate TSDoc/TypeDoc documentation and API references.
- **[readme-update-review.prompt.md](./readme-update-review.prompt.md)** — Review and update README files for accuracy and completeness.

### Project Automation & Scripting

- **[script-generator.prompt.md](./script-generator.prompt.md)** — Create resilient, reusable automation scripts.
- **[iterative-selfautonomus-ai-agent.prompt.md](./iterative-selfautonomus-ai-agent.prompt.md)** — Iterative, self-autonomous agent workflow for recursive tasks.
- **[launch-browser-monitor.prompt.md](./launch-browser-monitor.prompt.md)** — Launch and monitor browser error workflows.

### Web Standards & Meta Tags

- **[theme-ui-meta.prompt.md](./theme-ui-meta.prompt.md)** — Add browser-UI theming meta tags for light/dark mode.
- **[general-icon-link-tags.prompt.md](./general-icon-link-tags.prompt.md)** — Add comprehensive icon link tags for cross-platform support.
- **[seo-meta-tags.prompt.md](./seo-meta-tags.prompt.md)** — Add essential SEO meta tags for discoverability.
- **[x-cards.prompt.md](./x-cards.prompt.md)** — Add/update X Cards (Twitter Cards) meta tags for social previews.

### Testing & Validation

- **[validation-debugging-checklist.prompt.md](./validation-debugging-checklist.prompt.md)** — Comprehensive validation and debugging workflow for web apps.
- **[edge-devtools-debugging.prompt.md](./edge-devtools-debugging.prompt.md)** — Automated Edge DevTools configuration and debugging setup.
- **[test-prompt.prompt.md](./test-prompt.prompt.md)** — Test prompt to verify prompt file execution system.

### Git & Commit Standards

- **[gitmoji-complete-list.prompt.md](./gitmoji-complete-list.prompt.md)** — Complete gitmoji reference for conventional commits.
- **[commit-examples.prompt.md](./commit-examples.prompt.md)** — Comprehensive commit message examples by category.
- **[breaking-changes.prompt.md](./breaking-changes.prompt.md)** — Detailed breaking changes guidance and best practices.
- **[git-hooks-automation.prompt.md](./git-hooks-automation.prompt.md)** — Git hooks, automation tools, and CI/CD integration.

### Miscellaneous

- **[file-organization.prompt.md](./file-organization.prompt.md)** — Project file organization and structure guidance.

---

_This list is auto-curated. If you add a new prompt, update this section to keep the documentation accurate and complete._

## How to Use Prompts

### Manual Invocation

1. Open VS Code Copilot Chat
2. Type `/promptname` where `promptname` is the filename without extension
3. Follow the prompts for variable inputs
4. Review and approve the generated workflow

### Command Palette

1. Open Command Palette (`Cmd/Ctrl + Shift + P`)
2. Search for "Copilot: Run Prompt"
3. Select the desired prompt file
4. Provide required inputs when prompted

## Prompt File Structure

All prompt files follow this standard structure:

```markdown
---
mode: 'agent' | 'edit' | 'ask'
tools: ['filesystem', 'terminal', 'codebase', 'vscodeAPI', etc.]
description: 'Brief description of what this prompt does'
---

# Prompt Title

Your goal is to [specific objective].

## Context

- Variable definitions
- Workspace information
- User inputs

## Requirements

- Specific technical requirements
- Quality standards
- Compliance requirements

## Process

1. Step-by-step workflow
2. Validation checkpoints
3. Error handling

## Success Criteria

- Measurable outcomes
- Quality validation
- Completion verification
```

## Variable Usage

Prompts support these variable types:

- `${workspaceFolder}` - Current workspace root
- `${file}` - Current file path
- `${selection}` - Selected text
- `${input:varName:description}` - User input prompts

## Prompt Categories by Purpose

### Infrastructure Automation

- **Environment Setup**: codex-universal-environment, python-environment-setup
- **Docker Workflows**: docker-generator, docker-consolidated-template, docker-exotic-generator, docker-modular-workflow
- **Project Scaffolding**: web-project-structure, script-generator

### Development Workflows

- **Component Generation**: typescript-component, vit-implementation
- **Documentation**: tsdoc-typedoc, memory-bank-update, dependency-management
- **Notebook Development**: notebook-development-workflow

### Web Standards Implementation

- **Meta Tags**: theme-ui-meta, seo-meta-tags, x-cards
- **Icons & Favicons**: general-icon-link-tags
- **Validation**: validation-debugging-checklist, edge-devtools-debugging

### AI Agent Framework

- **Template Management**: template-manager, ai-template-manager
- **Instruction Creation**: instruction-generator, instruction-creation, instruction-creation-v2
- **State Management**: self-documentation

## Best Practices

### Creating New Prompts

1. Use the [template-manager.prompt.md](./template-manager.prompt.md) for guidance
2. Follow the naming convention: `{action}-{target}.prompt.md`
3. Include proper front matter with mode and tools
4. Write clear, actionable requirements
5. Add success criteria and validation steps

### Maintaining Prompts

1. Test prompts regularly to ensure they work correctly
2. Update variable references when project structure changes
3. Keep cross-references current
4. Follow markdown-lint strict mode requirements

### Variable Design Patterns

1. **User Inputs**: Use `${input:name:description}` for customizable values
2. **File References**: Use `${file}`, `${workspaceFolder}` for context
3. **Conditional Logic**: Design prompts to handle multiple scenarios
4. **Default Values**: Provide sensible defaults for optional parameters

## Mode Selection Guidelines

### Agent Mode (`mode: 'agent'`)

Use for complex workflows involving:

- Multiple file operations
- Terminal command execution
- Project setup and configuration
- Multi-step automation processes

### Edit Mode (`mode: 'edit'`)

Use for targeted modifications:

- Code refactoring and transformation
- Configuration file updates
- Specific file editing tasks

### Ask Mode (`mode: 'ask'`)

Use for analysis and planning:

- Architecture decisions
- Code review and quality assessment
- Documentation and explanations

## Tool Selection Guidelines

Common tool combinations:

| Task Type           | Required Tools                |
| ------------------- | ----------------------------- |
| File Creation       | `['filesystem', 'codebase']`  |
| Environment Setup   | `['filesystem', 'terminal']`  |
| Code Generation     | `['codebase', 'filesystem']`  |
| VS Code Integration | `['vscodeAPI', 'extensions']` |
| Docker Operations   | `['terminal', 'filesystem']`  |
| Documentation       | `['codebase', 'filesystem']`  |

## Cross-References

### Related Instructions

- [File Organization Standards](../instructions/file-organization.instructions.md)
- [TypeScript Standards](../instructions/typescript-standards.instructions.md)
- [Python Standards](../instructions/python-standards.instructions.md)
- [Self-Documentation Protocol](../instructions/self-documentation.instructions.md)
- [AI Instruction Creation](../instructions/ai-instruction-creation.instructions.md)
- [AI Prompt Creation](../instructions/ai-prompt-creation.instructions.md)

### Memory Bank Integration

- Update [dependencies.md](../../memory-bank/dependencies.md) when adding prompt dependencies
- Reference [systemPatterns.md](../../memory-bank/systemPatterns.md) for architectural guidance
- Follow [.clinerules/reading-protocol.md](../../.clinerules/reading-protocol.md) for documentation standards

## Quality Assurance

All prompt files must:

- [ ] Include proper front matter with mode, tools, and description
- [ ] Use clear, actionable language in requirements
- [ ] Include specific success criteria
- [ ] Follow markdown-lint strict mode compliance
- [ ] Test successfully in VS Code Copilot environment
- [ ] Cross-reference related files accurately

## Advanced Features

### Conditional Workflows

Many prompts support conditional execution based on:

- Project type detection
- Environment availability
- User preferences
- Runtime parameters

### Integration Patterns

Prompts are designed to work together:

- Environment setup prompts prepare for development prompts
- Documentation prompts update memory bank automatically
- Validation prompts verify configurations from setup prompts

### AI Agent Collaboration

Prompts support multi-agent workflows:

- VS Code Copilot for immediate execution
- Cline AI for complex analysis and planning
- Codex CLI for terminal-based automation

## Contributing

When adding new prompts:

1. Follow the established naming conventions
2. Use the template manager for guidance
3. Update this README with the new prompt description
4. Test the prompt before committing
5. Update dependency tracking in memory bank files

## Configuration

Prompts work through VS Code Copilot Chat integration:

- No special configuration required
- Variables are resolved automatically
- Tools are provided by VS Code Copilot environment

---

This sophisticated prompt system enables automated workflow execution across the polyvalent development workspace, supporting TypeScript, Python, Next.js, Docker, and comprehensive web standards implementation.
