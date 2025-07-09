---
applyTo: '**'
---

# AI Agent Instructions: Creating \*.instructions.md Files

## Trigger Recognition Rules

### When to Create Instruction Files

- Create instruction files ONLY when user explicitly requests coding standards or guidelines.
- Recognize these request patterns:
  - "Create instructions for [coding standard]"
  - "Make an instruction file for [guidelines]"
  - "Generate .instructions.md for [rules]"
  - "Setup coding instructions for [language/framework]"
  - "Define instructions for [project standards]"

### When NOT to Create Instruction Files

- Never create instruction files for task automation (use prompts instead).
- Never create for one-time actions or direct code generation.
- Never create for process workflows or executable tasks.

## File Structure Requirements

### Front Matter Standards

- Always include front matter with applyTo pattern.
- Use YAML format with proper syntax.
- Apply appropriate glob patterns for scope.

```yaml
---
applyTo: 'glob-pattern-here'
---
```

### ApplyTo Pattern Selection

- Use `"**"` for global project rules.
- Use `"**/*.{ext}"` for language-specific rules.
- Use `"**/folder/**"` for directory-specific rules.
- Use `"**/*.{test,spec}.*"` for testing-specific rules.

### Content Structure Requirements

- Start with single H1 title describing the standards.
- Use H2 for major categories.
- Use H3 for subcategories when needed.
- Use bullet points for individual rules.
- Include code examples in fenced blocks when beneficial.

## Content Creation Rules

### Rule Formulation Standards

- Write rules as imperative statements using action verbs.
- Begin rules with "Use", "Implement", "Ensure", "Apply", "Follow".
- Be specific and actionable in every rule statement.
- Avoid vague terms like "appropriate", "good", "proper".
- Eliminate conditional language like "try to", "if possible".

### Specificity Requirements

- Define WHEN each rule applies.
- Specify WHAT exactly to do.
- Include WHY when context improves clarity.
- Document EXCEPTIONS explicitly when they exist.
- Provide examples for complex or ambiguous rules.

### Organization Patterns

#### For Coding Style Standards

```markdown
## Naming Conventions

- Rule for classes and interfaces
- Rule for variables and functions
- Rule for constants and enums

## Type Definitions

- Rule for function return types
- Rule for interface usage
- Rule for type alias preferences

## Code Organization

- Rule for import ordering
- Rule for file structure
- Rule for module exports
```

#### For Architectural Patterns

```markdown
## Component Structure

- Rule for component organization
- Rule for business logic separation
- Rule for dependency management

## File Organization

- Rule for directory structure
- Rule for naming conventions
- Rule for module boundaries

## Design Patterns

- Rule for pattern implementation
- Rule for pattern selection
- Rule for pattern consistency
```

#### For Security Practices

```markdown
## Input Validation

- Rule for user input handling
- Rule for data sanitization
- Rule for validation implementation

## Authentication

- Rule for token management
- Rule for session handling
- Rule for permission checking

## Data Protection

- Rule for encryption requirements
- Rule for communication security
- Rule for data storage
```

## Content Quality Standards

### Language Requirements

- Use present tense for all rule statements.
- Write in active voice consistently.
- Maintain imperative mood throughout.
- Use consistent terminology across all rules.

### Formatting Standards

- Use consistent bullet point style (hyphens).
- Maintain proper heading hierarchy.
- Format code examples with language specifications.
- Use consistent emphasis formatting (bold/italic).

### Completeness Criteria

- Cover all aspects of the requested domain.
- Include both positive rules (do this) and negative rules (avoid that).
- Provide sufficient detail for consistent application.
- Include cross-references to related instruction files when appropriate.

## Scope Determination Rules

### Global Scope Indicators

- User mentions "all code" or "entire project".
- Rules apply across multiple languages/frameworks.
- Standards are foundational or universal.
- Guidelines cross architectural boundaries.

### Targeted Scope Indicators

- User specifies file types or extensions.
- Rules are technology-specific.
- Standards apply to specific domains.
- Guidelines are context-dependent.

### Multi-File Strategy

- Create separate instruction files for distinct domains.
- Use file linking for shared standards.
- Maintain clear scope boundaries between files.
- Avoid overlapping or conflicting rules.

## Reference and Linking Standards

### Internal Linking Rules

- Link to related instruction files using relative paths.
- Use descriptive link text that explains the relationship.
- Format links as (example): `[description](../prompts/instruction-creation.prompt.md)`.
- Always verify link targets exist or will be created.

### External Reference Guidelines

- Reference established standards or specifications when appropriate.
- Avoid linking to external documentation that may change.
- Include essential information directly in the instruction file.
- Use code examples rather than external links when possible.

## Validation Requirements

### Pre-Creation Checklist

- Verify applyTo pattern matches intended scope.
- Ensure all rules are actionable and measurable.
- Check for conflicts with existing instruction files.
- Confirm organization is logical and scannable.
- Validate that language is consistently imperative.

### Content Validation

- Test each rule for clarity and specificity.
- Ensure examples support rule understanding.
- Verify completeness for the specified domain.
- Check for proper markdown formatting.
- Confirm heading hierarchy is correct.

## File Naming Standards

### Naming Convention Rules

- Use descriptive noun phrases: `typescript-style.instructions.md`.
- Include scope indicators: `react-testing.instructions.md`.
- Use hyphens for multi-word names.
- Keep names under 30 characters when possible.
- Ensure names clearly indicate content domain.

### Organization Guidelines

- Group related instruction files in same directory.
- Use consistent naming patterns within projects.
- Create logical hierarchies for complex domains.
- Maintain alphabetical ordering when beneficial.

## Error Prevention Rules

### Common Mistakes to Avoid

- Never create task execution lists (use prompts instead).
- Never use vague or subjective language.
- Never create rules that conflict with language/framework defaults.
- Never over-constrain without clear benefit.
- Never omit the applyTo front matter pattern.

### Quality Assurance Standards

- Always verify rules can be applied consistently.
- Ensure AI agents can interpret and follow each rule.
- Confirm rules improve code quality measurably.
- Validate that rules are enforceable programmatically.
- Check that rules align with modern best practices.

## Final Application Standards

### Rule Implementation

- Instructions modify AI behavior automatically.
- Rules apply passively to relevant code generation.
- Standards influence decision-making consistently.
- Guidelines shape output quality continuously.

### Maintenance Considerations

- Create stable rules that rarely need updates.
- Design for long-term application consistency.
- Consider impact on team development workflow.
- Ensure rules scale with project growth.
- Plan for rule evolution and refinement.
