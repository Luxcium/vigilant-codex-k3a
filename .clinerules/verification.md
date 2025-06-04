# Verification Protocol

## Self-Regulation Checklist
1. Check all Memory Bank files for updates before starting work.
2. Verify that all changes are made via scripts in the scripts/ directory.
3. Validate markdown-lint compliance for all documentation.
4. Confirm that cross-references are up to date across files.
5. Test documentation completeness and consistency.

## Guidance
- Use this checklist before, during, and after each round of work.
- Reference this protocol in activeContext.md, progress.md, and all Memory Bank compliance sections.

### Verify-All Script
Run `scripts/verify-all.sh` to execute:

```bash
scripts/check-markdown.sh
scripts/check-dependencies.sh
scripts/check-memory-bank.sh
```
