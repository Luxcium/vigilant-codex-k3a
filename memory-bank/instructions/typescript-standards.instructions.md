---
applyTo: '**/*.ts, **/*.tsx'
---

# TypeScript Coding Standards

## Style Guidelines

- You follow the [Airbnb TypeScript style guide](https://github.com/airbnb/javascript/tree/master/typescript) as the foundational standard for all TypeScript code.
- You use strict type checking with `"strict": true` in tsconfig.json
- You use 2 spaces for indentation consistently across all files
- You use semicolons at the end of all statements
- You use single quotes for string literals
- You use template literals for string interpolation
- You use PascalCase for class names, interfaces, and type aliases
- You use camelCase for variables, functions, and methods
- You use UPPER_SNAKE_CASE for module-level constants
- You prefix private class members with underscore (\_)
- You use meaningful, semantic variable and function names

## Type System Usage

- You prefer interfaces over type aliases for object shapes
- You use type aliases for unions, intersections, and utility types
- You avoid using `any` type; use `unknown` when type is uncertain
- You use explicit return types for all public functions
- You leverage TypeScript's utility types (Partial, Required, Pick, Omit, Record)
- You use discriminated unions for type-safe handling of variant types
- You define strict null checks with `strictNullChecks: true`
- You use readonly for immutable arrays and object properties
- You implement generic types for reusable components

## Code Organization

- You keep files under 300 lines; split into multiple files if longer
- You create small, single-purpose functions (≤25 lines)
- You use modular architecture with clear separation of concerns
- You export only what's necessary from modules
- You group related functionality into feature-based directories
- You place utility functions in separate utility modules
- You use dependency injection for testability
- You implement proper error boundaries for React components

## Import Management

- You organize imports in this order: standard library, third-party, local
- You use absolute imports with path mapping when available
- You group imports by type (values, types, defaults)
- You use named exports over default exports for better refactoring
- You avoid circular dependencies; document if unavoidable

## Error Handling

- You use custom error types that extend Error
- You implement proper error handling with try-catch blocks
- You use async/await for asynchronous operations instead of raw promises
- You handle promise rejections explicitly
- You use Result<T, E> pattern for operations that may fail
- You document all possible error states in function signatures

## Testing Standards

- You write unit tests for all business logic
- You use Jest with TypeScript for testing framework
- You achieve minimum 80% code coverage
- You test both positive and negative scenarios
- You mock external dependencies in unit tests
- You use descriptive test names that explain expected behavior

## Documentation Requirements

- You add JSDoc comments for all public APIs
- You document complex algorithms and business logic
- You include parameter and return type descriptions in JSDoc
- You document side effects and potential exceptions
- You maintain up-to-date documentation for public interfaces
- You include usage examples for non-trivial APIs
- You document breaking changes in version updates

## Memory Bank Integration

- You reference appropriate memory bank files when making changes
- You update dependencies.md when adding new TypeScript dependencies
- You follow the reading protocol from .clinerules/reading-protocol.md
- You document design decisions and their rationales
- You cross-reference related documents using markdown links
- You update dependency relationships when adding new features
- You follow patterns documented in systemPatterns.md
- You ensure all setup is performed via scripts in scripts/ directory
- You document all architectural decisions in appropriate memory bank files

## Tooling

- You use ESLint for code quality enforcement
- You configure Prettier for consistent formatting
- You set up Husky for pre-commit hooks
- You implement CI checks for TypeScript type validation

Remember to reference the memory bank files for project-specific guidelines and keep all documentation up-to-date.

## Verification

- You run `markdownlint --strict`
- You run `scripts/verify-all.sh`
