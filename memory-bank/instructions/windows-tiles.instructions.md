---
applyTo: 'public/browserconfig.xml,public/index.html,src/**/*.html'
description: 'Windows Tiles (Start-menu & pinned-site) configuration'
---

# Windows Tiles Configuration

## 1 Overview 🔗 [#overview]

Windows 8+ allows users to pin websites to the Start menu or taskbar. Pinned tiles draw
iconography and theme color from lightweight `msapplication-Tile*` meta tags or a
`browserconfig.xml` manifest. These legacy features still work in Chromium-based Edge 2025
but are superseded on Windows 11 by Widgets. See Microsoft docs and MDN. ([stackoverflow.com][1], [developer.mozilla.org][2])

## 2 Supported Tile Sizes & Logo Requirements 🔗 [#tile-sizes]

| Element             | Pixel size | Used for                                          |
| ------------------- | ---------- | ------------------------------------------------- |
| `square70x70logo`   | 70×70      | small tile (optional) ([learn.microsoft.com][3])  |
| `square150x150logo` | 150×150    | _required_ medium tile ([learn.microsoft.com][3]) |
| `wide310x150logo`   | 310×150    | wide tile (optional) ([hanselman.com][4])         |
| `square310x310logo` | 310×310    | large tile (optional) ([learn.microsoft.com][3])  |

> Logos must be PNG or JPEG. Transparent PNGs look best on colored backgrounds. ([stackoverflow.com][5])

## 3 `browserconfig.xml` Schema 🔗 [#browserconfig]

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/icons/win-150.png"/>
      <TileColor>#2b5797</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

- Logo paths must be absolute or site-root-relative.
- `TileColor` accepts any CSS color.
- Omit unused logo nodes to minimize file size.

## 4 Head-Level Meta Tag Shortcuts 🔗 [#meta-tags]

```html
<meta name="msapplication-TileColor" content="#2b5797" />
<meta name="msapplication-TileImage" content="/icons/win-310.png" />
<meta name="msapplication-config" content="/browserconfig.xml" />
```

Explicit `msapplication-config` overrides any `browserconfig.xml`. Setting `content="none"`
ignores the XML. ([stackoverflow.com][5], [wiki.whatwg.org][7])

## 5 Icon-Design Guidelines 🔗 [#icon-guidelines]

1. Keep brand glyph inside a 66% safe area to survive Windows padding. ([hanselman.com][4])
2. Avoid gradients behind transparent PNGs; solid fills plus `TileColor` yield crisper results. ([github.com][8])
3. Test all tile sizes; Windows resizes aggressively if a size is missing. ([superuser.com][9])

## 6 Caching & Update Pitfalls 🔗 [#caching]

Windows caches tile images in `%LOCALAPPDATA%\Packages\…\LiveTileData`. Updates require users
to un-pin and re-pin, or version-bust URLs (`?v=2`). ([stackoverflow.com][10])

## 7 Validation Workflow 🔗 [#validation]

```bash
# 1 Serve correct MIME
curl -I https://example.com/browserconfig.xml | grep Content-Type

# 2 Run Lighthouse PWA audit (Edge DevTools)
npx lighthouse https://example.com --preset=pwa --view
```

Then pin site via Edge → More tools → Pin to Start and inspect Start menu tile. ([learn.microsoft.com][6], [learn.microsoft.com][11])

## 8 Boilerplate Drop-in Snippet 🔗 [#boilerplate]

```html
<!-- Tile meta tags & manifest -->
<meta name="msapplication-TileColor" content="#2b5797" />
<!-- Theme color -->
<meta name="msapplication-TileImage" content="/icons/win-150.png" />
<!-- Medium tile icon -->
<meta name="msapplication-config" content="/browserconfig.xml" />
<!-- Browser config XML -->
<link rel="manifest" href="/manifest.webmanifest" />
<!-- PWA manifest link -->
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/icons/win-150.png"/>
      <wide310x150logo src="/icons/win-310x150.png"/>
      <TileColor>#2b5797</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

## 9 Further Reading 🔗 [#further-reading]

- Microsoft “Pinned Sites & Live Tiles” docs ([learn.microsoft.com][6])
- MDN `<meta>` `msapplication-*` section ([developer.mozilla.org][2])
- Hanselman blog on Windows pinned tiles ([hanselman.com][4])
- Webmasters.SE deprecation discussion ([webmasters.stackexchange.com][12])
- WHATWG MetaExtensions registry for `msapplication-*` ([wiki.whatwg.org][7])

> **Save the file** and stage it in Git for review.

[1]: https://stackoverflow.com/questions/23043429/what-is-a-simple-minimal-browserconfig-xml-for-a-web-site?utm_source=chatgpt.com
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name?utm_source=chatgpt.com
[3]: https://learn.microsoft.com/en-us/windows/uwp/launch-resume/secondary-tiles-pinning?utm_source=chatgpt.com
[4]: https://www.hanselman.com/blog/make-a-windows-81-pinned-live-tile-for-your-website-in-minutes?utm_source=chatgpt.com
[5]: https://stackoverflow.com/questions/61686919/what-is-the-use-of-the-msapplication-tileimage-meta-tag?utm_source=chatgpt.com
[6]: https://learn.microsoft.com/en-us/previous-versions/troubleshoot/browsers/core-features/cannot-pin-local-webpage?utm_source=chatgpt.com
[7]: https://wiki.whatwg.org/wiki/MetaExtensions?utm_source=chatgpt.com
[8]: https://github.com/RealFaviconGenerator/realfavicongenerator/issues/331?utm_source=chatgpt.com
[9]: https://superuser.com/questions/962849/how-can-i-change-the-icon-size-on-the-windows-10-start-menu?utm_source=chatgpt.com
[10]: https://stackoverflow.com/questions/31885972/windows-10-edge-pinned-site-tiles-caching-refreshing-and-inaccurate-tile-color?utm_source=chatgpt.com
[11]: https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies?utm_source=chatgpt.com
[12]: https://webmasters.stackexchange.com/questions/131077/in-2020-are-browserconfig-xml-and-ieconfig-xml-now-effectively-deprecated?utm_source=chatgpt.com


## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
