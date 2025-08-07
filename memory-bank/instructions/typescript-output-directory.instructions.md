---
applyTo: '**/*.ts, **/*.tsx'
description: 'Output directory rule for the TypeScript SDK.'
---

# TypeScript Project Output Directory Rule

- Only the top-level SDK root `src/` must emit build outputs to `./lib`
- All other packages or subprojects use their own `dist/` or default `outDir`
- Do not change `outDir` to `lib` for folders outside the SDK root
- Ensure all build scripts and tasks follow this rule

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
