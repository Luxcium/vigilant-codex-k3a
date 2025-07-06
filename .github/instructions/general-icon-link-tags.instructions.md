---
applyTo: '**/*.{html,tsx,jsx}'
description: 'Instructions for implementing a comprehensive set of link tags for favicons and app icons across all platforms.'
---

# General Icon Link Tags Instructions

## 1. Overview 🔗 `#overview`

The `<link rel="icon">` tag and its variations are essential for displaying your site's identity across browser tabs, bookmarks, and OS-level shortcuts. A robust implementation provides multiple formats and sizes to ensure a crisp, clear icon on every platform, from modern desktop browsers to iOS home screens and Android devices. Best practices involve supplying a scalable SVG for modern browsers, a legacy `.ico` file for older user agents, and a range of PNG sizes for various OS and device requirements, ensuring a consistent brand presence everywhere.

- **MDN Favicon Guide**: [developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons)
- **RealFaviconGenerator Article**: [realfavicongenerator.net/blog/favicon-why-youre-doing-it-wrong/](https://realfavicongenerator.net/blog/favicon-why-youre-doing-it-wrong/)

## 2. Essential Icon Link Tags 🔗 `#essential-tags`

| Tag                      | Example                                                                      | Notes                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `icon` (ICO/PNG)         | `<link rel="icon" href="/favicon.ico">`                                      | Legacy default, typically 16x16 or 32x32. Still a crucial fallback.    |
| `icon` (SVG)             | `<link rel="icon" type="image/svg+xml" href="/icon.svg">`                    | Scales perfectly; preferred by modern browsers.                        |
| `icon` (PNG, multi-size) | `<link rel="icon" sizes="32x32" href="/favicon-32.png">`                     | Provide multiple sizes for high-resolution screens (e.g., 16, 32, 48). |
| `shortcut icon`          | `<link rel="shortcut icon" href="/favicon.ico">`                             | Required for older IE/Edge versions; now a safe, redundant fallback.   |
| `apple-touch-icon`       | `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">` | Icon for iOS home screen web apps. Does not need `rel="icon"`.         |
| `manifest`               | `<link rel="manifest" href="/manifest.webmanifest">`                         | Links to the PWA manifest, which defines icons for Android.            |

## 3. Design & Size Recommendations 🔗 `#design`

- **Standard Sizes**: Supply a comprehensive set of PNG icons. At a minimum, provide `16x16`, `32x32`, `48x48`, `96x96`, `192x192`, and `512x512`.
- **`favicon.ico`**: This file should contain both 16x16 and 32x32 versions.
- **Clarity**: Design your icon to be clear and recognizable even at its smallest size (16x16 pixels).
- **Transparency**: Use a transparent background unless the icon's design requires a solid color for contrast against different browser and OS themes.

## 4. Placement & Order 🔗 `#placement`

- Place all icon `<link>` tags within the `<head>` section of your HTML.
- Position them as early as possible, before any primary CSS, scripts, or the manifest link.
- For modern browser support, declare the SVG icon _before_ the `.ico` and `.png` fallbacks.

## 5. Example Boilerplate 🔗 `#boilerplate`

```html
<head>
  <!-- ... other head elements like title, charset, viewport ... -->

  <!-- Scalable Vector Icon for modern browsers -->
  <link rel="icon" type="image/svg+xml" href="/icon.svg" />

  <!-- Fallback icon for older browsers -->
  <link rel="icon" href="/favicon.ico" sizes="any" />

  <!-- Apple Touch Icon for iOS home screen -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

  <!-- PWA Manifest for Android icons -->
  <link rel="manifest" href="/manifest.webmanifest" />

  <!-- (Optional but safe) Redundant fallback for very old browsers -->
  <link rel="shortcut icon" href="/favicon.ico" />

  <!-- ... other meta tags, links, and scripts ... -->
</head>
```

## 6. Testing & Validation 🔗 `#validation`

Use these tools to ensure your icons are configured correctly:

**Browser Commands & Tools:**

```bash
# Preview cached favicons in Chrome-based browsers
open "chrome://favicon-internals/"

# Check your setup with the best-in-class online tool
open "https://realfavicongenerator.net/favicon_checker"
```

**Manual Testing:**

- Add your site to the home screen on both Android and iOS devices to check the `apple-touch-icon` and manifest icons.
- View your site in a browser tab and in your bookmarks bar.
- Switch your OS between light and dark modes to check icon visibility and contrast.

## 7. Gotchas 🔗 `#gotchas`

- **SVG Support**: SVG icons are not supported in Safari versions before 15, and are not supported by Internet Explorer or older versions of Edge. The `.ico` fallback is critical.
- **Caching**: Browsers cache favicons aggressively. You may need to perform a hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`) or clear the browser cache entirely to see updates.
- **Large PNGs**: The `512x512` PNG is primarily for PWA splash screens on Android and other OS-level integrations; it is not typically used by browsers for the tab icon.

## 8. Further Reading 🔗 `#further-reading`

- **MDN Favicon Guide**: [developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons)
- **RealFaviconGenerator Blog**: [realfavicongenerator.net/blog/](https://realfavicongenerator.net/blog/)
- **CSS-Tricks SVG Favicon Guide**: [css-tricks.com/svg-favicons-and-all-the-fun-tricks/](https://css-tricks.com/svg-favicons-and-all-the-fun-tricks/)
- **Google PWA Icon Notes**: [web.dev/add-manifest/](https://web.dev/add-manifest/#icons)
