---
applyTo: '**/*.ts, **/*.tsx'
description: 'Error handling rules for TypeScript code.'
---

# TypeScript Error Handling

- Use custom error types that extend `Error`
- Implement proper error handling with `try-catch` blocks
- Use `async/await` for asynchronous operations instead of raw promises
- Handle promise rejections explicitly
- Use `Result<T, E>` pattern for operations that may fail
- Document all possible error states in function signatures

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
