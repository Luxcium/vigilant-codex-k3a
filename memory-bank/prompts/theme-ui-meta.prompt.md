---
description: 'Generate theme UI meta tags for browser theming.'
tools: []
---
> **Prompt**
> _“Add browser-UI theming meta tags: `theme-color` for light +#3367d6 and dark +#101010 (media
> query), `color-scheme` “light dark”, Windows `msapplication-TileColor` #3367d6, and iOS
> `apple-mobile-web-app-status-bar-style` black-translucent. Validate via Lighthouse & webhint.”_

## References

- [theme-ui-meta](../instructions/theme-ui-meta.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
