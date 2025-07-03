---
applyTo: "public/index.html,src/**/*.html,.well-known/assetlinks.json"
---

# Social Preview & Deep Links Standards

## 1 Overview 🔗 [#overview]

Social platforms use metadata to generate rich link previews and enable deep linking into apps. Open Graph
protocol defines essential tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`). Twitter (X) Cards extend this with `twitter:*` tags, while Facebook App Links (`al:*`) and Android Digital Asset Links (`assetlinks.json`) enable mobile deep-link routing. Proper implementation ensures consistent previews and seamless app entry. ([ogp.me][1], [developer.x.com][2])

## 2 Open Graph Meta Tags 🔗 [#open-graph]

Insert once in `<head>` of each page:
```html
<meta property="og:title"       content="Example Page Title">
<meta property="og:description" content="Brief summary of this page.">
<meta property="og:image"       content="https://example.com/preview.jpg">
<meta property="og:url"         content="https://example.com/page-path">
<meta property="og:type"        content="article">
```
*Required:* `og:title`, `og:type`, `og:image`, `og:url`.  
*Recommended:* `og:description`, `og:site_name`, `og:locale`.  

## 3 Twitter Card Tags 🔗 [#twitter-cards]

Choose one card type per page:
```html
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="Example Page Title">
<meta name="twitter:description" content="Brief summary of this page.">
<meta name="twitter:image"       content="https://example.com/preview.jpg">
<meta name="twitter:site"        content="@YourHandle">
```
*Types:* `summary`, `summary_large_image`, `app`, `player`. Only last `twitter:card` is used.  

## 4 Facebook App Links 🔗 [#facebook-app-links]

Add to support in-app routing on iOS/Android:
```html
<meta property="al:ios:url"          content="example://item/123">
<meta property="al:ios:app_store_id" content="123456789">
<meta property="al:ios:app_name"     content="ExampleApp">
<meta property="al:android:url"      content="example://item/123">
<meta property="al:android:package"  content="com.example.app">
<meta property="al:android:app_name" content="ExampleApp">
<meta property="al:web:url"          content="https://example.com/item/123">
```
`al:web:url` is fallback if app not installed.  

## 5 Android Asset Links 🔗 [#android-app-links]

Serve at `/.well-known/assetlinks.json` (HTTPS, no redirects):
```json
[{  
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {  
    "namespace": "android_app",
    "package_name": "com.example.app",
    "sha256_cert_fingerprints": ["AA:BB:CC:..."]
  }
}]
```
*Test:* `adb shell pm verify-app-links com.example.app`.  

## 6 Validation Workflow 🔗 [#validation]

```bash
# OG & App Links headers
curl -I https://example.com | grep -E 'og:|al:'
# Twitter validation
open "https://cards-dev.twitter.com/validator"
# Facebook Sharing Debugger
open "https://developers.facebook.com/tools/debug/?q=https://example.com"
# Android App Links test
db shell pm verify-app-links com.example.app
```

## 7 Gotchas & Policies 🔗 [#gotchas]

- Only the last `twitter:card` tag is honored.  
- `assetlinks.json` ≤128 KB, served as `application/json`.  
- Use HTTPS for all URLs to avoid mixed content.  

## 8 Boilerplate Snippet 🔗 [#boilerplate]

```html
<!-- Open Graph -->
<meta property="og:title" content="Example Page Title">
...OG tags as above...

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
...twitter tags...

<!-- App Links -->
<meta property="al:ios:url" content="example://item/123">
...al: tags...
<link rel="manifest" href="/manifest.webmanifest">
```

```json
/* assetlinks.json */
[{"relation":["delegate_permission/common.handle_all_urls"],"target":{"namespace":"android_app","package_name":"com.example.app","sha256_cert_fingerprints":["AA:BB:CC:..."]}}]
```

## 9 Further Reading 🔗 [#further-reading]

- [Open Graph Protocol][1]  
- [Twitter Card Docs][2]  
- [Facebook App Links][5]  
- [Android App Links][6]  
- [Open Graph Image Guide][3]  

[1]: https://ogp.me/?utm_source=chatgpt.com
[2]: https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards
[3]: https://buffer.com/resources/social-media-image-sizes
[5]: https://developers.facebook.com/docs/applinks
[6]: https://developer.android.com/training/app-links/verify-android-applinks
