---
applyTo: '**/*.ts, **/*.tsx'
description: 'Documentation requirements for TypeScript APIs.'
---

# TypeScript Documentation Requirements

- Add JSDoc comments for all public APIs
- Document complex algorithms and business logic
- Include parameter and return type descriptions in JSDoc
- Document side effects and potential exceptions
- Maintain up-to-date documentation for public interfaces
- Include usage examples for non-trivial APIs
- Document breaking changes in version updates

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
