---
applyTo: "**/*.ts"
description: "Comprehensive guidelines for TSDoc comments and TypeDoc configuration"
---

# TSDoc and TypeDoc Standards

## TSDoc Comment Conventions

- Use the multi-line `/** … */` syntax for all exported declarations. Single-line `//` comments are not supported by TSDoc and will be ignored.  [oai_citation:2‡TSDoc](https://tsdoc.org/pages/intro/approach/?utm_source=chatgpt.com)
- Include only TSDoc-defined tags: `@param`, `@returns`, `@remarks`, `@example`, `@deprecated`, `@internal`, `@beta`, `@alpha`, `@packageDocumentation`, and `{@link}`. Avoid any JSDoc-only tags or legacy annotations.  [oai_citation:3‡TSDoc](https://tsdoc.org/?utm_source=chatgpt.com)
- Embed CommonMark markdown for elements such as code fences, lists, and links. Ensure that code examples use fenced blocks with appropriate language identifiers (e.g., ```ts).  [oai_citation:4‡TSDoc](https://tsdoc.org/pages/intro/approach/?utm_source=chatgpt.com)
- Use inline tags like `{@link path|text}` for cross-references and `{@inheritDoc}` for documentation inheritance. Do not invent custom inline tag syntaxes.  [oai_citation:5‡TSDoc](https://tsdoc.org/?utm_source=chatgpt.com)

## Example TSDoc Block

```ts
/**
 * Calculates the sum of two numbers.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of `a` and `b`.
 * @remarks This method is part of the core utilities.
 * @example
 * ```ts
 * const result = add(2, 3);
 * console.log(result); // 5
 * ```
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

## TypeDoc Configuration

Place a typedoc.json at the project root with these minimal settings to generate documentation:

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "tsconfig": "tsconfig.json",
  "includeVersion": true,
  "excludeInternal": false
}
```

TypeDoc supports additional options such as themes, plugin integration, and CLI overrides.

## TSDoc Configuration for Tooling

Include a tsdoc.json adjacent to tsconfig.json to configure parser modes:

```json
{
  "extends": "@microsoft/tsdoc",
  "tagDefinitions": [],
  "supportLaxMode": false
}
```

Use "supportLaxMode": true during migration to allow existing non-compliant comments to be parsed without errors.

## Enforcement and Linting

Integrate @microsoft/tsdoc for parsing and validation. Tools like ESLint can enforce TSDoc rules via plugins. Configure tsdoc.json paths in build pipelines to fail on syntax violations. Provide developer feedback by enabling strict mode in the TSDoc parser.

## TSDoc and TypeDoc: Comprehensive Reference

### TSDoc

#### Purpose and Scope

The TSDoc specification standardizes doc comments in TypeScript code. Use the multi-line `/** ... */` syntax and embed CommonMark elements such as fenced code blocks and lists.

#### Core Tags

- `@param` — documents parameters.
- `@returns` — describes return values.
- `@remarks` — provides extended notes.
- `@example` — shows usage examples in fenced blocks.
- `@deprecated`, `@internal`, `@beta`, `@alpha` — indicate stability and audience.
- `@packageDocumentation` — module-level comments.
- Inline tags `{@link url|text}` and `{@inheritDoc}` enable cross-references and inheritance.

#### Configuration: tsdoc.json

```jsonc
{
  "$schema": "https://github.com/microsoft/json-schemas/blob/main/tsdoc/v0/tsdoc.schema.json",
  "extends": "@microsoft/tsdoc",
  "tagDefinitions": [],
  "supportLaxMode": false
}
```

Use `supportLaxMode: true` temporarily during migration to accept non-compliant comments.

### Tooling

- **@microsoft/tsdoc** for parsing and validation.
- **@microsoft/tsdoc-config** to load `tsdoc.json`.
- **eslint-plugin-tsdoc** to enforce syntax rules in CI.

### TypeDoc

#### Overview

TypeDoc converts TypeScript and TSDoc comments into HTML or JSON documentation. It follows entry points to build an API model and supports plugins for extended functionality.

#### Configuration: typedoc.json

```jsonc
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "tsconfig": "tsconfig.json",
  "includeVersion": true,
  "excludeInternal": false,
  "plugin": ["typedoc-plugin-markdown"]
}
```

Run `npx typedoc` to generate HTML or add `--json docs/api.json` for a JSON model.

#### Instrumentation Phases

1. **Comment Parsing** — TSDoc parser extracts comments.
2. **Reflection Generation** — TypeScript types merge with comments.
3. **Rendering** — output HTML pages or JSON structures.
4. **Post-Processing** — plugins transform or augment output.
5. **Publication** — deploy generated documentation.

#### Plugins Ecosystem

- `typedoc-plugin-markdown` — generate Markdown output.
- `typedoc-plugin-inline-sources` — inline source code.
- `typedoc-plugin-frontmatter` and `typedoc-plugin-remark` — add frontmatter and Remark processing.

### Best Practices

- Adhere strictly to TSDoc tags; avoid JSDoc-only patterns.
- Enforce comment style in CI using `eslint-plugin-tsdoc`.
- Reference official JSON schemas in `tsdoc.json` and `typedoc.json`.
- Use watch mode (`typedoc --watch`) for iterative documentation editing.

## Verification

Run `npx markdownlint .github/instructions/tsdoc-typedoc.instructions.md` and `scripts/verify-all.sh` after any update.
