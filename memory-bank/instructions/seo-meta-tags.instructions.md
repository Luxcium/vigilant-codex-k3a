---
applyTo: '**/*.{html,tsx,jsx}'
description: 'Instructions for implementing fundamental SEO meta tags for discoverability, crawling, and social previews.'
---

# SEO Meta Tags Instructions

## 1. Overview 🔗 `#overview`

Fundamental meta tags like `description`, `robots`, and `canonical` are crucial for Search Engine Optimization (SEO). They directly influence how search engines crawl, index, and display your pages in search results (SERPs). Proper implementation helps prevent duplicate content issues, improves click-through rates by providing relevant snippets, and ensures your content is discoverable. These tags, combined with basic Open Graph tags, also control how your content appears when shared on social media, forming the bedrock of web discoverability.

## 2. Essential SEO Meta Tags 🔗 `#essential`

| Tag                      | Example                                                                     | Notes                                                    |
| ------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| `description`            | `<meta name="description" content="...">`                                   | Shown as SERP snippet; aim for ≤ 160 chars.              |
| `robots`                 | `<meta name="robots" content="index,follow">`                               | Controls crawling and indexing behavior.                 |
| `canonical`              | `<link rel="canonical" href="...">`                                         | Prevents duplicate content issues.                       |
| `keywords`               | `<meta name="keywords" content="...">`                                      | Most search engines ignore this tag; low priority.        |
| `author`                 | `<meta name="author" content="...">`                                        | Identifies the content author; used by some platforms.   |
| `viewport`               | `<meta name="viewport" content="width=device-width,initial-scale=1">`       | Essential for mobile-friendliness and responsive design. |
| `article:published_time` | `<meta property="article:published_time" content="2025-07-02T10:00-04:00">` | For news/blog rich results; uses Open Graph property.    |

## 3. Placement & Syntax 🔗 `#placement`

- You place all meta and link tags within the `<head>` section of your HTML, preferably before any scripts or other links.
- You ensure there is only one `description` meta tag and one `canonical` link tag per page to avoid confusion.
- You use absolute URLs in `canonical` tags (e.g., `https://www.example.com/page-a`).
- You use the ISO 8601 format for dates (`YYYY-MM-DDTHH:MM:SSZ`) for maximum compatibility.

## 4. Example Boilerplate 🔗 `#boilerplate`

```html
<head>
  <!-- ... other head elements like title, charset ... -->

  <!-- Essential for responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Page description for SERPs (Search Engine Result Pages) -->
  <meta
    name="description"
    content="A concise and compelling description of the page content, under 160 characters." />

  <!-- Instructions for search engine crawlers -->
  <meta name="robots" content="index, follow" />

  <!-- The canonical URL for this page to prevent duplicate content -->
  <link
    rel="canonical"
    href="https://www.example.com/your-canonical-page-url" />

  <!-- Author of the content -->
  <meta name="author" content="Your Name or Company Name" />

  <!-- For blog posts or articles -->
  <meta property="article:published_time" content="2025-07-02T10:00:00-04:00" />

  <!-- (Optional, low-impact) Keywords for the page -->
  <meta name="keywords" content="keyword1, keyword2, keyword3" />

  <!-- ... other meta tags, links, and scripts ... -->
</head>
```

## 5. Validation & Tools 🔗 `#validation`

- You validate meta tag implementation using `scripts/verify-all.sh`.

## 6. Gotchas & FAQ 🔗 `#gotchas`

- **Duplicate Content:** You ensure `canonical` tags are present and correct to prevent search engines from treating similar pages as duplicates.
- **Description Length:** You keep the `description` concise and relevant so search engines do not generate their own snippet.
- **Robots Directives:** You use `noindex, follow` to prevent a page from appearing in search results while still allowing search engines to crawl its links.
- **Conflicting Rules:** You avoid conflicting `robots` directives; `robots.txt`, meta tags, and HTTP `X-Robots-Tag` headers must align.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
