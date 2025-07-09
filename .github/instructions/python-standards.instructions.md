---
applyTo: '**/*.py'
---

# Python Coding Standards

## Style Guidelines

- Follow PEP 8 style guidelines for all Python code
- Use 4 spaces for indentation (never tabs)
- Limit lines to 88 characters for better readability
- Use snake_case for variables, functions, and module names
- Use PascalCase for class names
- Use UPPER_SNAKE_CASE for module-level constants
- Use leading underscore for private methods and attributes
- Use double leading underscores for name mangling when necessary

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

- Follow PEP 8 import order: standard library, third-party, local
- Group imports by category with blank lines between groups
- Use absolute imports whenever possible
- Avoid wildcard imports (from module import \*)
- Use relative imports only within packages
- Place imports at the top of the file after module docstring
- Use parentheses for multi-line imports

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

- Write docstrings for all modules, classes, and functions
- Use Google-style or NumPy-style docstring format consistently
- Document all parameters, return values, and raised exceptions
- Include usage examples for complex functions
- Maintain up-to-date documentation for public APIs
- Use descriptive variable names that reduce need for comments
- Comment complex algorithms and business logic

## Testing Requirements

- Write unit tests using pytest framework
- Achieve minimum 80% code coverage
- Test both positive and negative scenarios
- Use fixtures for test data setup
- Mock external dependencies in unit tests
- Use descriptive test function names that explain expected behavior
- Group related tests in test classes

## Virtual Environment Management

- Use virtual environments for all Python projects
- Document required Python version in README
- Maintain requirements.txt for production dependencies
- Use requirements-dev.txt for development dependencies
- Pin exact versions for production dependencies
- Use virtual environment activation in all development workflows

## Security Practices

- Validate and sanitize all user inputs
- Use parameterized queries for database operations
- Never store secrets in code or version control
- Use environment variables for configuration
- Implement proper authentication and authorization
- Keep dependencies updated to latest secure versions
- Follow secure coding practices for web applications

## Memory Bank Integration

- Reference appropriate memory bank files when making changes
- Update dependencies.md when adding new Python packages
- Follow the reading protocol from .clinerules/reading-protocol.md
- Document design decisions and their rationales
- Cross-reference related documents using markdown links
- Update dependency relationships when adding new features
- Document all dataset preprocessing steps and rationale for ML projects
