# GitHub Copilot Instructions

This directory contains instruction files that automatically apply coding standards, guidelines, and rules to VS Code Copilot's code generation. These files work passively in the background to ensure consistency and quality.

## What are Instruction Files?

Instruction files (`.instructions.md`) are automatic guidelines that:
- Apply persistent coding standards and rules
- Work automatically in the background during code generation
- Modify AI behavior based on file patterns and context
- Define "HOW" code should be written consistently
- Never execute tasks - they only influence code generation behavior

> **Authoring Standard:**  
> Before creating or updating any instruction file, consult [instruction-authoring-standards.instructions.md](./instruction-authoring-standards.instructions.md) for the canonical rules, structure, and validation checklist. All `.instructions.md` files must comply with this standard for consistency and markdown-lint strictness.

## Available Instructions

### Environment & Infrastructure

### Language Standards

### Project Organization

### AI Agent Workflow

### Documentation & Standards

### PWA Standards
 **[windows-tiles.instructions.md](./windows-tiles.instructions.md)** - Windows Live Tiles (Start-menu & pinned-site) configuration with `browserconfig.xml`, meta tags, icon sizing, theming, caching pitfalls, and validation steps.

### Code Quality

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
applyTo: "glob-pattern"
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

| Pattern | Description | Example Use Case |
|---------|-------------|------------------|
| `**` | All files | Global project standards |
| `**/*.{ext}` | Language-specific | TypeScript, Python rules |
| `**/folder/**` | Directory-specific | API, component standards |
| `**/*.{test,spec}.*` | Test files | Testing guidelines |
| `ai-agents` | AI agent behavior | Workflow and creation guidelines |

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
- [ ] Include proper front matter with applyTo pattern
- [ ] Use imperative language consistently
- [ ] Contain actionable, specific rules
- [ ] Follow markdown-lint strict mode compliance
- [ ] Avoid conflicts with existing instructions
- [ ] Include cross-references to related files

## Usage Examples

### Global Standards
```markdown
---
applyTo: "**"
---
# Global Project Standards
- Follow consistent naming conventions across all languages
- Include proper error handling in all functions
```

### Language-Specific Rules
```markdown
---
applyTo: "**/*.ts"
---
# TypeScript Standards
- Use strict type checking with "strict": true
- Prefer interfaces over type aliases for object shapes
```

### Domain-Specific Guidelines
```markdown
---
applyTo: "**/api/**"
---
# API Design Standards
- Use RESTful conventions for all endpoints
- Include proper HTTP status codes in responses
```

### AI Agent Behavior
```markdown
---
applyTo: "ai-agents"
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
- `github.copilot.chat.codeGeneration.instructionsPath: ".github/instructions"`

See [.vscode/settings.json](../../.vscode/settings.json) for current configuration.
