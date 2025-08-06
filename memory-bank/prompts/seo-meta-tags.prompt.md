---
mode: 'agent'
description: 'Add essential SEO meta tags to an HTML document.'
---

# Add Essential SEO Meta Tags

**Prompt**

_“Add essential SEO meta tags: `description` (max 160 chars), `robots` (“index,follow”), `canonical` (absolute URL), `viewport` for mobile, and, if a news/blog post, `article:published_time` (ISO 8601). Validate with Google Rich Results and Mobile-Friendly tests.”_

## References

- [seo-meta-tags](../instructions/seo-meta-tags.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
