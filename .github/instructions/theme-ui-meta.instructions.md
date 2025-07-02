---
applyTo: "**/*"
description: "Detailed instructions for browser-UI theming meta tags"
---

# Theme UI Meta Tags

## Overview 🔗 `#overview`
Modern web applications use meta tags like `theme-color`, `color-scheme`, and platform-specific variants to tint browser UI elements such as address bars, navigation buttons, and Safari tab bars. These tags enhance user experience by aligning browser UI with the application's branding and supporting light/dark mode preferences. Recent updates include Safari 15 desktop support and Chrome's heuristics for dark mode. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color), [web.dev](https://web.dev/articles/color-scheme), [css-tricks.com](https://css-tricks.com/safari-15-new-ui-theme-colors-and-a-css-tricks-cameo))

## Key Meta Tags 🔗 `#meta-tags`
| Tag                                     | Example                                                                           | Supported browsers              | Notes                                                                                                                         |
| --------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `theme-color`                           | `<meta name="theme-color" content="#3367d6">`                                     | Chrome, Edge, Safari 15+, Opera | Accepts any CSS color; media attr allows light/dark variants since Safari 15 ([css-tricks.com](https://css-tricks.com/meta-theme-color-and-trickery), [html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/semantics.html)) |
| `color-scheme`                          | `<meta name="color-scheme" content="light dark">`                                 | Chrome 104+, Safari 15+, FF 95+ | Opt-in to UA dark-UI defaults ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme), [web.dev](https://web.dev/articles/color-scheme))                                                      |
| `msapplication-navbutton-color`         | `<meta name="msapplication-navbutton-color" content="#2b5797">`                   | Edge / IE pinned-site           | Tints back/forward buttons on Windows tiles ([wiki.whatwg.org](https://wiki.whatwg.org/wiki/MetaExtensions))                                                            |
| `msapplication-TileColor`               | `<meta name="msapplication-TileColor" content="#2b5797">`                         | Windows Start tiles             | Fallback for `browserconfig.xml` ([stackoverflow.com](https://stackoverflow.com/questions/33701823/chrome-mobile-color-bar-theme-color-meta-tag-not-working))                                                                     |
| `apple-mobile-web-app-status-bar-style` | `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` | iOS home-screen web-apps        | Works only if `apple-mobile-web-app-capable=yes` ([stackoverflow.com](https://stackoverflow.com/questions/33701823/chrome-mobile-color-bar-theme-color-meta-tag-not-working))                                                     |

## Dark-/Light-Variant Patterns 🔗 `#variants`
Explain two patterns:

* **Multiple meta tags** with `media="(prefers-color-scheme: …)"` (Safari 15+) ([css-tricks.com](https://css-tricks.com/safari-15-new-ui-theme-colors-and-a-css-tricks-cameo))
* **JavaScript swap** for older Chrome (modify `<meta>` on `matchMedia` change) – add code snippet.
  Warn that Chrome ignores `media` attr today; file a crbug link for tracking. ([html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/semantics.html))

## Accessibility & Contrast 🔗 `#contrast`
List WCAG AA contrast thresholds for address-bar text; advise testing both OS themes.
Reference Google Dev contrast blog ([developer.chrome.com](https://developer.chrome.com/docs/css-ui/css-color-mix)) and webhint recommendation to stay above 4.5:1 on toolbar icons ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)).

## Validation Workflow 🔗 `#validation`
```bash
# Lighthouse: checks theme-color & color-scheme
npx lighthouse https://example.com --preset=pwa --view

# webhint CLI meta checks
npx hint https://example.com --hint meta-theme-color
```
Mention Edge DevTools “Rendering → Emulate prefers-color-scheme” panel for manual tests. ([learn.microsoft.com](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/overview))

## Boilerplate Head Block 🔗 `#boilerplate`
Provide a fenced `html` snippet containing:

* two `theme-color` tags (light / dark via `media=`),
* a `color-scheme` tag,
* Windows meta fallback,
* inline comments for each line.

## Dynamic-Update Snippet 🔗 `#dynamic-update`
Show a minimal ES module updating `theme-color` on dark-mode toggle; include DOM API caveat that Safari desktop caches value until tab refresh. Cite StackOverflow workaround ([css-tricks.com](https://css-tricks.com/forums/topic/how-to-change-meta-theme-dynamically-with-css)).

## Gotchas 🔗 `#gotchas`
* Service-workers can’t modify meta after first paint; do in root HTML.
* Android Chrome ignores non-opaque colors (e.g., `rgba()` with alpha). ([css-tricks.com](https://css-tricks.com/meta-theme-color-and-trickery))
* Edge on Android still honours `msapplication-navbutton-color` over `theme-color` in some builds prior to 122. ([stackoverflow.com](https://stackoverflow.com/questions/33701823/chrome-mobile-color-bar-theme-color-meta-tag-not-working))

## Further Reading 🔗 `#further-reading`
Bullet links to MDN color-scheme doc ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme)), WHATWG MetaExtensions list ([wiki.whatwg.org](https://wiki.whatwg.org/wiki/MetaExtensions)), CSS-Tricks meta-theme article ([css-tricks.com](https://css-tricks.com/meta-theme-color-and-trickery)), web.dev color-scheme article ([web.dev](https://web.dev/articles/color-scheme)), and Microsoft pinned-site spec ([learn.microsoft.com](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/overview)).
