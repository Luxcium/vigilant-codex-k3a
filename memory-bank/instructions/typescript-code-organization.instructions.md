---
applyTo: '**/*.ts, **/*.tsx'
description: 'Module structure and function organization for TypeScript.'
---

# TypeScript Code Organization

- Keep files under 300 lines; split into multiple files if longer
- Create small, single-purpose functions (≤25 lines)
- Use modular architecture with clear separation of concerns
- Export only what's necessary from modules
- Group related functionality into feature-based directories
- Place utility functions in separate utility modules
- Use dependency injection for testability
- Implement proper error boundaries for React components

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
