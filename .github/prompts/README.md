# GitHub Copilot Prompts

This directory contains reusable prompt files that can be invoked by VS Code Copilot to execute specific workflows and tasks. Each prompt file represents a complete, standalone workflow that can be triggered manually.

## Quick Reference: Meta-Configuration & Manifest Matrix

For a one-page summary of all manifest and meta configuration goals (PWA, iOS, Windows, Chrome Extension, etc.), see:

**[when-to-use-what-matrix.instructions.md](../instructions/when-to-use-what-matrix.instructions.md)** — This matrix provides authoritative mapping of integration goals to configuration files and sources. For detailed implementation standards, see the corresponding instruction files in `.github/instructions/README.md`.

This README focuses on workflow automation and validation prompts. For meta-configuration and manifest standards, always start with the matrix above, then consult the detailed instructions.

## What are Prompt Files?

Prompt files (`.prompt.md`) are executable templates that:

- Provide complete standalone chat prompts you can invoke manually
- Execute specific tasks when called (via `/promptname` or command palette)
- Include variables for customization and reusability
- Use tools to perform actions like file creation, code generation, or terminal commands

## Available Prompts

### Environment & Infrastructure

- **[codex-universal-environment.prompt.md](./codex-universal-environment.prompt.md)** - Generate and manage Codex Universal Docker environments with comprehensive configuration

### Template Management

- **[template-manager.prompt.md](./template-manager.prompt.md)** - Master template manager for intelligent prompt and instruction file creation
- **[ai-template-manager.prompt.md](./ai-template-manager.prompt.md)** - Enhanced template manager with comprehensive guidelines
- **[instruction-generator.prompt.md](./instruction-generator.prompt.md)** - Generate .instructions.md files with proper structure
- **[instruction-creation.prompt.md](./instruction-creation.prompt.md)** - Create instruction files following project standards
- **[instruction-creation-v2.prompt.md](./instruction-creation-v2.prompt.md)** - Enhanced instruction file creation with improved structure

### Documentation & Memory Bank

- **[memory-bank-update.prompt.md](./memory-bank-update.prompt.md)** - Update memory bank documentation with proper cross-references
- **[dependency-management.prompt.md](./dependency-management.prompt.md)** - Track and update project dependencies with proper documentation
- **[self-documentation.prompt.md](./self-documentation.prompt.md)** - Execute and append self-documentation entries following the Self-Documentation Protocol

### Project Automation

- **[script-generator.prompt.md](./script-generator.prompt.md)** - Create resilient, reusable automation scripts
- **[docker-generator.prompt.md](./docker-generator.prompt.md)** - Generate parameterized Docker configurations

### Development Components

- **[typescript-component.prompt.md](./typescript-component.prompt.md)** - Generate TypeScript components following project standards
- **[vit-implementation.prompt.md](./vit-implementation.prompt.md)** - Generate a Vision Transformer (ViT) implementation with detailed documentation
- **[theme-ui-meta.prompt.md](./theme-ui-meta.prompt.md)** - Add browser-UI theming meta tags for light/dark mode and platform-specific variants. Includes validation steps using Lighthouse and webhint.

### General Icon Link Tags

- **[general-icon-link-tags.prompt.md](./general-icon-link-tags.prompt.md)** - Add a comprehensive set of general icon link tags to an HTML document.

### Testing & Validation

- **[validation-debugging-checklist.prompt.md](./validation-debugging-checklist.prompt.md)** - Run a comprehensive, VS Code-native validation and debugging workflow for web apps.
- **[test-prompt.prompt.md](./test-prompt.prompt.md)** - Test prompt to verify prompt files are working correctly

### SEO Meta Tags

- **[seo-meta-tags.prompt.md](./seo-meta-tags.prompt.md)** - Add essential SEO meta tags to an HTML document.

### Social Preview & Deep Links

- **[x-cards.prompt.md](./x-cards.prompt.md)** - Add or update X Cards (formerly Twitter Cards) meta tags in HTML head sections for rich previews on X.

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
mode: 'agent' | 'ask'
tools: ['filesystem', 'terminal', 'codebase', etc.]
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

## Cross-References

### Related Instructions

- [File Organization Standards](../instructions/file-organization.instructions.md)
- [TypeScript Standards](../instructions/typescript-standards.instructions.md)
- [Python Standards](../instructions/python-standards.instructions.md)
- [Self-Documentation Protocol](../instructions/self-documentation.instructions.md)
- [Instruction Authoring Standards](../instructions/instruction-authoring-standards.instructions.md)

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

## Contributing

When adding new prompts:

1. Follow the established naming conventions
2. Use the template manager for guidance
3. Update this README with the new prompt description
4. Test the prompt before committing
5. Update dependency tracking in memory bank files
