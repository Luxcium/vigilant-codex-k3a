---
applyTo: '**/*.ts, **/*.tsx'
description: 'Formatting and naming conventions for TypeScript code.'
---

# TypeScript Style Guidelines

- Follow Airbnb TypeScript style guide for all TypeScript code
- Use 2 spaces for indentation consistently across all files
- Use semicolons at the end of all statements
- Use single quotes for string literals
- Use template literals for string interpolation
- Use PascalCase for class names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use UPPER_SNAKE_CASE for module-level constants
- Prefix private class members with underscore (_)
- Use meaningful, semantic variable and function names

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
