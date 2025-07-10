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

---

## Annex A: TSDoc Comprehensive Reference

### Purpose and Scope

The TSDoc specification provides a standardized grammar for TypeScript doc comments, ensuring consistency across toolchains. It supports multi-line comment blocks with embedded CommonMark elements.

### Syntax and Structure

- All doc comments must use the multi-line `/** ... */` syntax; single-line `//` comments are ignored by TSDoc.
- Bodies may include CommonMark constructs such as fenced code blocks (` ```ts `), tables, and headings.
- Tags are distinguished by their syntax kind—block, modifier, or inline—and names must use camelCase following an `@` sign.

### Core Tags

- `@param` – documents function or method parameters.
- `@returns` – describes return values of functions or methods.
- `{@link}` – creates hyperlinks to other API items or external URLs.
- `@remarks` – adds extended notes and context.
- `@example` – includes usage examples in fenced code blocks.
- `@typeParam` – documents generic type parameters.
- `@inheritDoc` – copies documentation from another API item.

### Configuration (`tsdoc.json`)

Place a `tsdoc.json` adjacent to your tsconfig.json with at minimum:

```json
{
  "$schema": "https://github.com/microsoft/json-schemas/blob/main/tsdoc/v0/tsdoc.schema.json",
  "extends": "@microsoft/tsdoc",
  "tagDefinitions": [],
  "supportLaxMode": false
}
```

- The `$schema` reference enables IDE validation.
- `extends`: `@microsoft/tsdoc` pulls in the official TSDoc schema.
- `supportLaxMode`: `false` enforces strict compliance, while `true` allows legacy comments during migration.

### Tooling and Linting

- **@microsoft/tsdoc** – the reference parser implementation for TSDoc.
- **eslint-plugin-tsdoc** – ESLint plugin validating that comments conform to TSDoc.

---

## Annex B: TypeDoc Comprehensive Reference

### Overview

TypeDoc generates documentation from TypeScript source and TSDoc comments, producing HTML or JSON outputs. It follows re-exports and entry points to build a complete model of your API.

### CLI Usage

- **Generate docs (HTML):** `npx typedoc --options typedoc.json`
- **Generate JSON model:** `npx typedoc --json docs/api.json`

### Configuration (`typedoc.json`)

A minimal `typedoc.json` at the project root:

```json
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

TypeDoc also reads options from `package.json:typedocOptions` and `tsconfig.json:typedocOptions`.

### Instrumentation Phases

1. **Comment Parsing** – delegates to the TSDoc/markdown parser to extract AST from comments.
2. **Reflection Generation** – merges TypeScript compiler type data with parsed comments to build a reflection model.
3. **Rendering** – transforms reflections into HTML pages or JSON structures.
4. **Post-Processing** – plugins modify or augment output (e.g., Markdown conversion).
5. **Publication Prep** – output artifacts are ready for deployment or further tooling.

### Plugin Ecosystem

- **typedoc-plugin-markdown** – generates Markdown output.
- **typedoc-plugin-inline-sources** – inlines source code into documentation.
- **typedoc-plugin-frontmatter** and **typedoc-plugin-remark** – add frontmatter and Remark processing.
- Additional utilities and themes exist in the typedoc-plugin-markdown ecosystem.

### Plugin Development

Plugins are Node modules exporting a `load` function that receives the TypeDoc `Application` instance. They can hook into events such as `Converter.EVENT_CREATE_DECLARATION` and renderer hooks (`comment.beforeTags`, `comment.afterTags`) to customize output.

### Best Practices and Integration

- Version-control your `typedoc.json` and reference the official JSON schema.
- Automate documentation generation in CI pipelines via `npx typedoc --options typedoc.json`.
- Combine TSDoc linting (`eslint-plugin-tsdoc`) with TypeDoc in CI to enforce comment quality.

### References

- TSDoc Specification: <https://tsdoc.org/pages/spec/overview/>
- TSDoc JSON Schema: <https://github.com/microsoft/json-schemas/blob/master/tsdoc/v0/tsdoc.schema.json>
- TypeDoc Plugins: <https://typedoc.org/documents/Plugins.html>
- typedoc-plugin-markdown: <https://typedoc-plugin-markdown.org>

## Verification

- `markdownlint --strict` .github/instructions/tsdoc-typedoc.instructions.md
- `scripts/verify-all.sh`
