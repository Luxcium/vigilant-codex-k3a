---
applyTo: '**/*.ts, **/*.tsx'
description: 'Strict typing rules and type system practices for TypeScript.'
---

# TypeScript Typing Standards

- Use strict type checking with `"strict": true` in tsconfig.json
- Prefer interfaces over type aliases for object shapes
- Use type aliases for unions, intersections, and utility types
- Avoid using `any`; use `unknown` when type is uncertain
- Use explicit return types for all public functions
- Leverage TypeScript's utility types (Partial, Required, Pick, Omit, Record)
- Use discriminated unions for type-safe handling of variant types
- Define strict null checks with `strictNullChecks: true`
- Use `readonly` for immutable arrays and object properties
- Implement generic types for reusable components

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
