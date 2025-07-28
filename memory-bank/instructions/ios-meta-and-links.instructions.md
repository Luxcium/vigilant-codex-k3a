---
applyTo: 'public/index.html,src/**/*.html,.well-known/apple-app-site-association'
description: 'Apple Safari & iOS home-screen + Universal Links integration standards'
---

# iOS Meta Tags & Universal Links Guide

## 1 Overview 🔗 [#overview]

Unlike other browsers that rely on `manifest.json`, iOS/Safari still requires legacy HTML `<meta>`
tags and a separate JSON file for Universal Links to enable full-screen launch, deep-linking, and
Smart App Banners. This guide references Apple’s Safari HTML Reference and MDN’s PWA-on-iOS update
for best practices. ([developer.apple.com][1], [brainhub.eu][2])

## 2 Home-Screen & Stand-Alone Meta Tags 🔗 [#home-screen-meta]

`apple-mobile-web-app-capable=yes` – Enables standalone display (hides URL bar).\
`apple-mobile-web-app-status-bar-style` – Options: `default`, `black`, `black-translucent`.\
`apple-mobile-web-app-title` – Overrides `short_name` on iOS ≤ 17.

> **Note:** iOS 17+ may honour the PWA manifest for `name`, but these meta tags remain critical on
> older devices. ([brainhub.eu][2])

## 3 Touch Icons 🔗 [#touch-icons]

1. Supply PNGs sized 180×180, 167×167, 152×152, 120×120, and fallback 96×96. ([webhint.io][5],
   [fastcomet.com][6])
2. Declare each in `<head>`:

   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="/icons/ios-180.png" />
   ```

3. Prefer un-rounded glyphs; iOS applies its own mask. ([webhint.io][5])
4. Store icons under `/icons/` for cache-busting via query-string. ([fastcomet.com][6])

## 4 Smart App Banner 🔗 [#smart-app-banner]

Smart App Banners promote App Store install or open within Safari:

```html
<meta
  name="apple-itunes-app"
  content="app-id=123456789, app-argument=https://example.com/deeplink" />
```

- Optionally add Android fallback banners via a JS polyfill. ([dunnsolutions.com][8])

## 5 Universal Links (`apple-app-site-association`) 🔗 [#universal-links]

### 5.1 File location 🔗 [#file-location]

Host at `https://example.com/.well-known/apple-app-site-association` (no extension, no redirects,
`application/json`). ([developer.apple.com][9], [developer.apple.com][10])

### 5.2 Minimal example 🔗 [#minimal-example]

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "ABCDE12345.com.example.app",
        "paths": ["/news/*", "/profile/*"]
      }
    ]
  }
}
```

### 5.3 Xcode setup 🔗 [#xcode-setup]

Add `Associated Domains` entitlement → `applinks:example.com`. ([developer.apple.com][11])

### 5.4 Gotchas 🔗 [#gotchas]

- Max file size 128 KB; omit whitespace. ([developer.apple.com][9])
- Wildcards allowed only at segment ends (`*` or `?`). ([developer.apple.com][9])

## 6 Validation Workflow 🔗 [#validation]

```bash
# Check AASA JSON syntax
npx aasa-validator https://example.com/.well-known/apple-app-site-association

# Inspect meta tags & icons
npx lighthouse https://example.com --preset=pwa
```

Use Apple’s Hosted File Tester (`universal-links.dev`) for production checks. ([developer.apple.com][10])

## 7 Boilerplate Head Snippet 🔗 [#boilerplate]

```html
<!-- Full-screen & title -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- Enable standalone -->
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<!-- Status-bar style -->
<meta name="apple-mobile-web-app-title" content="Example" />
<!-- iOS app title -->
<!-- Smart App Banner -->
<meta
  name="apple-itunes-app"
  content="app-id=123456789, app-argument=https://example.com/deeplink" />
<!-- App banner -->
```

## 8 Further Reading 🔗 [#further-reading]

- [MDN: Making PWAs installable][12]
- [Apple HTML Reference][1]
- [Associated Domains guide][10]
- [Smart App Banner doc][7]
- [StackOverflow: Apple Touch Icon sizes][13]

> **Save the file** and stage it in Git for review.

[1]: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html?utm_source=chatgpt.com
[2]: https://brainhub.eu/library/pwa-on-ios?utm_source=chatgpt.com
[3]: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html?utm_source=chatgpt.com
[4]: https://github.com/vercel/next.js/issues/70272?utm_source=chatgpt.com
[5]: https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/?utm_source=chatgpt.com
[6]: https://www.fastcomet.com/blog/what-is-an-apple-touch-icon-and-how-to-add-it?utm_source=chatgpt.com
[7]: https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners?utm_source=chatgpt.com
[8]: https://dunnsolutions.com/about-us/insights/digital-solutions-blog/-/blogs/smart-app-banners-for-ios-and-android?utm_source=chatgpt.com
[9]: https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html?utm_source=chatgpt.com
[10]: https://developer.apple.com/documentation/xcode/supporting-associated-domains?utm_source=chatgpt.com
[11]: https://developer.apple.com/documentation/xcode/configuring-an-associated-domain?utm_source=chatgpt.com
[12]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable?utm_source=chatgpt.com
[13]: https://stackoverflow.com/questions/5110776/apple-touch-icon-for-websites?utm_source=chatgpt.com
