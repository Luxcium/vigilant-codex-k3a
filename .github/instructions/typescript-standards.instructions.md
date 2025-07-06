---
applyTo: '**/*.ts,**/*.tsx'
---

# TypeScript Coding Standards

## Style Guidelines

- Follow Airbnb TypeScript style guide for all TypeScript code
- Use strict type checking with `"strict": true` in tsconfig.json
- Use 2 spaces for indentation consistently across all files
- Use semicolons at the end of all statements
- Use single quotes for string literals
- Use template literals for string interpolation
- Use PascalCase for class names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use UPPER_SNAKE_CASE for module-level constants
- Prefix private class members with underscore (\_)
- Use meaningful, semantic variable and function names

## Type System Usage

- Prefer interfaces over type aliases for object shapes
- Use type aliases for unions, intersections, and utility types
- Avoid using `any` type; use `unknown` when type is uncertain
- Use explicit return types for all public functions
- Leverage TypeScript's utility types (Partial, Required, Pick, Omit, Record)
- Use discriminated unions for type-safe handling of variant types
- Define strict null checks with `strictNullChecks: true`
- Use readonly for immutable arrays and object properties
- Implement generic types for reusable components

## Code Organization

- Keep files under 300 lines; split into multiple files if longer
- Create small, single-purpose functions (≤25 lines)
- Use modular architecture with clear separation of concerns
- Export only what's necessary from modules
- Group related functionality into feature-based directories
- Place utility functions in separate utility modules
- Use dependency injection for testability
- Implement proper error boundaries for React components

## Import Management

- Organize imports in this order: standard library, third-party, local
- Use absolute imports with path mapping when available
- Group imports by type (values, types, defaults)
- Use named exports over default exports for better refactoring
- Avoid circular dependencies; document if unavoidable

## Error Handling

- Use custom error types that extend Error
- Implement proper error handling with try-catch blocks
- Use async/await for asynchronous operations instead of raw promises
- Handle promise rejections explicitly
- Use Result<T, E> pattern for operations that may fail
- Document all possible error states in function signatures

## Testing Standards

- Write unit tests for all business logic
- Use Jest with TypeScript for testing framework
- Achieve minimum 80% code coverage
- Test both positive and negative scenarios
- Mock external dependencies in unit tests
- Use descriptive test names that explain expected behavior

## Documentation Requirements

- Add JSDoc comments for all public APIs
- Document complex algorithms and business logic
- Include parameter and return type descriptions in JSDoc
- Document side effects and potential exceptions
- Maintain up-to-date documentation for public interfaces
- Include usage examples for non-trivial APIs
- Document breaking changes in version updates

## Memory Bank Integration

- Reference appropriate memory bank files when making changes
- Update dependencies.md when adding new TypeScript dependencies
- Follow the reading protocol from .clinerules/reading-protocol.md
- Document design decisions and their rationales
- Cross-reference related documents using markdown links
- Update dependency relationships when adding new features
- Follow patterns documented in systemPatterns.md
- Ensure all setup is performed via scripts in scripts/ directory
- Document all architectural decisions in appropriate memory bank files

## Tooling

- Use ESLint for code quality enforcement
- Configure Prettier for consistent formatting
- Set up Husky for pre-commit hooks
- Implement CI checks for TypeScript type validation

Remember to reference the memory bank files for project-specific guidelines and keep all documentation up-to-date.
