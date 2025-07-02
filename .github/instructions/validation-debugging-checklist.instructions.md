---
applyTo: "**"
description: "A VS Code–centric checklist for validating and debugging web app meta tags, manifests, icons, deep links, and SEO elements using built-in tools and CLI/CI workflows."
---

# Validation & Debugging Checklist Instructions

## 1. Overview 🔗 `#overview`

This checklist provides a comprehensive workflow for validating web application metadata and platform integrations directly within VS Code. By leveraging the built-in Simple Browser, extensions like Microsoft Edge DevTools and Live Preview, and integrated terminal tools such as webhint and Lighthouse CI, you can perform a full audit without leaving the editor. This process covers PWA manifest validation, meta tag correctness, performance audits with Lighthouse, and runtime error debugging with React/Next.js Fast Refresh overlays, ensuring a streamlined and efficient development cycle.

- **Live Preview Ext**: [marketplace.visualstudio.com/items?itemName=ms-vscode.live-server](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
- **Edge DevTools Ext Docs**: [learn.microsoft.com/en-us/microsoft-edge/visual-studio-code/microsoft-edge-devtools-extension](https://learn.microsoft.com/en-us/microsoft-edge/visual-studio-code/microsoft-edge-devtools-extension)
- **webhint Meta Checker**: [webhint.io/docs/user-guide/hints/hint-meta-theme-color/](https://webhint.io/docs/user-guide/hints/hint-meta-theme-color/)
- **Lighthouse Docs**: [developers.google.com/web/tools/lighthouse](https://developers.google.com/web/tools/lighthouse)

## 2. VS Code One-Click Smoke Test 🔗 `#vscode-smoke`

```bash
# 1. Install helper extensions (one-time setup)
code --install-extension ms-vscode.live-server
code --install-extension ms-edgedevtools.vscode-edge-devtools

# 2. Launch your app
# For static sites: Right-click HTML file -> 'Open with Live Preview'
# For Next.js/React: Run `npm run dev` in the integrated terminal

# 3. Open the Simple Browser
# Press ⌘⇧P (or Ctrl+Shift+P) → 'Simple Browser: Show' → http://localhost:3000
```

*The **Edge DevTools panel** (accessible from the Side Bar 🟣 icon) has a **Manifest** tab that shows PWA installability requirements and errors.* 

## 3. React / Next.js Overlay 🔗 `#react-next`

Next.js and Create React App use a runtime error overlay for immediate feedback. When an error occurs, a full-screen red overlay (a "redbox") appears in the browser, showing the error and the exact code location. Fixing the error in VS Code and saving the file will automatically dismiss the overlay thanks to Fast Refresh.

- **Screenshot**: [nextjs.org/docs/assets/images/fast-refresh-error-overlay.png](https://nextjs.org/docs/assets/images/fast-refresh-error-overlay.png)
- **CRA Overlay**: The Create React App overlay behaves similarly.
- **Disabling**: You can temporarily disable it by pressing `Esc`.

## 4. webhint in VS Code 🔗 `#webhint`

Use the `webhint` CLI in the integrated terminal to check for best practices and common errors.

```bash
# Run from the VS Code integrated terminal
npx hint http://localhost:3000 --hint meta-theme-color,meta-viewport
```

The `webhint` extension can also surface these issues directly in the VS Code **Problems** pane for an even more integrated experience.

## 5. Lighthouse CI in Git & VS Code 🔗 `#lighthouse-ci`

Automate performance and PWA audits with Lighthouse CI.

```bash
# 1. Install the CLI tool
npm install -D @lhci/cli

# 2. Launch your local server first, then run the audit
lhci collect --url=http://localhost:3000 && lhci assert
```

Integrate this into your CI/CD pipeline with the official GitHub Action. See the CI template in section 8.

## 6. Social & SEO Preview 🔗 `#social-seo`

Validate your Open Graph, Twitter Card, and Schema.org markup using the Simple Browser.

- **Facebook/Open Graph**: `⌘⇧P` → `Simple Browser: Show` → `https://developers.facebook.com/tools/debug/?q=YOUR_URL`
- **Twitter Card**: `⌘⇧P` → `Simple Browser: Show` → `https://cards-dev.twitter.com/validator`
- **Schema Markup**: `⌘⇧P` → `Simple Browser: Show` → `https://validator.schema.org/`

## 7. Deep-Link Files 🔗 `#deeplinks`

- **iOS (AASA)**: Open `.well-known/apple-app-site-association` in the Simple Browser to check its content type. Validate its logic with a tool like [universal-links.dev](https://universal-links.dev/).
- **Android**: Use the integrated terminal and Android Debug Bridge (adb).
  ```bash
  # Ensure your device is connected and debugging is enabled
  adb shell pm verify-app-links com.example.app
  ```

## 8. Automated GitHub Actions Template 🔗 `#ci-template`

```yaml
name: Web App Validation

on: [push]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run webhint
        run: npx hint ./

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.11.x
          lhci autorun

      - name: Check for broken links in Markdown
        uses: gaurav-nelson/github-action-markdown-link-check@v1
```

## 9. Manual Visual Checklist 🔗 `#manual`

- [ ] **Favicon**: Is it crisp and clear at 16x16 and 32x32 in the browser tab?
- [ ] **Theme Color**: Does the browser UI (address bar, tab bar) match the site's theme?
- [ ] **PWA Install**: Does the install prompt appear in supported browsers?
- [ ] **Windows Tile**: Does the pinned site on the Windows Start Menu show the correct icon and color?
- [ ] **Safari Mask Icon**: Is the pinned tab icon monochrome and correctly shaped?
- [ ] **Dark Mode**: Do all icons and theme colors adapt correctly when the OS theme changes?

## 10. Common VS Code Troubleshooting Tips 🔗 `#gotchas`

| Issue                               | Fix                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------- |
| Live Preview port 5500 in use       | Change `livePreview.port` in your VS Code `settings.json`.             |
| Manifest changes not applying       | Hard refresh (`⇧⌘R`) in Simple Browser or use the Edge DevTools **Application** panel to unregister the Service Worker. |
| React/Next.js overlay is stuck      | Delete the `.next/` or `build/` directory and restart the dev server.   |
| Simple Browser shows old content    | Use `⌘⇧P` → `Simple Browser: Clear Cache`.                             |

## 11. Further Reading 🔗 `#reading`

- **VS Code Live Preview**: [marketplace.visualstudio.com/items?itemName=ms-vscode.live-server](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
- **VS Code Edge DevTools**: [learn.microsoft.com/en-us/microsoft-edge/visual-studio-code/microsoft-edge-devtools-extension](https://learn.microsoft.com/en-us/microsoft-edge/visual-studio-code/microsoft-edge-devtools-extension)
- **webhint Docs**: [webhint.io/docs/](https://webhint.io/docs/)
- **Lighthouse in DevTools**: [developer.chrome.com/docs/lighthouse/overview/](https://developer.chrome.com/docs/lighthouse/overview/)
- **RealFaviconGenerator Checker**: [realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker)
- **Next.js Fast Refresh**: [nextjs.org/docs/basic-features/fast-refresh](https://nextjs.org/docs/basic-features/fast-refresh)
- **Lighthouse CI Guide**: [github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md)
