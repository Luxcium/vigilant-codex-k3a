---
description: 'Generate *.instructions.md files with proper structure and content'
tools: []
---
# Generate \*.instructions.md File

Your goal is to create a properly structured `.instructions.md` file based on the user's requirements for coding standards, guidelines, or project rules.

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

- Use "\*\*" for global project rules
- Use "\*_/_.{ext}" for language-specific rules
- Use "**/folder/**" for directory-specific rules
- Use "\*_/_.{test,spec}.\*" for testing-specific rules

### Content Quality Requirements

- Write rules as imperative statements using action verbs
- Begin rules with "Use", "Implement", "Ensure", "Apply", "Follow"
- Be specific and actionable in every rule statement
- Avoid vague terms like "appropriate", "good", "proper"
- Include code examples in fenced blocks when beneficial

## Process

1. **Analyze User Requirements**
   - Determine the scope of standards needed
   - Identify the target file types or directories
   - Categorize the type of standards (style, architecture, security, etc.)

2. **Create Front Matter**
   - Generate appropriate applyTo glob pattern based on scope
   - Use YAML format with proper syntax

3. **Structure Content by Standards Type**

   **For Coding Style Standards:**

   ```markdown
   ## Naming Conventions

   - [Specific naming rules]

   ## Type Definitions

   - [Type usage rules]

   ## Code Organization

   - [Import and structure rules]
   ```

   **For Architectural Patterns:**

   ```markdown
   ## Component Structure

   - [Organization rules]

   ## File Organization

   - [Directory and naming rules]

   ## Design Patterns

   - [Pattern implementation rules]
   ```

   **For Security Practices:**

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
   - Verify proper markdown formatting
   - Confirm heading hierarchy is correct

## Content Templates

### Global Standards Template

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

### Language-Specific Template

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

## Anti-patterns to Avoid

- Never [bad practice]
- Avoid [problematic pattern]
```

### Domain-Specific Template

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

## Variable Usage Guidelines

- Use descriptive variable names in examples: `${componentName}`, `${apiEndpoint}`
- Include placeholder text for complex concepts
- Reference file paths using `${workspaceFolder}` when appropriate
- Use input variables for user-specific values

## Quality Assurance Checklist

- [ ] ApplyTo pattern matches intended scope accurately
- [ ] All rules use imperative language consistently
- [ ] Examples are provided for complex rules
- [ ] No conflicting instructions exist
- [ ] Markdown formatting follows lint standards
- [ ] Content organization is logical and scannable
- [ ] Cross-references are accurate and helpful

## Success Criteria

### File Structure Validation

- Front matter includes proper applyTo pattern
- Content follows hierarchical organization
- All headings use appropriate levels
- Code blocks include language specifications

### Content Quality Validation

- Every rule is actionable and specific
- Language is consistently imperative
- Examples support rule clarity
- No vague or subjective terms used

### Scope Alignment Validation

- ApplyTo pattern matches user requirements

## Error Prevention

### Avoid These Common Mistakes

- Creating task execution lists (use prompts instead)
- Using vague or subjective language
- Omitting the applyTo front matter pattern
- Creating rules that conflict with language defaults
- Over-constraining without clear benefit

### Validation Steps

- Test each rule for clarity and specificity
- Verify AI agents can interpret and follow rules
- Confirm rules improve code quality measurably
- Check alignment with modern best practices
- Ensure rules scale with project growth

## Output Format

Create the instruction file at the specified location with:

1. Proper front matter with applyTo pattern
2. Clear title describing the standards
3. Organized sections for different rule categories
4. Specific, actionable rules in bullet format
5. Code examples where beneficial
6. Cross-references to related files when appropriate

The generated file should serve as automatic guidance for AI agents when generating code in the specified scope.

## References

- [ai-instruction-creation](../instructions/ai-instruction-creation.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
