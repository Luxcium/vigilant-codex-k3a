---
applyTo: '**/*.ts, **/*.tsx'
description: 'Memory bank integration rules for TypeScript changes.'
---

# TypeScript Memory Bank Integration

- Reference appropriate memory bank files when making changes
- Update `dependencies.md` when adding new TypeScript dependencies
- Follow the reading protocol from `.clinerules/reading-protocol.md`
- Document design decisions and their rationales
- Cross-reference related documents using markdown links
- Update dependency relationships when adding new features
- Follow patterns documented in `systemPatterns.md`
- Ensure all setup is performed via scripts in `scripts/` directory
- Document all architectural decisions in appropriate memory bank files

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
