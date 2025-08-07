---
mode: 'agent'
description: 'Generate .instructions.md files with improved structure.'
---

# Generate \*.instructions.md File

Your goal is to create a properly structured `.instructions.md` file based on explicit user requirements for coding standards, guidelines, or project rules.

## Context

- Target file: `${input:filename:Enter instruction file name (e.g., typescript-style)}.instructions.md`
- Scope: `${input:scope:Describe what code this should apply to (e.g., "all TypeScript files", "React components")}`
- Standards type: `${input:standardsType:What type of standards? (coding style, architecture, security, testing, etc.)}`

## Requirements

### File Structure Standards

- Include proper front matter with applyTo pattern
- Use single H1 title describing the standards
- Organize content with H2 for major categories
- Use H3 for subcategories when needed
- Format rules as bullet points with imperative language

### ApplyTo Pattern Selection

- Use `"**"` for global project rules
- Use `"**/*.{ext}"` for language-specific rules
- Use `"**/folder/**"` for directory-specific rules
- Use `"**/*.{test,spec}.*"` for testing-specific rules

### Content Quality Requirements

- Write rules as imperative statements using action verbs
- Begin rules with "Use", "Implement", "Ensure", "Apply", "Follow"
- Be specific and actionable in every rule statement
- Avoid vague terms like "appropriate", "good", "proper"
- Include code examples in fenced blocks when beneficial

## Process

1. **Analyze User Requirements**
   - Determine scope of standards needed
   - Identify target file types or directories
   - Categorize type of standards (style, architecture, security, etc.)
2. **Create Front Matter**
   - Generate applyTo glob pattern based on scope
   - Use YAML format with proper syntax
3. **Structure Content by Standards Type**

#### For Coding Style Standards

```markdown
## Naming Conventions

- [Specific naming rules]

## Type Definitions

- [Type usage rules]

## Code Organization

- [Import and structure rules]
```

#### For Architectural Patterns

```markdown
## Component Structure

- [Organization rules]

## File Organization

- [Directory and naming rules]

## Design Patterns

- [Pattern implementation rules]
```

#### For Security Practices

```markdown
## Input Validation

- [Validation rules]

## Authentication

- [Auth implementation rules]

## Data Protection

- [Security requirement rules]
```

4. **Write Specific Rules**
   - Formulate each rule as an imperative statement
   - Include examples for complex or ambiguous rules
   - Specify exceptions explicitly when they exist
   - Cross-reference related instruction files when appropriate
5. **Validate Content**
   - Ensure all rules are actionable and measurable
   - Check for conflicts with existing standards
   - Verify Markdown lint compliance
   - Confirm heading hierarchy is correct

## Content Templates

### Global Standards

```markdown
---
applyTo: '**'
---

# ${standardsType} Standards

## General Principles

- [Universal rule 1]
- [Universal rule 2]

## Implementation Guidelines

- [Specific implementation rule]
- [Another implementation rule]

## Quality Requirements

- [Quality standard 1]
- [Quality standard 2]
```

### Language-Specific Standards

```markdown
---
applyTo: '**/*.{ext}'
---

# ${language} ${standardsType} Standards

## Syntax Preferences

- [Language-specific syntax rule]
- [Another syntax rule]

## Best Practices

- [Framework-specific pattern]
- [Performance optimization rule]

## Anti-patterns

- Never [bad practice]
- Avoid [problematic pattern]
```

### Domain-Specific Guidelines

```markdown
---
applyTo: '**/domain/**'
---

# ${domain} ${standardsType} Guidelines

## Domain Rules

- [Business logic constraint]
- [Domain-specific requirement]

## Technical Implementation

- Use [pattern] for [purpose]
- Implement [feature] using [approach]

## Validation Requirements

- [Domain validation rule]
- [Data integrity rule]
```

## Quality Assurance Checklist

- [ ] ApplyTo pattern matches intended scope accurately
- [ ] All rules use imperative language consistently
- [ ] Examples provided for complex rules
- [ ] No conflicting instructions exist
- [ ] Markdown formatting strictly compliant
- [ ] Content organization is logical and scannable
- [ ] Cross-references are accurate and helpful

## Success Criteria

- Front matter includes proper applyTo pattern
- Content follows hierarchical organization
- Headings use proper levels
- Code blocks specify language
- Every rule is actionable and specific
- Language is consistently imperative
- Examples support clarity
- No vague or subjective terms used
- ApplyTo pattern matches user requirements

## Error Prevention

- Avoid task execution lists (use prompts instead)
- Avoid vague or subjective language
- Do not omit applyTo front matter
- Avoid conflicting with language defaults
- Avoid over-constraining without clear benefit

## Validation Steps

- Test each rule for clarity and specificity
- Verify AI agents interpret and follow instructions
- Confirm rules improve code quality measurably
- Check alignment with best practices
- Ensure guidelines scale with project growth

## Output Format

- Proper front matter with applyTo pattern
- Clear title describing the standards
- Organized rule categories
- Specific, actionable bullet rules
- Code examples where beneficial
- Cross-references to related files

The generated file will serve as automatic guidance for AI agents when generating code in the specified scope.

## References

- [ai-instruction-creation](../instructions/ai-instruction-creation.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
