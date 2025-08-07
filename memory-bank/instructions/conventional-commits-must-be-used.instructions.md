---
applyTo: '**'
description: 'Mandatory for all commit messages: Conventional commit protocol with gitmoji MUST BE USED.'
---

# Conventional Commit Messages

## Required Format

- You write commit messages as `<type>[(scope)]: <gitmoji> description`.
- You include a gitmoji that reflects the change.
- You use commit types only for their defined purposes.

## Commit Types

- You use `build` for build system changes.
- You use `chore` for maintenance tasks outside code.
- You use `fix` for bug fixes.
- You use `refactor` only for code restructuring.
- You use `docs` only for user-facing documentation.
- You use `feat` for new features.
- You use `style` for code formatting.
- You use `perf` for performance improvements.
- You use `test` for testing.

## Essential Gitmoji

| Emoji | Code | Usage |
| ----- | ----------------- | ----- |
| 🐛 | `:bug:` | Bug fixes |
| 🚑 | `:ambulance:` | Critical hotfix |
| 📝 | `:memo:` | Documentation |
| 🎨 | `:art:` | Code style |
| ⚡ | `:zap:` | Performance |
| 🔥 | `:fire:` | Remove code or files |
| ♻️ | `:recycle:` | Refactor |
| ✅ | `:white_check_mark:` | Tests |
| 🔧 | `:wrench:` | Configuration |
| ⬆️ | `:arrow_up:` | Upgrade dependencies |
| ⬇️ | `:arrow_down:` | Downgrade dependencies |
| 💥 | `:boom:` | Breaking changes |
| 🚨 | `:rotating_light:` | Fix warnings |
| 💚 | `:green_heart:` | Fix CI |
| 🔒 | `:lock:` | Security fixes |
| ✨ | `:sparkles:` | New features |

## Examples

```bash
feat(auth): :sparkles: add OAuth2 support
fix(ui): :bug: correct responsive layout
chore(ci): :wrench: update workflow
```

## Breaking Changes

- You add `!` before `:` when a commit introduces a breaking change.
- You include a `BREAKING CHANGE:` footer that describes the impact.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
