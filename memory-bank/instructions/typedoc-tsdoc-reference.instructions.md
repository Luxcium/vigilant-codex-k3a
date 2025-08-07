# TSDoc & TypeDoc Comprehensive Reference

## Overview

TSDoc provides a strict standard for TypeScript documentation comments, ensuring consistent API documentation across tools. TypeDoc parses these comments, generating HTML/Markdown sites, and extends TSDoc with additional tags for organization and visibility control.

---

## Key Points

- **TSDoc** standardizes block, modifier, and inline tags for strong TypeScript integration.
- **TypeDoc** accepts all core TSDoc tags and adds tags for grouping, visibility, and enhanced navigation.
- **Intersection tags** work reliably in both; TypeDoc-specific tags give fine-grained site control.
- **Extensibility** through `tsdoc.json` (custom tags) and TypeDoc plugins.

---

## Tag Mapping & Reference

### TSDoc Tags (Core & Extended)

| Tag                   | Type     | Description                                          |
| --------------------- | -------- | ---------------------------------------------------- |
| @param                | Block    | Describes function/method parameter                  |
| @returns              | Block    | Describes return value                               |
| @remarks              | Block    | Detailed explanation or additional info              |
| @example              | Block    | Usage example with code                              |
| @deprecated           | Block    | API is obsolete; suggest alternative                 |
| @see                  | Block    | Cross-reference; use @link for hyperlinks in TypeDoc |
| @throws               | Block    | Exception thrown by function                         |
| @typeParam            | Block    | Generic type parameter description                   |
| @packageDocumentation | Modifier | Module-level package description                     |
| @alpha                | Modifier | Alpha-stage; experimental                            |
| @beta                 | Modifier | Beta-stage; not stable                               |
| @internal             | Modifier | Hidden from public docs                              |
| @virtual              | Modifier | Overridable by subclasses                            |
| @sealed               | Modifier | Prevents subclassing                                 |
| @override             | Modifier | Overrides base class method                          |
| @inheritDoc           | Inline   | Copy documentation from another item                 |
| @link                 | Inline   | Hyperlink to item or URL                             |
| @label                | Inline   | Label for referencing declarations                   |

_For full list, see [TSDoc Tag Reference](https://tsdoc.org/pages/tags/)_

---

### TypeDoc-Specific Tags

| Tag                                                     | Type     | Description                                    |
| ------------------------------------------------------- | -------- | ---------------------------------------------- |
| @category                                               | Block    | Group under a custom header in docs navigation |
| @categoryDescription                                    | Block    | Textual description of a category              |
| @group                                                  | Block    | Group under a custom section in docs           |
| @groupDescription                                       | Block    | Description of a group                         |
| @module                                                 | Block    | File-level comment (legacy/compatibility)      |
| @defaultValue                                           | Block    | Specifies a default value                      |
| @hidden                                                 | Modifier | Exclude from documentation                     |
| @public/@private/@protected                             | Modifier | Visibility control                             |
| @event                                                  | Modifier | Mark as part of "Events" group                 |
| @eventProperty                                          | Modifier | Property returns an event object               |
| @showGroups/@hideGroups/@showCategories/@hideCategories | Modifier | Control grouping/category display in output    |
| @disableGroups                                          | Modifier | Disables grouping for this scope               |
| @experimental                                           | Modifier | Synonym for beta                               |
| @abstract                                               | Modifier | Indicates abstract member                      |
| @readonly                                               | Modifier | Indicates readonly property                    |
| @label/@link/@linkcode/@linkplain                       | Inline   | Linking, referencing, and labeling within docs |

_TypeDoc Tag Reference: [Tags](https://typedoc.org/documents/Tags.html)_

---

## Overlap, Union, and Differences

- **Intersection**: Core tags like `@param`, `@returns`, `@example`, `@deprecated`, `@remarks`, `@typeParam`, `@internal`, `@link`, `@inheritDoc`, `@packageDocumentation`, `@see`, and `@throws` work reliably in both TSDoc and TypeDoc.
- **TypeDoc Extensions**: TypeDoc’s tags control documentation output structure (`@category`, `@group`, `@hidden`, etc.) and navigation.
- **TSDoc Specialization**: Tags like `@virtual`, `@sealed`, and `@override` are honored only by advanced static analysis or code extraction tools.
- **Differences**:
  - TypeDoc supports more flexible Markdown and JSDoc compatibility (via `--jsDocCompatibility`).
  - TSDoc is stricter; TypeDoc can interpret but does not enforce strict compliance unless configured.

---

## Customization & Plugins

- **Custom tags**: Define in `tsdoc.json` with `tagDefinitions` and extend TypeDoc via plugins ([TypeDoc Plugins](https://typedoc.org/guides/plugins/)).
- **Key plugins**:
  - `typedoc-plugin-markdown`: Markdown output
  - `typedoc-plugin-custom-tags`: Add new tags
  - `typedoc-plugin-toc-group`, `typedoc-plugin-single-line-tags`, etc.

- **Example plugin config in `typedoc.json`**:

  ```json
  {
    "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-custom-tags"]
  }
  ```

---

## Practical Guidance

- **Prefer core/intersection tags** for portability between tools.
- **Use TypeDoc-specific tags** for enhanced organization/navigation as needed.
- **Adopt strict formatting** for block, modifier, and inline tags (see [TSDoc Spec](https://tsdoc.org/pages/spec/tag_kinds/)).
- **Maintain documentation hygiene**: Always validate cross-links and ensure docs pass `markdownlint --strict` and TypeDoc emits zero warnings.

---

## Official Documentation & Examples

- [TSDoc Tags](https://tsdoc.org/pages/tags/)
- [TypeDoc Tags](https://typedoc.org/documents/Tags.html)
- [TypeDoc API](https://typedoc.org/api/index.html)
- [TypeDoc Examples](https://typedoc.org/example/index.html)
- [TSDoc Playground](https://microsoft.github.io/tsdoc/)

---

## Example

````ts
/**
 * Calculates factorial for a positive integer.
 * @param n - The number to calculate.
 * @returns The factorial of n.
 * @remarks Accepts only positive integers.
 * @example
 * ```ts
 * factorial(4) // => 24
 * ```
 * @group Math Functions
 */
function factorial(n: number): number {
  return n === 0 ? 1 : n * factorial(n - 1);
}
````

TypeDoc renders this as a doc page with description, params, returns, remarks, example, and group.

---

## Summary

TSDoc and TypeDoc together support comprehensive TypeScript documentation. Use intersection tags for maximum portability, extend with TypeDoc tags for advanced site control, and always lint and validate docs for cross-tool robustness.
