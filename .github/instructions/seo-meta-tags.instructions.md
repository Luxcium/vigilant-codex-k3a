---
applyTo: "**/*.{html,tsx,jsx}"
description: "Instructions for implementing fundamental SEO meta tags for discoverability, crawling, and social previews."
---

# SEO Meta Tags Instructions

## 1. Overview 🔗 `#overview`

Fundamental meta tags like `description`, `robots`, and `canonical` are crucial for Search Engine Optimization (SEO). They directly influence how search engines crawl, index, and display your pages in search results (SERPs). Proper implementation helps prevent duplicate content issues, improves click-through rates by providing relevant snippets, and ensures your content is discoverable. These tags, combined with basic Open Graph tags, also control how your content appears when shared on social media, forming the bedrock of web discoverability.

- **MDN meta overview**: [developer.mozilla.org/en-US/docs/Web/HTML/Element/meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- **Google SEO docs**: [developers.google.com/search/docs/essentials](https://developers.google.com/search/docs/essentials)
- **Moz beginner guide**: [moz.com/beginners-guide-to-seo](https://moz.com/beginners-guide-to-seo)

## 2. Essential SEO Meta Tags 🔗 `#essential`

| Tag                      | Example                                                                     | Notes                                       |
| ------------------------ | --------------------------------------------------------------------------- | ------------------------------------------- |
| `description`            | `<meta name="description" content="...">`                                   | Shown as SERP snippet; aim for ≤ 160 chars. |
| `robots`                 | `<meta name="robots" content="index,follow">`                               | Controls crawling and indexing behavior.    |
| `canonical`              | `<link rel="canonical" href="...">`                                         | Prevents duplicate content issues.          |
| `keywords`               | `<meta name="keywords" content="...">`                                      | Largely ignored by Google; low priority.    |
| `author`                 | `<meta name="author" content="...">`                                        | Identifies the content author; used by some platforms. |
| `viewport`               | `<meta name="viewport" content="width=device-width,initial-scale=1">`       | Essential for mobile-friendliness and responsive design. |
| `article:published_time` | `<meta property="article:published_time" content="2025-07-02T10:00-04:00">` | For news/blog rich results; uses Open Graph property. |

## 3. Placement & Syntax 🔗 `#placement`

- Place all meta and link tags within the `<head>` section of your HTML, preferably before any scripts or other links.
- Ensure there is only one `description` meta tag and one `canonical` link tag per page to avoid confusion.
- All URLs in `canonical` tags **must** be absolute (e.g., `https://www.example.com/page-a`).
- Use the ISO 8601 format for dates (`YYYY-MM-DDTHH:MM:SSZ`) for maximum compatibility.

## 4. Example Boilerplate 🔗 `#boilerplate`

```html
<head>
  <!-- ... other head elements like title, charset ... -->

  <!-- Essential for responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Page description for SERPs (Search Engine Result Pages) -->
  <meta name="description" content="A concise and compelling description of the page content, under 160 characters.">

  <!-- Instructions for search engine crawlers -->
  <meta name="robots" content="index, follow">

  <!-- The canonical URL for this page to prevent duplicate content -->
  <link rel="canonical" href="https://www.example.com/your-canonical-page-url">

  <!-- Author of the content -->
  <meta name="author" content="Your Name or Company Name">

  <!-- For blog posts or articles -->
  <meta property="article:published_time" content="2025-07-02T10:00:00-04:00">

  <!-- (Optional, low-impact) Keywords for the page -->
  <meta name="keywords" content="keyword1, keyword2, keyword3">

  <!-- ... other meta tags, links, and scripts ... -->
</head>
```

## 5. Validation & Tools 🔗 `#validation`

You can use various online tools to validate your implementation:

**Browser Commands:**
```bash
# Google Mobile-Friendly Test
open "https://search.google.com/test/mobile-friendly"

# Google Rich Results Test (for schema, articles, etc.)
open "https://search.google.com/test/rich-results"
```

**Free Online Checkers & Tools:**
- **Google Search Console:** The most important tool for monitoring your site's health, including indexing issues.
- **Screaming Frog SEO Spider:** A powerful desktop crawler to audit your site's meta tags in bulk (free for up to 500 URLs).
- **Ahrefs/Moz/SEMrush:** These platforms offer free site audit tools that check for common SEO issues.

## 6. Gotchas & FAQ 🔗 `#gotchas`

- **Duplicate Content:** Missing or incorrect `canonical` tags on pages with similar content (e.g., from filters, sorting, or pagination) can lead to search engines penalizing your site for duplicate content.
- **Description Length:** If your `description` is too long, too short, or irrelevant, Google may choose to generate its own snippet for the search results.
- **Robots Directives:** Use `noindex, follow` to prevent a page from appearing in search results while still allowing search engines to crawl the links on that page.
- **Conflicting Rules:** Avoid conflicting `robots` directives. A `robots.txt` file can block crawling, while a meta tag can block indexing. Ensure they work together logically. An HTTP `X-Robots-Tag` header can also override meta tags.

## 7. Further Reading 🔗 `#further-reading`

- **MDN `<meta>` element**: [developer.mozilla.org/en-US/docs/Web/HTML/Element/meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- **Google Search Essentials**: [developers.google.com/search/docs/essentials](https://developers.google.com/search/docs/essentials)
- **The Beginner's Guide to SEO (Moz)**: [moz.com/beginners-guide-to-seo](https://moz.com/beginners-guide-to-seo)
- **Google Search Console Help**: [support.google.com/webmasters/](https://support.google.com/webmasters/)
