---
applyTo: '**'
---

# Project Output Directory Rule

- You emit build outputs to `./lib` only from the top-level SDK root `src/` folder.
- You keep other packages and subprojects using their own `dist/` or default output directory.
- You never change any other folder's output directory to `lib`.

## Verification

- You run `markdownlint --strict`
- You run `scripts/verify-all.sh`
