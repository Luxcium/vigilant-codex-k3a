---
description: Generate comprehensive TSDoc comments and a robust TypeDoc setup for a TypeScript module
tools: ['search', 'editFiles', 'runCommands', 'codebase-usages']
---

<!-- memory-bank/prompts/tsdoc-typedoc.prompt.md -->

# TSDoc and TypeDoc prompt
Create or repair TSDoc comments and TypeDoc configuration so an AI agent can document a TypeScript module
end to end, validate docs, and emit a browsable site or Markdown API with predictable results.

## Slash Command: /tsdoc-typedoc - generate TSDoc & TypeDoc scaffolding
Activate documentation mode for the current module: ensure valid TSDoc, correct tsdoc.json, working TypeDoc
config, and a reproducible docs build.

> [!IMPORTANT]
> `/tsdoc-typedoc` has been called by the user to generate TSDoc & TypeDoc scaffolding. The state above applies
> for this run.

### Context & Activation
- **Scope:** `${file}` and project docs config in `${workspaceFolder}`.
- **State:** May read repo files, invoke local commands, and edit docs files. Do not publish artifacts.
- **Inputs:** `${file}` must be a `.ts` or `.tsx` file; `${selection}` optional as seed for examples.
- **Safety:** Use only relative links to workspace files. Do not post external links. No publishing.

### Goal
Produce validated TSDoc across exported APIs and a TypeDoc configuration that builds HTML or Markdown docs
without errors, with cross links working, examples rendering, and version metadata included.

### Output format
Return a short status header plus a single fenced block that contains in this order:

1. `tsdoc.json`
2. `typedoc.json` (or `typedoc.config.*`), matching `${input:format}`
3. `package.json` scripts to build docs
4. CLI install and build commands
5. One sample TSDoc block to insert into `${file}`
6. Notes on what changed and why (<= 6 lines)

### Inputs
- `${file}` (required)
- `${selection}` (optional)
- `${input:format}` (html|markdown; default `html`)
- `${input:entry}` (default `src/index.ts`)
- `${input:outDir}` (default `docs`)

### Steps / Rules
- If missing → generate configs; if partial/broken → repair; if already valid → no-op.
- Insert multi line `/** */` TSDoc blocks above every **exported** symbol:
  - Use `@param`, `@returns`, `@remarks`, `@example` with fenced code; `@typeParam` when applicable.
  - Use inline `{@link Symbol}` for cross references; support `@beta`, `@alpha`, `@deprecated`, `@internal`.
- Ensure the package entry file begins with a `@packageDocumentation` block as the first comment.
- Create or fix `tsdoc.json` next to `tsconfig.json` with:
  - `$schema: https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json`.
  - `extends: ["@microsoft/api-extractor/extends/tsdoc-base.json"]`.
  - Optional `supportForTags` or `tagDefinitions` only for tags actually used.
- Create or fix TypeDoc config at repo root:
  - Always include `entryPoints: ["${input:entry}"]`, `out: "${input:outDir}"`, and `includeVersion: true`.
  - For HTML mode, set `$schema: https://typedoc.org/schema.json`.
  - For Markdown mode, set `plugin: ["typedoc-plugin-markdown"]` and
    `$schema: https://typedoc-plugin-markdown.org/schema.json`.
  - For monorepos, allow `entryPointStrategy: "packages"`.
- Validation pipeline:
  - Add `eslint-plugin-tsdoc` and enable its rule to validate comment syntax.
  - Run `npx typedoc` (HTML) or `npx typedoc --plugin typedoc-plugin-markdown` (Markdown) to ensure a clean build.
- Do not invent tags. Only enable custom tags if present in code or agreed in `${selection}`.
- Keep all lines ≤ 120 chars. Use one H1. Keep headings separated by blank lines (markdownlint friendly).

### Examples
**Input:** `${file}=src/math.ts`, `${input:format}=markdown`, `${input:entry}=src/index.ts`  
**Expected Output:** The fenced block includes `tsdoc.json`, `typedoc.json`, package scripts, CLI commands, and
a sample TSDoc for an exported function.

### Edge cases / Stop criteria
- If `${file}` has no exports, add only the `@packageDocumentation` block and generate configs; then stop.
- If configs already validate and build, do nothing.
- Do nothing if already compliant.
