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

> [!WARNING]
> Urgent info that needs your immediate attention to avoid problems:
> Emoji depends more on the type of change than the scope, so choose the type first and then the emoji, independently, those examples below are only guidelines.

- `build` - Build system (`:construction_worker:`, `:arrow_up:`, `:arrow_down:`)
- `chore` - Maintenance (`:wrench:`, `:fire:`, `:heavy_plus_sign:`, `:heavy_minus_sign:`)
- `fix` - Bug fixes (`:bug:`, `:ambulance:` for critical)
- `refactor` - Code restructuring (`:recycle:`, `:building_construction:`)
- `docs` - Documentation (`:memo:`)
- `feat` - New features (`:sparkles:`)
- `style` - Code formatting (`:art:`, `:rotating_light:`)
- `perf` - Performance improvements (`:zap:`)
- `test` - Testing (`:white_check_mark:`, `:green_heart:`)

## Essential Gitmoji

| Emoji | Code                 | Usage                  |
| ----- | -------------------- | ---------------------- |
| 🐛    | `:bug:`              | Bug fixes              |
| 🚑    | `:ambulance:`        | Critical hotfix        |
| 📝    | `:memo:`             | Documentation          |
| 🎨    | `:art:`              | Code structure/format  |
| ⚡     | `:zap:`              | Performance            |
| 🔥    | `:fire:`             | Remove code/files      |
| ♻️    | `:recycle:`          | Refactor Anything      |
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

# Build/Dependencies
build(deps): :arrow_up: upgrade Next.js to v15.1.2

# Testing
test(auth): :white_check_mark: add unit tests
```

> [!IMPORTANT]
> Refactoring commits are about changes into the code folders, for programming language refactorings and not others, it must focus on improving the code structure without changing its behavior.

```bash
# Refactoring
refactor(components): :art: extract validation logic
```

> [!IMPORTANT]
> Chores should not include any functional changes, only maintenance tasks, outside of the coding folders.

```bash
# Chores
chore(ci): :wrench: update GitHub Actions workflow
```

## Breaking Changes

Add `!` before `:` and include `BREAKING CHANGE:` in footer:

```bash
feat(api)!: :boom: remove legacy endpoints

BREAKING CHANGE: Legacy v1 endpoints removed. Use v2 API.

Closes #123
```

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji Guide](https://gitmoji.dev/)
- [Complete Gitmoji Selection](../prompts/gitmoji-complete-list.prompt.md)
- [Commit Examples](../prompts/commit-examples.prompt.md)
- [Breaking Changes Guide](../prompts/breaking-changes.prompt.md)
