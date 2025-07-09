# Pattern Examples and Implementation Guidance

## Script-Driven Directory Creation

- All directories and files must be created via scripts in the scripts/ directory.
- Scripts must use existence checks (e.g., `[ -d "./memory-bank" ] || mkdir ./memory-bank`).
- Scripts must be idempotent and not overwrite existing files.

```ts
// TypeScript example
import { existsSync, mkdirSync } from 'fs';
const dir = 'logs';
if (!existsSync(dir)) {
  mkdirSync(dir);
}
```

```python
# Python example
import os
dir = 'logs'
if not os.path.isdir(dir):
    os.makedirs(dir)
```

## Markdown-Lint Compliance

- All markdown files must pass strict linting.
- Use markdownlint CLI or VSCode extension.
- Run lint checks before committing documentation.

## Change Propagation

- Changes in one Memory Bank file may require updates in others.
- After updating a file, review related files for consistency.
- Document rationale for cross-file changes in the appropriate rules file.

## Guidance

- Reference these patterns in systemPatterns.md, techContext.md, and all Memory Bank compliance sections.
- See [verification.md](verification.md) for repository checks.
