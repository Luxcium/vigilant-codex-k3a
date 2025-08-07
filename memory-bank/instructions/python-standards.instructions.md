---
applyTo: '**/*.py'
---

# Python Coding Standards

## Style Guidelines

- You follow [PEP 8](https://peps.python.org/pep-0008/) style guidelines as the primary reference.
- You use four spaces for indentation.
- You limit lines to 88 characters.
- You name variables, functions, and modules with snake_case.
- You name classes with PascalCase.
- You use UPPER_SNAKE_CASE for module-level constants.
- You prefix private methods and attributes with a leading underscore.
- You use double leading underscores for name mangling when needed.

## Type Annotations

- You add type hints for all function parameters and return types.
- You import types from the typing module when needed.
- You use union types for multiple possible types.
- You use Optional for values that can be None.
- You use List, Dict, Tuple, and Set for generic collections.
- You use Protocol for structural typing.
- You use TypeVar for generic functions and classes.
- You document complex types with type aliases.

## Import Organization

- You order imports as standard library, third-party, then local.
- You group imports by category with blank lines between groups.
- You use absolute imports when possible.
- You avoid wildcard imports.
- You use relative imports only within packages.
- You place imports at the top of the file after the module docstring.
- You use parentheses for multi-line imports.

## Code Organization

- You keep functions under 20 lines when possible.
- You create small, single-purpose functions.
- You use classes to group related functionality.
- You separate concerns clearly.
- You organize related functions and classes into modules.
- You apply the principle of least privilege.
- You prefer composition over inheritance when appropriate.

## Error Handling

- You use specific exception types.
- You create custom exceptions that inherit from base classes when needed.
- You use try-except-else-finally blocks appropriately.
- You handle exceptions at an appropriate level.
- You use context managers for resource management.
- You document expected exceptions in docstrings.
- You log exceptions with appropriate detail.

## Documentation Standards

- You write docstrings for modules, classes, and functions.
- You keep docstring format consistent.
- You document parameters, return values, and raised exceptions.
- You include usage examples for complex functions.
- You maintain up-to-date documentation for public APIs.
- You use descriptive variable names to reduce the need for comments.
- You comment complex algorithms and business logic.

## Testing Requirements

- You write unit tests with the pytest framework.
- You aim for at least 80% code coverage.
- You test positive and negative scenarios.
- You use fixtures for test data setup.
- You mock external dependencies in unit tests.
- You name test functions descriptively.
- You group related tests in classes.

## Virtual Environment Management

- You use virtual environments for all Python projects.
- You document the required Python version in the README.
- You maintain requirements.txt for production dependencies.
- You maintain requirements-dev.txt for development dependencies.
- You pin exact versions for production dependencies.
- You activate the virtual environment in development workflows.

## Security Practices

- You validate and sanitize user inputs.
- You use parameterized queries for database operations.
- You never store secrets in code or version control.
- You use environment variables for configuration.
- You implement authentication and authorization.
- You keep dependencies updated.
- You follow secure coding practices for web applications.

## Memory Bank Integration

- You reference relevant memory bank files when making changes.
- You update dependencies.md when adding Python packages.
- You follow the reading protocol from `.clinerules/reading-protocol.md`.
- You document design decisions and their rationales.
- You cross-reference related documents with links.
- You update dependency relationships when adding features.
- You document dataset preprocessing steps for ML projects.
- You follow patterns documented in systemPatterns.md.
- You ensure all setup is performed via scripts in scripts/ directory.
- You document all architectural decisions in appropriate memory bank files.

## Verification

- You run `markdownlint --strict`.
- You run `scripts/verify-all.sh`.
