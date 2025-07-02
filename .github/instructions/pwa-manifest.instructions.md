---
applyTo: "**/manifest*.json,**/*.webmanifest"
description: "Progressive Web App (PWA) manifest authoring standards"
---

# PWA Manifest Authoring Standards

## 1 Overview  🔗 [#overview]

A Web App Manifest is a JSON resource that enables Progressive Web Apps (PWAs) to be installable across Chromium, Edge, Firefox, and some niche browsers. It supplies essential metadata—such as app name, icons, display mode, theme and background colors, and advanced capabilities—allowing the app to be launched from the OS like a native app. The manifest is defined by the [W3C specification][2] and summarized on [MDN][1].

## 2 Minimum Installability Checklist  🔗 [#minimum-installability]

- `name` / `short_name` – Human-readable titles. ([web.dev][3])
- `start_url` – Must be same-origin and preferably UTM-free. ([developer.chrome.com][4])
- `display` – At least `standalone`. ([developer.chrome.com][5])
- `icons[]` – Include **one 192×192 and one 512×512 PNG**; at least one icon must declare
  `"purpose": "maskable"`. ([web.dev][6], [developer.chrome.com][7])
- `theme_color` & `background_color` – Hexadecimal or CSS color. ([developer.mozilla.org][8])
- A service-worker with a fetch handler (note but do not document the SW here). ([developer.chrome.com][4])

> **Note:** Maskable icons became a hard requirement on Android Play in 2024. ([developer.chrome.com][7])

## 3 Extended Members Reference  🔗 [#extended-members]

| Member          | Purpose                                                                |
| --------------- | ---------------------------------------------------------------------- |
| `shortcuts[]`   | Context-menu quick actions on long-press. ([developer.mozilla.org][9]) |
| `share_target`  | Registers the PWA in the OS share sheet. ([developer.mozilla.org][10]) |
| `screenshots[]` | Required by app stores (Chrome OS, Play). ([developer.mozilla.org][8]) |
| `orientation`   | Default screen orientation lock. ([developer.mozilla.org][11])         |
| `categories[]`  | Improves discoverability in catalogues. ([developer.mozilla.org][12])  |
| `scope`         | Navigation boundary—restricts URL bar origin swap. ([w3.org][2])       |

## 4 Icon Design Guidelines  🔗 [#icon-guidelines]

1. Supply square PNGs at **48, 72, 96, 128, 192, 256, 512 px**; favicon ≠ manifest icon. ([web.dev][3])
2. Add one SVG purpose `any maskable` for future proofing. ([web.dev][6])
3. Keep critical artwork inside the central safe area (80 % of view-box). ([web.dev][6])

## 5 Validation Workflow  🔗 [#validation]

```bash
# Lint JSON structure locally
npm i -D web-app-manifest-validator      # CLI tool → errors to stderr
npx web-app-manifest-validator manifest.json
```
([npmjs.com][13])

- Run **Lighthouse → PWA → Installability** to verify mandatory members. ([developer.chrome.com][5])
- Use `redirection.io` online validator for a second opinion. ([redirection.io][14])
- TypeScript projects can `npm i -D @types/web-app-manifest` for autocompletion. ([npmjs.com][15])

## 6 Boilerplate Snippet  🔗 [#boilerplate]

```jsonc
{
  "name": "Awesome App", // Full product name for OS menus
  "short_name": "Awesome", // Shorter name for compact UIs
  "start_url": "/?utm_source=pwa", // Entry point, should be same-origin
  "display": "standalone", // Standalone display mode for app-like feel
  "scope": "/", // Restricts navigation to app's root
  "theme_color": "#3367d6", // Address bar and UI theme color
  "background_color": "#ffffff", // Splash screen background color
  "icons": [
    { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" }, // Required maskable icon
    { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png" } // Large icon for install prompt
  ],
  "shortcuts": [
    { "name": "Inbox", "url": "/inbox", "icons": [{ "src": "/icons/inbox.png", "sizes": "96x96" }] } // Quick action
  ]
}
```

## 7 Further Reading  🔗 [#further-reading]

- [MDN: Web App Manifest][1]
- [W3C Manifest Spec][2]
- [web.dev: Web App Manifest][3]
- [Chrome: Install Criteria][4]
- [Chrome: Installable Manifest][5]
- [web.dev: Maskable Icon][6]
- [Chrome: Maskable Icon Audit][7]
- [MDN: Screenshots][8]
- [MDN: Shortcuts][9]
- [MDN: Share Target][10]
- [MDN: Orientation][11]
- [MDN: Categories][12]
- [web-app-manifest-validator (npm)][13]
- [redirection.io Manifest Validator][14]
- [@types/web-app-manifest (npm)][15]

> **Reminder:** Keep this guide under version control and run CI linting on manifest changes.

[1]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest?utm_source=chatgpt.com
[2]: https://www.w3.org/TR/appmanifest/?utm_source=chatgpt.com
[3]: https://web.dev/learn/pwa/web-app-manifest?utm_source=chatgpt.com
[4]: https://developer.chrome.com/blog/update-install-criteria?utm_source=chatgpt.com
[5]: https://developer.chrome.com/docs/lighthouse/pwa/installable-manifest?utm_source=chatgpt.com
[6]: https://web.dev/articles/maskable-icon?utm_source=chatgpt.com
[7]: https://developer.chrome.com/docs/lighthouse/pwa/maskable-icon-audit?utm_source=chatgpt.com
[8]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/screenshots?utm_source=chatgpt.com
[9]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/shortcuts?utm_source=chatgpt.com
[10]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/share_target?utm_source=chatgpt.com
[11]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/orientation?utm_source=chatgpt.com
[12]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/categories?utm_source=chatgpt.com
[13]: https://www.npmjs.com/package/web-app-manifest-validator?utm_source=chatgpt.com
[14]: https://redirection.io/tools/web-app-manifest/validator?utm_source=chatgpt.com
[15]: https://www.npmjs.com/package/%40types/web-app-manifest?utm_source=chatgpt.com
