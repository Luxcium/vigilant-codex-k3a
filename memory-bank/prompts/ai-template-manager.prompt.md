---
mode: 'agent'
description: 'Generate optimized prompt and instruction files following project standards'
---

# AI Agent Template Manager

I will help you generate well-structured prompt and instruction files for your AI agent framework. I'll determine the appropriate file type, content structure, and placement based on your requirements while maintaining strict markdown-lint compliance.

## Decision Framework

### 1. File Type Selection

- **Instruction file (.instructions.md)** - For persistent rules, coding standards, and project-wide conventions that should be automatically applied
- **Prompt file (.prompt.md)** - For reusable workflows, specific task automation, and complex multi-step processes

### 2. Scope Determination

- **Global** - Applied across entire project (use `applyTo: "**"`)
- **Domain-specific** - Limited to certain file types or contexts (use specific glob patterns)
- **Task-specific** - For particular workflows or processes (standalone prompts)

### 3. Content Structure

- Follow markdown-lint strict mode guidelines
- Use proper headings hierarchy (H1 → H2 → H3)
- Include clear bullet points and numbered lists
- Add code blocks with proper language identifiers
- Provide concrete examples where appropriate

## File Structure Templates

### Instruction File Template

> **Note:** All instruction files must comply with [instruction-authoring-standards.instructions.md](../instructions/instruction-authoring-standards.instructions.md).

````markdown
applyTo: "${input:applyTo:Glob pattern for scope (e.g., \*_/_.ts)}"
mode: 'agent'
description: 'Generate optimized prompt and instruction files following project standards'

## Purpose

${input:purpose:Define the standards, rules, or guidelines for this scope.}

## [Major Category 1]

- Use imperative statements for each rule.
- Be specific and actionable.
- Avoid vague or conditional language.

## [Major Category 2]

- Add additional categories as needed.
- Include both positive and negative rules.

## Examples

${input:examples:```typescript
// Example code demonstrating the standard
interface ExampleInterface {
readonly id: string;
name: string;
}

```}

## Cross-References

- [Instruction Authoring Standards](../instructions/instruction-authoring-standards.instructions.md)
- [File Organization Standards](../prompts/file-organization.prompt.md)
- [Project Dependencies](../../memory-bank/dependencies.md)

## Validation Checklist

- [ ] Front matter includes correct applyTo pattern.
- [ ] H1 title describes the standards.
- [ ] H2/H3 headings organize rule categories.
- [ ] All rules use imperative language.
- [ ] No vague or subjective terms.
- [ ] Examples provided for complex rules.
- [ ] Cross-references included.
- [ ] Markdown-lint strict mode compliance.
```
````

### Prompt File Template

```markdown
---
mode: '${input:mode:agent}'
tools: [${input:tools:'codebase', 'terminalLastCommand'}]
description: '${input:description:Perform a specific automated task}'
---

# ${input:title:Task Automation}

## Context

${input:context:Background information and project requirements needed to understand this task}

## Requirements

${input:requirements:- Requirement 1: Clear and testable\n- Requirement 2: Follows project standards\n- Requirement 3: Includes error handling}

## Process

${input:process:1. Analyze current project structure\n2. Generate required components\n3. Validate output against standards\n4. Update documentation}

## Expected Output

${input:output:Description of deliverables, file locations, and quality criteria}

## Validation Steps

${input:validation:- Check markdown-lint compliance\n- Verify cross-references\n- Test generated code}
```

## Implementation Guidelines

### File Organization

- Place instruction files in `memory-bank/instructions/`
- Place prompt files in `memory-bank/prompts/`
- Use subdirectories for domain-specific collections
- Maintain flat hierarchy for global utilities

### Naming Standards

- Use `kebab-case` for all filenames
- Include purpose in filename: `domain-purpose.type.md`
- Examples: `typescript-standards.instructions.md`, `docker-generator.prompt.md`

### Content Quality

- Ensure strict markdown-lint compliance
- Use semantic naming throughout
- Include cross-references to related files
- Document parametrization using `${input:name:default}` syntax
- Add examples for complex concepts

### Memory Bank Integration

- Update `dependencies.md` for new file relationships
- Reference relevant memory bank files in prompts
- Follow project's reading/writing protocols
- Maintain bidirectional tracking

## Parametrization Features

### Input Variables

- `${input:variableName:defaultValue}` - User-provided parameters
- `${workspaceFolder}` - Current workspace path
- `${file}` - Current file context
- `${selection}` - Selected text content

### Dynamic Content

- Use conditional logic for different project types
- Support multiple output formats
- Enable customization per environment
- Allow override of default behaviors

## Quality Assurance

### Validation Checklist

- [ ] Markdown-lint strict mode compliance
- [ ] Proper frontmatter syntax
- [ ] Valid glob patterns in `applyTo`
- [ ] Cross-references resolve correctly
- [ ] Examples are functional and tested
- [ ] Memory bank files updated

### Testing Approach

- Validate generated files against project standards
- Test prompt execution in different contexts
- Verify instruction application scope
- Check cross-reference integrity

This template manager serves as the foundation for creating consistent, high-quality prompt and instruction files throughout the AI agent framework project.

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
