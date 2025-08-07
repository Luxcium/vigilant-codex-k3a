---
mode: 'agent'
description: 'Generate a TypeScript React component.'
---

Your goal is to generate a ${input:componentType:Select component type (class|interface|function|module)} named ${input:componentName} following Codex CLI TypeScript standards.

## Requirements

- You use TypeScript with strict type checking enabled
- You use the project's TypeScript style standard
- You include comprehensive JSDoc comments for all public APIs
- You implement proper error handling and validation
- You use semantic, descriptive naming conventions
- You add unit tests for all public methods/functions
- You reference [typescript-standards.instructions.md](../instructions/typescript-standards.instructions.md)
- Use TypeScript with strict type checking enabled
- Follow Airbnb TypeScript style guide
- Include comprehensive JSDoc comments for all public APIs
- Implement proper error handling and validation
- Use semantic, descriptive naming conventions
- Add unit tests for all public methods/functions

## Process

1. Analyze ${workspaceFolder}/src structure for appropriate placement
2. Create ${input:componentName} in correct directory following file organization standards
3. Implement core functionality with proper TypeScript types
4. Add comprehensive error handling and input validation
5. Include JSDoc documentation for all public APIs
6. Create corresponding test file in appropriate test directory
7. Update dependencies.md if new dependencies are introduced
8. Run autonomous-state-manager.sh to update project state

## Context Integration

- **Project Standards**: Follow patterns established in existing ${workspaceFolder}/src files
- **Type Safety**: Ensure all types are explicitly defined and exported when needed
- **Memory Bank**: Reference ${workspaceFolder}/memory-bank/dependencies.md for dependency relationships
- **File Organization**: Use patterns from [file-organization.instructions.md](../prompts/file-organization.prompt.md)

## Templates Reference

Use templates from ${workspaceFolder}/init/ directory:

- `typescript-module-template/` for module structure
- `documentation-template/` for README and API docs

## Success Criteria

- [ ] You ensure the component compiles without TypeScript errors
- [ ] You document all public APIs with JSDoc
- [ ] You cover edge cases and invalid inputs with error handling
- [ ] You follow the project's TypeScript style standard
- [ ] You achieve minimum 80% unit test coverage
- [ ] You update dependencies.md if new packages are added
- [ ] You update project state via autonomous-state-manager.sh

## Quality Assurance

Before completion, verify:

- No lint errors or warnings
- All imports are properly typed
- Consistent naming conventions throughout
- Proper separation of concerns
- Integration with existing project patterns

## References

- [typescript-standards](../instructions/typescript-standards.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
