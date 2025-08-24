---
description: 'Generate icon and link tags for all platforms.'
tools: []
---
# Add General Icon Link Tags

**Prompt**

_“Add universal icon link tags: favicon.ico (16/32 px), SVG icon, PNGs at 32, 48, 96, 192, 512 px, apple-touch-icon (180 px), manifest, and shortcut icon fallback. Check with RealFaviconGenerator and browser preview.”_

## References

- [general-icon-link-tags](../instructions/general-icon-link-tags.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
