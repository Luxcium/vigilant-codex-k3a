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

- Use multi-line `/** */` blocks with CommonMark syntax.
- Key tags: `@param`, `@returns`, `@remarks`, `@example`, `@deprecated`,
  `@internal`, `@beta`, `@alpha`, `@packageDocumentation`, `@typeParam`,
  `@inheritDoc`, `{@link}`.
- Configure strict parsing via `tsdoc.json` next to `tsconfig.json`.

## Annex B: TypeDoc Comprehensive Reference

- `typedoc.json` references `https://typedoc.org/schema.json` and may load
  plugins such as `typedoc-plugin-markdown`.
- Build HTML with `npx typedoc` or generate JSON using
  `npx typedoc --json docs/api.json`.
- Documentation rendering proceeds through parsing, reflection, rendering,
  plugin post-processing and final publication.

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
