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

## Annex A: TSDoc Comprehensive Reference

- **Purpose and Scope**: TSDoc defines a grammar for TypeScript doc comments using
  multi-line blocks with CommonMark support to enable tooling interoperability.
- **Syntax**: comments use `/** */` delimiters exclusively and may embed fenced
  code, lists and headings.
- **Core Tags**: `@param`, `@returns`, `@remarks`, `@example`, `@deprecated`,
  `@internal`, `@beta`, `@alpha`, `@packageDocumentation`, `@typeParam`,
  `@inheritDoc` and inline `{@link}`.
- **Configuration**: place a `tsdoc.json` next to `tsconfig.json` with the
  `$schema` reference `https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json`.
- **Tooling**: use `@microsoft/tsdoc` for parsing, `@microsoft/tsdoc-config` to
  load definitions and `eslint-plugin-tsdoc` to lint comments.

## Annex B: TypeDoc Comprehensive Reference

- **Overview**: TypeDoc converts TypeScript sources and TSDoc comments into HTML
  or JSON documentation models.
- **Configuration**: `typedoc.json` should reference
  `https://typedoc.org/schema.json` and can include plugins such as
  `typedoc-plugin-markdown`.
- **CLI Usage**:
  - Generate HTML with `npx typedoc` or `typedoc --options typedoc.json`.
  - Produce a JSON model with `npx typedoc --json docs/api.json`.
- **Instrumentation Phases**: comment parsing, reflection generation, rendering,
  post-processing via plugins and publication.
- **Plugin Ecosystem**: community plugins provide Markdown output, inline source
  code and custom themes.
- **Best Practices**: enforce strict TSDoc syntax in CI and version-control both
  configuration files.

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
