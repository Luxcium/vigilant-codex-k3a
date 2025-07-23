# Commit Examples

This prompt file contains comprehensive examples of conventional commit messages with gitmoji.

## Feature Commits

**Basic feature addition:**

```
feat(auth): :sparkles: add OAuth2 authentication support
```

**Feature with scope and breaking change:**

```
feat(api)!: :boom: redesign user endpoint structure

BREAKING CHANGE: User endpoints now return nested profile objects instead of flat structures.
All client applications must update their response parsing logic.

Closes #247
```

**Feature enhancement:**

```
feat(shopping-cart): :heavy_plus_sign: add quantity validation for cart items
```

## Bug Fix Commits

**Critical bug fix:**

```
fix(payment): :ambulance: resolve payment gateway timeout issues

Payment processing was failing due to 30-second timeout limit.
Increased timeout to 60 seconds and added retry logic.

Fixes #891
```

**Standard bug fix:**

```
fix(ui): :bug: correct responsive layout on mobile devices
```

**Security fix:**

```
fix(auth): :lock: prevent SQL injection in login endpoint
```

## Performance Commits

**Performance optimization:**

```
perf(database): :zap: optimize user query with indexed lookups

Reduced average query time from 200ms to 15ms by adding composite index
on user_id and created_at columns.
```

**Memory optimization:**

```
perf(cache): :recycle: implement LRU cache for API responses
```

## Refactoring Commits

**Code restructuring:**

```
refactor(components): :art: extract reusable form validation logic

Moved validation functions to shared utilities to reduce code duplication
across 12 form components.
```

**Architecture improvement:**

```
refactor(api): :building_construction: migrate to microservices architecture
```

## Documentation Commits

**Documentation update:**

```
docs(readme): :memo: add installation instructions for Docker setup
```

**API documentation:**

```
docs(api): :memo: update endpoint documentation with new parameters
```

## Build and Configuration Commits

**Dependency update:**

```
build(deps): :arrow_up: upgrade Next.js to v15.1.2

Includes performance improvements and security patches.
```

**CI/CD improvement:**

```
build(ci): :construction_worker: add automated testing for pull requests
```

**Configuration change:**

```
chore(config): :wrench: update TypeScript strict mode settings
```

## Testing Commits

**Test addition:**

```
test(auth): :white_check_mark: add unit tests for password validation

Increases test coverage from 85% to 92% for authentication module.
```

**Test fix:**

```
test(integration): :green_heart: fix flaky database connection tests
```

## Style and Formatting Commits

**Code formatting:**

```
style(components): :art: apply consistent indentation and spacing
```

**Linting fixes:**

```
style(eslint): :rotating_light: resolve linter warnings in utility functions
```

## Maintenance Commits

**Dead code removal:**

```
chore(cleanup): :fire: remove deprecated user profile endpoints

These endpoints were replaced in v2.0 and are no longer used.
```

**Dependency cleanup:**

```
chore(deps): :heavy_minus_sign: remove unused lodash dependency
```

## Special Cases

**Initial commit:**

```
chore: :tada: init
```

**Revert commit:**

```
revert: :rewind: revert "feat(auth): add OAuth2 support"

This reverts commit abc123def456 due to security concerns.
```

**Merge commit:**

```
Merge branch 'feature/oauth2'
```

**Work in progress:**

```
feat(auth): :construction: implement OAuth2 flow (WIP)
```

## Quick Reference Patterns

- **New feature**: `feat(scope): :sparkles: description`
- **Bug fix**: `fix(scope): :bug: description`
- **Critical fix**: `fix(scope): :ambulance: description`
- **Performance**: `perf(scope): :zap: description`
- **Documentation**: `docs(scope): :memo: description`
- **Refactor**: `refactor(scope): :recycle: description`
- **Tests**: `test(scope): :white_check_mark: description`
- **Config**: `chore(scope): :wrench: description`
- **Dependencies**: `build(deps): :arrow_up: description`
- **Breaking change**: `type(scope)!: :boom: description`
