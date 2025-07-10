---
mode: "agent"
tools: ["search","editFiles","runCommands"]
description: "Generate comprehensive TSDoc comments and TypeDoc setup for a TypeScript module"
---

# TSDoc and TypeDoc Prompt

When provided with the TypeScript file `${file}`, perform these tasks:

- Insert multi-line TSDoc comment blocks above every exported symbol, including:
  - `@param` for each parameter.
  - `@returns` for return values.
  - `@remarks` for additional context.
  - `@example` with fenced code blocks demonstrating usage.
  - `@packageDocumentation` for module-level overview.
  Avoid any JSDoc-only tags.  [oai_citation:9‡TSDoc](https://tsdoc.org/?utm_source=chatgpt.com)

- Review or create `tsdoc.json` in the project root with strict parser settings:

  ```jsonc
  {
    "extends": "@microsoft/tsdoc",
    "supportLaxMode": false
  }
  ```

- Review or create typedoc.json at the project root with:

  ```jsonc
  {
    "$schema": "<https://typedoc.org/schema.json>",
    "entryPoints": ["src/index.ts"],
    "out": "docs",
    "tsconfig": "tsconfig.json",
    "includeVersion": true,
    "excludeInternal": false
  }
  ```

- Run the TypeDoc CLI to generate documentation:

  ```bash
  npx typedoc
  ```

- Validate that the generated site uses the specified theme, includes code examples, and correctly links cross-references. If issues arise, update comments or config accordingly.

## Annex A: TSDoc Comprehensive Reference

### Purpose and Scope

TSDoc provides a grammar for TypeScript doc comments using multi-line
`/** ... */` blocks and CommonMark syntax. It offers core tags like
`@param`, `@returns`, `@remarks`, `@example`, `@typeParam`, and
`@inheritDoc` to enable consistent documentation across tooling.

### Configuration (tsdoc.json)

```json
{
  "$schema": "https://github.com/microsoft/json-schemas/blob/main/tsdoc/v0/tsdoc.schema.json",
  "extends": "@microsoft/tsdoc",
  "tagDefinitions": [],
  "supportLaxMode": false
}
```

### Tooling and Linting

- Use `@microsoft/tsdoc` and `eslint-plugin-tsdoc` for validation.

## Annex B: TypeDoc Comprehensive Reference

### Overview

TypeDoc turns TypeScript code and TSDoc comments into HTML or JSON docs.

### CLI Usage

- Generate docs:

```bash
npx typedoc --options typedoc.json
```

- Generate JSON model:

```bash
npx typedoc --json docs/api.json
```

### Configuration (typedoc.json)

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

### Instrumentation Phases

1. Comment Parsing
2. Reflection Generation
3. Rendering
4. Post-Processing
5. Publication Prep

### Plugin Ecosystem

- `typedoc-plugin-markdown`
- `typedoc-plugin-inline-sources`
- `typedoc-plugin-frontmatter` and `typedoc-plugin-remark`

### Best Practices

- Version-control `typedoc.json` and automate docs in CI.
- Combine TSDoc linting with TypeDoc for quality assurance.
