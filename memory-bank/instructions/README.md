# GitHub Copilot Instructions

This directory contains instruction files that automatically apply coding standards, guidelines, and rules to VS Code Copilot's code generation. These files work passively in the background to ensure consistency and quality across the polyvalent development workspace.

## Quick Reference: One-Page "When to Use What" Matrix

**[when-to-use-what-matrix.instructions.md](./when-to-use-what-matrix.instructions.md)** — A single-page matrix mapping all major manifest/meta configuration goals (PWA, iOS, Windows, Chrome Extension, etc.) to their primary files and authoritative sources. Use this as your starting point for any integration or standards question. See detailed standards in the specific instruction files below.

> For meta-configuration, manifest, and platform integration, always consult this matrix first, then refer to the detailed instruction files for implementation specifics. All Copilot, Cline AI, and Codex CLI agents should cross-reference this file and the related README files in `memory-bank/prompts/` and `memory-bank/` for full context.

## What are Instruction Files?

Instruction files (`.instructions.md`) are automatic guidelines that:

- Apply persistent coding standards and rules
- Work automatically in the background during code generation
- Modify AI behavior based on file patterns and context
- Define "HOW" code should be written consistently
- Never execute tasks - they only influence code generation behavior

> **Authoring Standard:**  
> Before creating or updating any instruction file, consult [instruction-authoring-standards.instructions.md](./instruction-authoring-standards.instructions.md) for the canonical rules, structure, and validation checklist. All `.instructions.md` files must comply with this standard for consistency and markdown-lint strictness.

## Complete File Index

### **Total Files: 61 instruction files (.md)**

**By Extension:**

- `.md` files: 61 (instruction files)

All files follow the `.instructions.md` naming convention and provide automatic coding standards.

## Available Instructions (61 Files)

### AI Agent Workflow & Creation

**[ai-instruction-creation.instructions.md](./ai-instruction-creation.instructions.md)** - Complete framework for AI agents to create new .instructions.md files on-demand with proper structure, validation, and integration.

**[ai-prompt-creation.instructions.md](./ai-prompt-creation.instructions.md)** - Comprehensive guidelines for AI agents to create .prompt.md files with proper mode selection, tool configuration, and workflow automation.

### AI Agent Framework & Workflow

**[first-principles-reasoning.instructions.md](./first-principles-reasoning.instructions.md)** - First principles reasoning framework for complex problem-solving and architectural decisions.

**[highly-recursive-agentic-flow.instructions.md](./highly-recursive-agentic-flow.instructions.md)** - Recursive agentic workflow patterns for self-improving AI systems.

**[layer-1-verify-and-bootstrap.instructions.md](./layer-1-verify-and-bootstrap.instructions.md)** - Layer 1 verification and bootstrap procedures for system initialization.

**[layer-2-verify-and-bootstrap.instructions.md](./layer-2-verify-and-bootstrap.instructions.md)** - Layer 2 verification and bootstrap procedures for environment setup.

**[layer-3a-custom-instructions-factory.instructions.md](./layer-3a-custom-instructions-factory.instructions.md)** - Factory pattern for creating custom instruction files.

**[layer-3b-chatmodes-factory.instructions.md](./layer-3b-chatmodes-factory.instructions.md)** - Factory pattern for generating chatmode files.

**[layer-3c-prompt-files-factory.instructions.md](./layer-3c-prompt-files-factory.instructions.md)** - Factory pattern for creating prompt files.

**[layer-4-automation-and-health.instructions.md](./layer-4-automation-and-health.instructions.md)** - Automation and health monitoring for layered systems.

**[copilot-memory-bank.instructions.md](./copilot-memory-bank.instructions.md)** - Memory bank protocol for GitHub Copilot integration and state management.

**[start-revision.instructions.md](./start-revision.instructions.md)** - Revision and update protocols for iterative development workflows.

### Documentation & Markdown Standards

**[chatmode-markdown.instructions.md](./chatmode-markdown.instructions.md)** - Markdown formatting standards for chatmode files.

**[markdown.instructions.md](./markdown.instructions.md)** - General markdown formatting and style guidelines.

**[prompts-markdown.instructions.md](./prompts-markdown.instructions.md)** - Markdown standards specific to prompt file formatting.

**[prompting-like-with-chatgpt.instructions.md](./prompting-like-with-chatgpt.instructions.md)** - ChatGPT-style prompting conventions and patterns.

**[prompt-file-library.instructions.md](./prompt-file-library.instructions.md)** - Standards for maintaining and organizing prompt file libraries.

**[instruction-authoring-standards.instructions.md](./instruction-authoring-standards.instructions.md)** - Canonical authoring standards for all instruction files including structure, validation, and quality requirements.

**[self-documentation.instructions.md](./self-documentation.instructions.md)** - Self-documentation protocol requirements for maintaining stateful AI agent collaboration and memory bank synchronization.

**[system-autonomous-optimizations.instructions.md](./system-autonomous-optimizations.instructions.md)** - Autonomous optimization protocol for system-level agents.

### Environment & Infrastructure

**[docker-environment.instructions.md](./docker-environment.instructions.md)** - Comprehensive Docker environment standards covering Codex Universal setup, container security, volume management, and OpenAI API integration.

**[python-environment-conditional.instructions.md](./python-environment-conditional.instructions.md)** - Revolutionary conditional framework enabling runtime Python environment selection (local, docker_isolated, docker_volume) with parameter-driven configuration.

**[python-environment.instructions.md](./python-environment.instructions.md)** - Traditional Python environment setup standards and best practices for local development workflows.

**[vscode-notebook-integration.instructions.md](./vscode-notebook-integration.instructions.md)** - VS Code Notebook API integration standards for advanced Jupyter notebook development, execution control, and automation.
**[web-dev-server.instructions.md](./web-dev-server.instructions.md)** - Démarrage du serveur Next.js en mode développement via VS Code.
**[web-build.instructions.md](./web-build.instructions.md)** - Construction et lancement du serveur Next.js en production accessible sur le réseau local.

**[prisma-server-actions.instructions.md](./prisma-server-actions.instructions.md)** - Prisma ORM integration with Next.js Server Actions.

### Language Standards

**TypeScript**:

- [typescript-style.instructions.md](./typescript-style.instructions.md) - Formatting and naming conventions.
- [typescript-typing.instructions.md](./typescript-typing.instructions.md) - Type system usage and strict typing.
- [typescript-code-organization.instructions.md](./typescript-code-organization.instructions.md) - Module and function structure.
- [typescript-imports.instructions.md](./typescript-imports.instructions.md) - Import ordering and export practices.
- [typescript-error-handling.instructions.md](./typescript-error-handling.instructions.md) - Error handling guidelines.
- [typescript-testing.instructions.md](./typescript-testing.instructions.md) - Testing requirements.
- [typescript-documentation.instructions.md](./typescript-documentation.instructions.md) - Documentation standards.
- [typescript-memory-bank.instructions.md](./typescript-memory-bank.instructions.md) - Memory bank integration rules.
- [typescript-tooling.instructions.md](./typescript-tooling.instructions.md) - Tooling configuration.
- [typescript-output-directory.instructions.md](./typescript-output-directory.instructions.md) - Output directory rule.

**[python-standards.instructions.md](./python-standards.instructions.md)** - Python coding standards using the project's style standard, type hints, modern practices, and project integration requirements.

**[python-notebook-standards.instructions.md](./python-notebook-standards.instructions.md)** - Jupyter notebook development standards for data science workflows, ML experimentation, and reproducible research.

**[tsdoc-typedoc.instructions.md](./tsdoc-typedoc.instructions.md)** - TSDoc and TypeDoc documentation standards for comprehensive API documentation generation and maintenance.
**[typedoc-tsdoc-reference.instructions.md](./typedoc-tsdoc-reference.instructions.md)** - Comprehensive reference for TSDoc and TypeDoc usage.

### Project Organization

**[nextjs-component-patterns.instructions.md](./nextjs-component-patterns.instructions.md)** - Next.js v15+ server/client component decision framework and patterns.

### Git & Commit Standards

**[breaking-changes-commits.instructions.md](./breaking-changes-commits.instructions.md)** - Standards for documenting breaking changes in commit messages.

**[commit-examples.instructions.md](./commit-examples.instructions.md)** - Comprehensive examples of proper commit message formats.

**[conventional-commits-must-be-used.instructions.md](./conventional-commits-must-be-used.instructions.md)** - Conventional commit protocol with gitmoji is mandatory.

**[gitmoji-complete-list.instructions.md](./gitmoji-complete-list.instructions.md)** - Complete gitmoji reference for conventional commits with selection guidelines.

**[no_dummy-no_placeholders.instructions.md](./no_dummy-no_placeholders.instructions.md)** - Standards requiring real, functional configurations instead of placeholder or dummy content.

**[readme-maintenance.instructions.md](./readme-maintenance.instructions.md)** - Standards for maintaining and cross-referencing README files across the project.

### Web Standards & Meta Configuration

**[pwa-manifest.instructions.md](./pwa-manifest.instructions.md)** - Progressive Web App manifest standards for installable applications with proper configuration and validation.

**[ios-meta-and-links.instructions.md](./ios-meta-and-links.instructions.md)** - iOS Web Clip and Safari-specific meta tag standards for optimal mobile web app integration.

**[windows-tiles.instructions.md](./windows-tiles.instructions.md)** - Windows Live Tiles configuration with browserconfig.xml, meta tags, icon sizing, and validation requirements.

**[theme-ui-meta.instructions.md](./theme-ui-meta.instructions.md)** - Browser UI theming meta tags including theme-color, color-scheme, dark mode variants, and platform-specific optimization.

**[general-icon-link-tags.instructions.md](./general-icon-link-tags.instructions.md)** - Comprehensive favicon and app icon link tag standards for cross-platform compatibility.

### SEO & Social Integration

**[seo-meta-tags.instructions.md](./seo-meta-tags.instructions.md)** - Essential SEO meta tag standards for discoverability, crawling optimization, and search engine integration.

**[x-cards.instructions.md](./x-cards.instructions.md)** - X Cards (formerly Twitter Cards) metadata standards for rich social media previews and validation.

**[social-preview-and-deep-links.instructions.md](./social-preview-and-deep-links.instructions.md)** - Open Graph, social media cards, and deep linking standards for comprehensive social integration.

### Quality Assurance & Validation

**[edge-devtools-debugging.instructions.md](./edge-devtools-debugging.instructions.md)** - Microsoft Edge DevTools integration and debugging configuration standards for VS Code development workflows with comprehensive CSS variables solution and launch configurations.

## How Instructions Work

### Automatic Application

Instructions are automatically applied based on their `applyTo` patterns:

- `**` - Applies to all files in the workspace
- `**/*.ts` - Applies only to TypeScript files
- `**/src/**` - Applies only to files in src directory
- `**/*.{test,spec}.*` - Applies only to test files
- `ai-agents` - Special pattern for AI agent behavior

### Background Operation

- Instructions are invisible during prompt composition
- They supplement your existing chat requests automatically
- Listed under "References" section in Copilot responses for auditability
- Apply only to Copilot Chat code generation (not inline completions)

## Instruction File Structure

All instruction files follow this standard structure:

```markdown
---
applyTo: 'glob-pattern'
description: 'Brief description of what this instruction covers'
---

# Standards Title

## Category Name

- Use imperative language for rules
- Be specific and actionable
- Include examples when helpful
- Cross-reference related files

## Another Category

- Write rules as statements, not suggestions
- Avoid vague terms like "appropriate" or "good"
- Specify exceptions explicitly when they exist
```

## Scope Patterns

Common `applyTo` patterns:

| Pattern              | Description        | Example Use Case                 |
| -------------------- | ------------------ | -------------------------------- |
| `**`                 | All files          | Global project standards         |
| `**/*.{ext}`         | Language-specific  | TypeScript, Python rules         |
| `**/folder/**`       | Directory-specific | API, component standards         |
| `**/*.{test,spec}.*` | Test files         | Testing guidelines               |
| `ai-agents`          | AI agent behavior  | Workflow and creation guidelines |

## Best Practices

### Writing Instructions

1. Use imperative mood ("Use", "Implement", "Ensure")
2. Be specific and actionable in every rule
3. Avoid subjective terms ("good", "appropriate", "proper")
4. Include code examples for complex rules
5. Cross-reference related instruction files

### Organizing Instructions

1. Group related rules under logical headings
2. Keep file scope focused and specific
3. Avoid overlapping or conflicting rules
4. Use consistent terminology across files
5. Maintain proper heading hierarchy

### Maintenance

1. Review instructions regularly for relevance
2. Update when coding standards evolve
3. Test rule clarity with team members
4. Keep cross-references current
5. Follow markdown-lint strict mode requirements

## Instruction Precedence

When multiple instruction files apply to the same code:

1. More specific paths override general ones
2. Later rules in same file override earlier ones
3. Linked instructions apply in addition to current file

## Quality Assurance

All instruction files must:

- [ ] Include proper front matter with applyTo pattern and description
- [ ] Use imperative language consistently
- [ ] Contain actionable, specific rules
- [ ] Follow markdown-lint strict mode compliance
- [ ] Avoid conflicts with existing instructions
- [ ] Include cross-references to related files

## Usage Examples

### Global Standards

```markdown
---
applyTo: '**'
description: 'Global project standards for all file types'
---

# Global Project Standards

- Follow consistent naming conventions across all languages
- Include proper error handling in all functions
```

### Language-Specific Rules

```markdown
---
applyTo: '**/*.ts'
description: 'TypeScript coding standards and best practices'
---

# TypeScript Standards

- Use strict type checking with "strict": true
- Prefer interfaces over type aliases for object shapes
```

### Domain-Specific Guidelines

```markdown
---
applyTo: '**/api/**'
description: 'API design standards and conventions'
---

# API Design Standards

- Use RESTful conventions for all endpoints
- Include proper HTTP status codes in responses
```

### AI Agent Behavior

```markdown
---
applyTo: 'ai-agents'
description: 'AI agent workflow and creation guidelines'
---

# AI Agent Instructions

- Create instruction files only when user explicitly requests standards
- Use imperative language for all rules
- Include proper cross-references to related files
```

## Cross-References

### Related Prompts

- [Instruction Generator](../prompts/instruction-generator.prompt.md) - Create new instruction files
- [Template Manager](../prompts/template-manager.prompt.md) - Manage instruction file lifecycle
- [AI Template Manager](../prompts/ai-template-manager.prompt.md) - Enhanced template management
- [Instruction Creation](../prompts/instruction-creation.prompt.md) - Create instruction files following project standards
- [Instruction Creation V2](../prompts/instruction-creation-v2.prompt.md) - Enhanced instruction file creation

### Memory Bank Integration

- Update [dependencies.md](../../memory-bank/dependencies.md) when adding instruction dependencies
- Reference [systemPatterns.md](../../memory-bank/systemPatterns.md) for architectural patterns
- Follow [.clinerules/reading-protocol.md](../../.clinerules/reading-protocol.md) for documentation standards

## Contributing

When adding new instructions:

1. Determine appropriate scope and applyTo pattern
2. Use the [instruction generator prompt](../prompts/instruction-generator.prompt.md)
3. Follow established naming conventions
4. Update this README with the new instruction description
5. Test with Copilot to ensure rules apply correctly
6. Update dependency tracking in memory bank files

## Configuration

Instructions are enabled in VS Code through:

- `github.copilot.chat.codeGeneration.useInstructionFiles: true`
- `github.copilot.chat.codeGeneration.instructionsPath: "memory-bank/instructions"`

See [.vscode/settings.json](../../.vscode/settings.json) for current configuration.

---

This sophisticated instruction system enables consistent, high-quality code generation across the polyvalent development workspace while maintaining flexibility for different languages, frameworks, and development patterns.
