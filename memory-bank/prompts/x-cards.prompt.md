---
mode: 'agent'
tools: ['codebase']
description: 'Add or update X Cards meta tags in HTML head sections'
---

# Add X Cards Meta Tags

## Context

- X Cards (formerly Twitter Cards) require static `<meta>` tags in `<head>` to enable rich
  previews on X.
- Tags must be present in every HTML entry file (`public/index.html`, `src/**/*.html`).
- Project uses HTTPS and has assets hosted at accessible URLs.

## Requirements

- Insert the following tags if missing or update existing ones:
  ```html
  <meta name="twitter:card" content="summary_large_image" />
  <!-- Card type -->
  <meta name="twitter:title" content="${pageTitle}" />
  <!-- Title (≤70 chars) -->
  <meta name="twitter:description" content="${pageDescription}" />
  <!-- Desc (≤200 chars) -->
  <meta name="twitter:image" content="${imageUrl}" />
  <!-- Preview image (<5MB) -->
  <meta name="twitter:image:alt" content="${imageAlt}" />
  <!-- Accessibility alt text -->
  ```
- Use project metadata (`package.json` or site config) to fill `${pageTitle}`,
  `${pageDescription}`, and default `${imageUrl}`.

## Process

1. **Scan** HTML files in `public/` and `src/` for existing `twitter:` tags.
2. **Insert** missing tags immediately after `<title>` or existing meta group.
3. **Validate** with `curl -I ${url} | grep twitter:` to confirm presence.
4. **Commit** changes with message "chore: add X Cards meta tags".

## Success Criteria

- All HTML entry points contain the required X Cards `<meta>` tags.
- Tag values use correct syntax and HTTPS URLs.
- Verified via HTTP header inspection.

> **Note:** Run X’s Card Validator at https://cards-dev.twitter.com/validator to verify rendering.

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
