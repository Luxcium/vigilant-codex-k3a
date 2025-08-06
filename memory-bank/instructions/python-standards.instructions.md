# Project Output Directory Rule

## **IMPORTANT:** Only the top-level SDK root `src/` folder (for Questrade SDK) must emit build outputs to `./lib`. All other packages, modules, or subprojects (such as agent-framework, templates, etc.) should use their own `dist/` or default `outDir` as appropriate for their context. Do NOT change outDir to `lib` for any folder except the top-level SDK root. This rule is mandatory and must be enforced to avoid confusion and maintain project structure integrity.

## applyTo: '\*_/_.py'

# Python Coding Standards

## Style Guidelines

- You use the project's Python style standard for all code
- You use 4 spaces for indentation (never tabs)
- You limit lines to 88 characters for better readability
- You use snake_case for variables, functions, and module names
- You use PascalCase for class names
- You use UPPER_SNAKE_CASE for module-level constants
- You use a leading underscore for private methods and attributes
- You use double leading underscores for name mangling when necessary

## Type Annotations

- Use type hints for all function parameters and return types
- Import types from typing module when needed
- Use Union types for multiple possible types
- Use Optional for parameters that can be None
- Use List, Dict, Tuple, Set for generic collections
- Use Protocol for structural typing
- Use TypeVar for generic functions and classes
- Document complex types with type aliases

## Import Organization

- You organize imports as standard library, third-party, local
- You group imports by category with blank lines between groups
- You use absolute imports whenever possible
- You avoid wildcard imports (from module import \*)
- You use relative imports only within packages
- You place imports at the top of the file after the module docstring
- You use parentheses for multi-line imports

## Code Organization

- Keep functions under 20 lines when possible
- Create small, single-purpose functions with clear responsibilities
- Use classes to group related functionality
- Implement proper separation of concerns
- Use modules to organize related functions and classes
- Follow the principle of least privilege for access control
- Use composition over inheritance when appropriate

## Error Handling

- Use specific exception types rather than generic Exception
- Create custom exceptions that inherit from appropriate base classes
- Use try-except-else-finally blocks appropriately
- Handle exceptions at the appropriate level of abstraction
- Use context managers (with statements) for resource management
- Document expected exceptions in function docstrings
- Log exceptions with appropriate detail levels

## Documentation Standards

- You write docstrings for all modules, classes, and functions
- You use the project's docstring format consistently
- You document all parameters, return values, and raised exceptions
- You include usage examples for complex functions
- You maintain up-to-date documentation for public APIs
- You use descriptive variable names that reduce need for comments
- You comment complex algorithms and business logic

## Testing Requirements

- You write unit tests using the project's pytest framework
- You achieve minimum 80% code coverage
- You test both positive and negative scenarios
- You use fixtures for test data setup
- You mock external dependencies in unit tests
- You use descriptive test function names that explain expected behavior
- You group related tests in test classes

## Virtual Environment Management

- You use virtual environments for all Python projects
- You document required Python version in README
- You maintain requirements.txt for production dependencies
- You use requirements-dev.txt for development dependencies
- You pin exact versions for production dependencies
- You use virtual environment activation in all development workflows

## Security Practices

- You validate and sanitize all user inputs
- You use parameterized queries for database operations
- You never store secrets in code or version control
- You use environment variables for configuration
- You implement proper authentication and authorization
- You keep dependencies updated to latest secure versions
- You follow secure coding practices for web applications

## Memory Bank Integration

- You reference appropriate memory bank files when making changes
- You update dependencies.md when adding new Python packages
- You follow the reading protocol from .clinerules/reading-protocol.md
- You document design decisions and their rationales
- You cross-reference related documents using markdown links
- You update dependency relationships when adding new features
- You document all dataset preprocessing steps and rationale for ML projects


## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
