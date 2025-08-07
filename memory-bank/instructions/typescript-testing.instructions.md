---
applyTo: '**/*.ts, **/*.tsx'
description: 'Testing requirements for TypeScript code.'
---

# TypeScript Testing Standards

- Write unit tests for all business logic
- Use Jest with TypeScript for testing framework
- Achieve minimum 80% code coverage
- Test both positive and negative scenarios
- Mock external dependencies in unit tests
- Use descriptive test names that explain expected behavior

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
