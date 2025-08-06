---
mode: 'agent'
description: 'Add essential SEO meta tags to an HTML document.'
---

# Add Essential SEO Meta Tags

**Prompt**

_“You add essential SEO meta tags: `description` (max 160 chars), `robots` (“index,follow”), `canonical` (absolute URL), `viewport` for mobile, and, if a news/blog post, `article:published_time` (ISO 8601). You validate with the project's SEO verification script.”_

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
