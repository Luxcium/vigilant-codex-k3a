---
description: Create, audit, or repair an ESLint flat config setup integrating TypeScript, stylistic rules, and Prettier with all stylistic rules downgraded to warnings.
---

<!-- memory-bank/prompts/setup-eslint-flat-config.prompt.md -->

# Setup Eslint Flat Config

> Slash command: /setup-eslint-flat-config

## Intent

Provide a repeatable procedure to install dependencies, generate a modern ESLint flat config (`eslint.config.mjs`) combining ESLint core, TypeScript-ESLint, stylistic plugin, and Prettier, downgrade stylistic rules to warnings, and validate the setup.

## Inputs

- Required: User confirmation of project root path (implicit `.`) or existing `eslint.config.mjs` for audit.
- Optional: Existing partial flat config content to merge.
- Optional: Flag `--audit` to produce an audit and repaired file.

## Preconditions

- You are in a Node.js / TypeScript project using `pnpm`.
- No legacy `.eslintrc.*` should remain (remove or ignore them if present).
- Node version supports ESLint v9+ (flat config) and TypeScript version ≥ the installed peer requirement.
- Write access to project root to create or overwrite `eslint.config.mjs`.

## Steps

1. Install dependencies.
2. Create (or back up + replace) `eslint.config.mjs`.
3. Import required configs and plugins.
4. Combine ESLint recommended + TypeScript-ESLint recommended via `tseslint.config(...)`.
5. Load stylistic plugin and transform each stylistic rule into a namespaced warning rule.
6. Append Prettier recommended config and Prettier flat overrides last.
7. Verify stylistic rules object existence; if undefined, fall back to an empty object and note.
8. Run ESLint in list mode and then with `--fix`.
9. Report summary and next actions.

## Output Format

- Primary: Complete `eslint.config.mjs` file content.
- Secondary (audit mode): Audit Report section followed by corrected config.
- Provide copy-paste pnpm install command block.
- Provide sample lint commands.

## Constraints

- Do not pin versions; always use `@latest` per workspace policy.
- Keep stylistic rules at `warn`, not `error`.
- Do not introduce non-requested plugins or configs.
- Preserve existing custom rules if auditing (append after generated blocks).
- Ensure Prettier configs come after other configs to disable conflicts.
- Maintain ≤120 chars per line.

## Failure Modes and Recovery

- Missing dependency → Re-run install command; verify `node_modules` exists.
- Stylistic config missing rules object → Use empty object and log a note comment.
- TypeScript-ESLint peer mismatch → Update `typescript` to latest and reinstall.
- Prettier conflicts still reported → Ensure `prettierRecommended` and `prettierConfigFlat` are last entries.
- Legacy `.eslintrc` still applied → Delete or rename legacy config files.

## Examples

### Example 1 – Fresh Setup

Input: (no existing config) Execute procedure.

Expected Output:

```
# Install
pnpm add -D eslint@latest @eslint/js@latest typescript@latest typescript-eslint@latest \
  @stylistic/eslint-plugin@latest eslint-plugin-prettier@latest eslint-config-prettier@latest

# Config file (excerpt)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfigFlat from 'eslint-config-prettier/flat';

export default [
  tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ),
  {
    plugins: { '@stylistic': stylistic },
    rules: Object.fromEntries(
      Object.entries(stylistic.configs?.recommended?.rules ?? {})
        .map(([rule]) => [`@stylistic/${rule}`, 'warn'])
    ),
  },
  prettierRecommended,
  prettierConfigFlat,
];
```

### Example 2 – Audit and Repair

Input: Existing file missing Prettier and using errors for stylistic rules.

Expected Output: Audit report citing missing Prettier configs and severity mismatch; repaired file with Prettier entries appended and stylistic rules transformed to `warn`.

## pnpm Install Command

```
pnpm add -D eslint@latest @eslint/js@latest typescript@latest typescript-eslint@latest \
  @stylistic/eslint-plugin@latest eslint-plugin-prettier@latest eslint-config-prettier@latest
```

## Generated eslint.config.mjs Template

```javascript
// eslint.config.mjs
import eslint from '@eslint/js'; // Core ESLint recommended sets
import tseslint from 'typescript-eslint'; // Parser + plugin + helpers for TS
import stylistic from '@stylistic/eslint-plugin'; // Stylistic rule collection (eslint.style)
import prettierRecommended from 'eslint-plugin-prettier/recommended'; // Runs Prettier as a rule + disables conflicts
import prettierConfigFlat from 'eslint-config-prettier/flat'; // Final override to disable remaining conflicts

export default [
  // Base recommended rules: ESLint + TS
  tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ),
  // Stylistic rules downgraded to warnings to enable non-blocking auto-fix
  {
    plugins: { '@stylistic': stylistic },
    rules: Object.fromEntries(
      Object.entries(stylistic.configs?.recommended?.rules ?? {})
        .map(([rule]) => [`@stylistic/${rule}`, 'warn'])
    ),
  },
  // Prettier integration (must remain last to win conflict resolution)
  prettierRecommended,
  prettierConfigFlat,
];
```

## Lint Commands

```
pnpm exec eslint . --ext .js,.ts,.jsx,.tsx
pnpm exec eslint . --ext .js,.ts,.jsx,.tsx --fix
```

## Verification

- All dependencies installed.
- File `eslint.config.mjs` present at project root.
- Running first command shows stylistic warnings (not errors).
- Running second command reduces or clears warnings via auto-fix.
- No conflicting style errors remain.
