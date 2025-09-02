---
applyTo: '**/*.ts, **/*.tsx'
description: 'Import ordering and export conventions for TypeScript.'
---

# TypeScript Import Management

- Organise imports in this order: standard library, third-party, local
- Use absolute imports with path mapping when available
- Group imports by type (values, types, defaults)
- Use named exports over default exports for better refactoring
- Avoid circular dependencies; document if unavoidable

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
