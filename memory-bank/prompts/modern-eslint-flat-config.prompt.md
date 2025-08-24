---
description: Modern ESLint Flat Config (2025) — TypeScript, Stylistic, Prettier, and Ubiquitous Plugins
tools: ['codebase', 'usages', 'extensions', 'fetch', 'editFiles', 'search', 'runCommands', 'runTasks', 'todos']
---
# Modern ESLint Flat Config Prompt

description: Modern ESLint v9+ flat-config for TypeScript with stylistic rules as warnings, ubiquitous hygiene plugins, Prettier last, and optional typed linting including VS Code settings and scripts.
  - Optional typed linting (`recommendedTypeChecked`, `projectService: true`)

Inputs
- Package manager: npm, pnpm, or bun (examples use pnpm)
- Node >= 18 (Node >= 22 recommended for TS config ergonomics)
- Repo root with TypeScript source, `tsconfig.json` present for typed linting

Preconditions
- You’re using ESLint flat config (eslint.config.*). See ESLint docs for file precedence and patterns
- If enabling type-aware rules: `tsconfig.json` includes all linted files; otherwise ESLint will warn about missing project inclusion

Steps
1) Install dependencies
2) Create `eslint.config.mjs` with ordered configs
3) Add optional typed-linting variant
4) Configure Prettier and VS Code integration
5) Add npm/pnpm scripts
6) Validate on sample files

Install
- pnpm:
  pnpm add -D eslint @eslint/js typescript typescript-eslint @stylistic/eslint-plugin eslint-plugin-import eslint-plugin-promise eslint-plugin-n eslint-plugin-unused-imports eslint-plugin-unicorn eslint-config-prettier

Config — eslint.config.mjs
- Place in repo root. Keep Prettier config last; set stylistic rules to warn; scope plugin presets by files where needed

  // eslint.config.mjs
  // @ts-check
  import js from '@eslint/js';
  import tseslint from 'typescript-eslint';
  import stylistic from '@stylistic/eslint-plugin';
  import importPlugin from 'eslint-plugin-import';
  import promise from 'eslint-plugin-promise';
  import nodePlugin from 'eslint-plugin-n';
  import unusedImports from 'eslint-plugin-unused-imports';
  import unicorn from 'eslint-plugin-unicorn';
  import prettier from 'eslint-config-prettier/flat';

  export default tseslint.config(
    // Base recommended
    js.configs.recommended,
    tseslint.configs.recommended,

    // Globals and file targeting
    {
      name: 'all-files',
      files: ['**/*.{js,mjs,cjs,ts,tsx}'],
      ignores: ['dist/**', 'coverage/**', '.next/**', 'build/**'],
    },

    // Stylistic as warnings to keep autofix non-blocking
    {
      name: 'stylistic-warn',
      plugins: { '@stylistic': stylistic },
      rules: Object.fromEntries(
        Object.entries(stylistic.configs.recommended.rules ?? {}).map(([k, v]) => [k, 'warn'])
      ),
    },

    // Import hygiene (flat presets exist; scope to TS/JS)
    {
      name: 'import-plugin',
      files: ['**/*.{js,mjs,cjs,ts,tsx}'],
      extends: [importPlugin.flatConfigs.recommended],
      rules: {
        // common niceties
        'import/no-useless-path-segments': 'warn',
        'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      },
    },
    {
      name: 'import-plugin-typescript',
      files: ['**/*.{ts,tsx}'],
      extends: [importPlugin.flatConfigs.typescript],
    },

    // Promises
    {
      name: 'promise-plugin',
      extends: [promise.configs['flat/recommended']],
    },

    // Node runtime rules (choose module/script preset by project style)
    nodePlugin.configs['flat/recommended-module'],

    // Unicorn best practices (use preset to get correct languageOptions)
    unicorn.configs.recommended,

    // Unused imports (split from no-unused-vars; autofix support)
    {
      name: 'unused-imports',
      plugins: { 'unused-imports': unusedImports },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
      },
    },

    // Put Prettier last to disable conflicting rules
    prettier,
  );

Typed Linting (optional)
- Replace the base TS configs with type-checked variants and enable projectService

  // Replace tseslint.configs.recommended with:
  // tseslint.configs.recommendedTypeChecked,
  // and add parser options as below
  {
    name: 'ts-type-aware',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }

Prettier config
- Create `prettier.config.mjs` (ESM) or `.prettierrc` matching your preferences

  // prettier.config.mjs
  /** @type {import('prettier').Config} */
  const config = {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
  };
  export default config;

VS Code settings
- Ensure ESLint v3.0.10+ extension for ESLint v9 flat config support
- Typical `.vscode/settings.json`:

  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
    "eslint.experimental.useFlatConfig": true
  }

Package scripts
- Add convenient scripts to `package.json`:

  {
    "scripts": {
      "lint": "eslint .",
      "lint:fix": "eslint . --fix",
      "format": "prettier . --write",
      "format:check": "prettier . --check"
    }
  }

Validation
- Run: pnpm lint and pnpm format:check
- Create sample files: `src/index.ts`, `src/example.tsx`, `scripts/tool.mjs`
- Verify:
  - Stylistic nits show as warnings and are autofixable
  - Prettier conflicts are disabled; formatting handled by Prettier
  - `unused-imports` removes unused imports and warns on unused vars
  - Import ordering and hygiene rules behave as expected
  - Optional: with typed linting enabled, type-aware rules run without tsconfig inclusion errors

Notes & Constraints
- Keep Prettier config last in ESLint array to neutralize stylistic conflicts
- Use official plugin names when relying on `eslint-config-prettier` to disable conflicts
- `eslint-plugin-unicorn` requires flat config and ESM
- For monorepos, prefer ESLint’s config inspector and file-specific `files` targeting. Consider experimental v10 lookup flag when appropriate

Failure Modes
- Type errors: If `recommendedTypeChecked` is enabled without proper tsconfig inclusion, ESLint reports missing project inclusion — adjust `tsconfig.json` include/glob
- Plugin not updated for ESLint v9: See ESLint compatibility utilities or update the plugin to a v9-compatible release

Examples
- Unused imports are auto-removed with `--fix`
- `import/order` alphabetizes and groups
- Unicorn’s recommended set enforces numerous small correctness and consistency wins

References
- ESLint flat config, migration, patterns: https://eslint.org/docs/latest/use/configure/configuration-files ; https://eslint.org/docs/latest/use/configure/migration-guide
- typescript-eslint quickstart and typed linting: https://typescript-eslint.io/getting-started ; https://typescript-eslint.io/getting-started/typed-linting
- ESLint Stylistic presets and usage: https://eslint.style/guide/config-presets ; https://eslint.style/rules
- import plugin (flat configs, TS): https://www.npmjs.com/package/eslint-plugin-import
- promise plugin flat preset: https://github.com/eslint-community/eslint-plugin-promise
- node plugin presets: https://github.com/eslint-community/eslint-plugin-n
- unused-imports usage: https://www.npmjs.com/package/eslint-plugin-unused-imports
- unicorn usage and presets: https://github.com/sindresorhus/eslint-plugin-unicorn
- Prettier config + eslint-config-prettier (flat): https://prettier.io/docs/configuration ; https://github.com/prettier/eslint-config-prettier

Goal / Plan / Execution Log
- Goal: Deliver a production-ready, flat-config ESLint stack for TS with ubiquitous plugins, Prettier last, stylistic as warnings, and optional typed linting
- Plan:
  1. Install packages and scaffold `eslint.config.mjs`
  2. Add plugin presets (import, promise, n, unicorn) and `unused-imports`
  3. Set `@stylistic` rules to warn and keep Prettier last
  4. Provide typed linting extension and editor/scripts glue
  5. Validate with sample files and iterate
- Execution Log:
  - Imported authoritative docs (ESLint config/migration; typescript-eslint quickstart/typed; Stylistic; import/promise/n/unused-imports/unicorn; Prettier + eslint-config-prettier)
  - Synthesized best practices into a cohesive, ordered flat config
  - Authored optional typed-linting block with `projectService: true` and `tsconfigRootDir`
  - Added VS Code, scripts, and validation checklist
