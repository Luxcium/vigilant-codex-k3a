---
applyTo: "**/*"
---

# One-Page “When to Use What” Matrix

This matrix condenses all key manifest and meta configurations into a single reference, mapping eleven integration goals—from installable PWAs and iOS Web Clips to Chrome Extension MV3 and legacy platforms—to their primary files and any necessary fallbacks. Each entry cites authoritative sources (W3C, MDN, Apple, Microsoft, Google, etc.), ensuring accurate, up-to-date guidance at a glance.

| Goal                                 | Primary Configuration                                                                                                                        | Secondary / Platform-specific Fallback                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Installable PWA                      | `manifest.json` (`Content-Type: application/manifest+json`) ([developer.mozilla.org][1])                                                     | –                                                                                       |
| iOS Home-screen (Web Clip)           | `<meta name="apple-mobile-web-app-capable" content="yes">` ([developer.apple.com][2])                                                        | `<link rel="apple-touch-icon" sizes="180x180" href="…">` ([developer.apple.com][2])     |
| Safari pinned-tab                    | `<link rel="mask-icon" href="pinned.svg" color="#5bbad5">` ([developer.apple.com][3])                                                        | –                                                                                       |
| Windows Start-menu Tiles             | `browserconfig.xml` / `<meta name="msapplication-config" content="/browserconfig.xml">` ([speckyboy.com][4])                                 | `<meta name="msapplication-TileImage" content="…">` ([blog.giantgeek.com][5])           |
| Address-bar / Theming                | `<meta name="theme-color" content="#3367d6">` / `<meta name="color-scheme" content="light dark">` ([web.dev][6], [developer.mozilla.org][7]) | –                                                                                       |
| Social Preview (Open Graph)          | `<meta property="og:title" …>` ([ogp.me][8])                                                                                                 | `<meta name="twitter:card" content="summary_large_image">` ([developer.twitter.com][9]) |
| Deep Linking (Android App Links)     | `.well-known/assetlinks.json` ([developer.android.com][10])                                                                                  | –                                                                                       |
| Structured Data (Schema.org JSON-LD) | `<script type="application/ld+json">…</script>` ([developers.google.com][11])                                                                | –                                                                                       |
| Legacy Firefox OS App                | `manifest.webapp` ([stackoverflow.com][12])                                                                                                  | –                                                                                       |
| Tizen Web & Widget                   | `config.xml` (`<widget …>`) ([docs.tizen.org][13])                                                                                           | –                                                                                       |
| Chrome Extension (Manifest V3)       | `manifest.json` (`manifest_version: 3`) ([developer.chrome.com][14])                                                                         | –                                                                                       |

## Copilot Workflow

1. **Scan** repository for all referenced files (`*.webmanifest`, `manifest.json`, `*.webapp`, `config.xml`, extensions/**/*/manifest.json). ([developer.mozilla.org][1], [docs.tizen.org][13])
2. **Generate or update** missing manifests/meta tags using project metadata (IDs, icons, display modes).
3. **Validate** each configuration with platform tools:

   * Chrome DevTools Lighthouse & `npx web-app-manifest-validator` ([developer.mozilla.org][1])
   * Xcode AASA Validator & Apple Universal Links Tester ([developer.android.com][10])
   * RealFaviconGenerator / Windows Tile Checker ([speckyboy.com][4])
   * Android Studio App Links Assistant ([developer.android.com][15])
4. **Document** results in `.github/prompts/README.md` and `.github/instructions/README.md`.

> ⚠️ Ensure this file remains at the project root or alongside other `.instructions.md` files—**do not** place in a `docs/` folder.

[1]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest?utm_source=chatgpt.com "Web application manifest - Progressive web apps - MDN Web Docs"
[2]: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html?utm_source=chatgpt.com "Configuring Web Applications - Apple Developer"
[3]: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html?utm_source=chatgpt.com "Creating Pinned Tab Icons - Apple Developer"
[4]: https://speckyboy.com/modern-favicon-icon-development/?utm_source=chatgpt.com "Modern Favicon Development Techniques & Best Practices"
[5]: https://blog.giantgeek.com/?p=1418&utm_source=chatgpt.com "“msapplication-config” and browserconfig.xml - Giant Geek Blog"
[6]: https://web.dev/learn/html/metadata?utm_source=chatgpt.com "Metadata | web.dev"
[7]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta?utm_source=chatgpt.com "<meta>: The metadata element - HTML - MDN Web Docs - Mozilla"
[8]: https://ogp.me/?utm_source=chatgpt.com "The Open Graph protocol"
[9]: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards?utm_source=chatgpt.com "About Twitter Cards | Docs | Twitter Developer Platform - X"
[10]: https://developer.android.com/training/app-links/verify-android-applinks?utm_source=chatgpt.com "Verify Android App Links | App architecture - Android Developers"
[11]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?utm_source=chatgpt.com "Intro to How Structured Data Markup Works | Google Search Central"
[12]: https://stackoverflow.com/questions/36725046/examples-of-when-to-use-the-manifest-meta-data-tag?utm_source=chatgpt.com "Examples of when to use the manifest meta-data tag - Stack Overflow"
[13]: https://docs.tizen.org/application/tizen-studio/web-tools/config-editor/?utm_source=chatgpt.com "Configuring Applications | Tizen Docs"
[14]: https://developer.chrome.com/docs/extensions/reference/manifest?utm_source=chatgpt.com "Manifest file format - Chrome for Developers"
[15]: https://developer.android.com/studio/write/app-link-indexing?utm_source=chatgpt.com "Add Android App Links | Android Studio"
