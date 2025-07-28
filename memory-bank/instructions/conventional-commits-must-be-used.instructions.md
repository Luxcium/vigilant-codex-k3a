---
applyTo: '**'
description: 'Mandatory conventional commit protocol with gitmoji for all commit messages.'
---

# Conventional Commit Messages

> [!CRITICAL]
> **EVERY COMMIT MUST INCLUDE GITMOJI** - NO EXCEPTIONS
>
> Format: `<type>[(<scope>)]: <:gitmoji:> <description>`

## Required Format

```
<type>[(<optional scope>)]: <:gitmoji:> <description>

[optional body]

[optional footer]
```

## Commit Types

Chose the best candidate for the given commit:

- `feat` - New features (`:sparkles:`)
- `fix` - Bug fixes (`:bug:`, `:ambulance:` for critical)
- `docs` - Documentation (`:memo:`)
- `style` - Code formatting (`:art:`, `:rotating_light:`)
- `refactor` - Code restructuring (`:recycle:`, `:building_construction:`)
- `perf` - Performance improvements (`:zap:`)
- `test` - Testing (`:white_check_mark:`, `:green_heart:`)
- `build` - Build system (`:construction_worker:`, `:arrow_up:`, `:arrow_down:`)
- `chore` - Maintenance (`:wrench:`, `:fire:`, `:heavy_plus_sign:`, `:heavy_minus_sign:`)

## Essential Gitmoji

| Emoji | Code                 | Usage                  |
| ----- | -------------------- | ---------------------- |
| 🐛    | `:bug:`              | Bug fixes              |
| 🚑    | `:ambulance:`        | Critical hotfix        |
| 📝    | `:memo:`             | Documentation          |
| 🎨    | `:art:`              | Code structure/format  |
| ⚡    | `:zap:`              | Performance            |
| 🔥    | `:fire:`             | Remove code/files      |
| ♻️    | `:recycle:`          | Refactor code          |
| ✅    | `:white_check_mark:` | Tests                  |
| 🔧    | `:wrench:`           | Configuration          |
| ⬆️    | `:arrow_up:`         | Upgrade dependencies   |
| ⬇️    | `:arrow_down:`       | Downgrade dependencies |
| 💥    | `:boom:`             | Breaking changes       |
| 🚨    | `:rotating_light:`   | Fix warnings           |
| 💚    | `:green_heart:`      | Fix CI                 |
| 🔒    | `:lock:`             | Security fixes         |
| ✨    | `:sparkles:`         | New features           |

## Examples

```bash
# Features
feat(auth): :sparkles: add OAuth2 authentication support
feat(api)!: :boom: redesign user endpoint structure

# Bug Fixes
fix(payment): :ambulance: resolve payment gateway timeout
fix(ui): :bug: correct responsive layout

# Documentation
docs(readme): :memo: add installation instructions

# Performance
perf(database): :zap: optimize user queries

# Refactoring
refactor(components): :art: extract validation logic

# Build/Dependencies
build(deps): :arrow_up: upgrade Next.js to v15.1.2
chore(deps): :heavy_minus_sign: remove unused lodash

# Testing
test(auth): :white_check_mark: add unit tests
```

## Breaking Changes

Add `!` before `:` and include `BREAKING CHANGE:` in footer:

```
feat(api)!: :boom: remove legacy endpoints

BREAKING CHANGE: Legacy v1 endpoints removed. Use v2 API.

Closes #123
```

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji Guide](https://gitmoji.dev/)
- [Complete Gitmoji List](../prompts/gitmoji-complete-list.prompt.md)
- [Commit Examples](../prompts/commit-examples.prompt.md)
- [Breaking Changes Guide](../prompts/breaking-changes.prompt.md)
