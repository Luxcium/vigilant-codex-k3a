---
applyTo: "public/index.html,src/**/*.html"
description: "X Cards (formerly Twitter Cards) metadata and validation standards"
---

# X Cards Metadata Standards

## 1 Overview 🔗 [#overview]

X Cards (formerly Twitter Cards) enhance link previews on X by embedding rich media—images,
videos, or app details—directly in posts. They require specific `<meta>` tags in the HTML `<head>`
to define card type, content, and assets. Since X’s crawler does not execute JavaScript, tags must be
rendered server-side or pre-rendered. These standards ensure consistent, engaging previews across
devices. ([developer.x.com][1], [developer.mozilla.org][2])

## 2 Required Meta Tags 🔗 [#required-meta-tags]

- `twitter:card` – Card type: `summary`, `summary_large_image`, `app`, or `player`.
- `twitter:title` – Page title (≤70 chars).  
- `twitter:description` – Summary text (≤200 chars).  
- `twitter:image` – HTTPS URL to image (JPG/PNG/WEBP/GIF, <5 MB).  

Optional for accessibility and apps:

- `twitter:image:alt` – Alt text for image (≤420 chars).  
- `twitter:site` / `twitter:creator` – X handles.  
- `twitter:app:*` tags – App card metadata.  

## 3 Card Types & Use Cases 🔗 [#card-types]

1. **summary** – Title, desc, thumbnail.  
2. **summary_large_image** – Larger 1200×630px image.  
3. **app** – Promotes app install (App Store/Play).  
4. **player** – Embeds video/audio iframe.  

Choose type based on content; `summary_large_image` is common for visuals.

## 4 Validation Workflow 🔗 [#validation]

```bash
# Validate card markup
npx twitter-card-validator https://example.com/page
```

- Use X’s Card Validator to preview and debug.  
- Verify HTTP headers: `curl -I https://example.com/page | grep twitter:`.  

## 5 Boilerplate Snippet 🔗 [#boilerplate]

```html
<!-- X Cards metadata -->
<meta name="twitter:card"        content="summary_large_image"> <!-- Card type -->
<meta name="twitter:title"       content="Awesome Page"> <!-- Title (≤70 chars) -->
<meta name="twitter:description" content="Page description here."> <!-- Desc (≤200 chars) -->
<meta name="twitter:image"       content="https://example.com/preview.jpg"> <!-- Preview image (<5MB) -->
<meta name="twitter:image:alt"   content="Alt text for preview image"> <!-- Accessibility -->
```

## 6 Further Reading 🔗 [#further-reading]

- [X Cards Overview][1]  
- [Twitter Card metadata guide][3]  
- [MDN Linking to social sites][2]  
- [Open Graph fallback][4]  

[1]: https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Linking_to_social_sites
[3]: https://developer.x.com/en/docs/x-for-websites/cards/overview/markup
[4]: https://ogp.me/
