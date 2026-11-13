# Search-ready by construction

QuadShip ships semantic, static HTML with equivalent primary content on mobile and desktop. It uses conventional SEO foundations for both search and AI discovery. No ranking, indexing or AI-citation outcome is guaranteed.

## Before publication

Set `SITE_URL` to the final public HTTPS origin when building. Without it, the preview deliberately emits `noindex, nofollow`, blocks crawlers and omits canonical/OG URL fields; its sitemap has no entries. Do not submit that preview to search engines. Build-time environment configuration does not publish anything.

```sh
SITE_URL=https://your-owned-domain.tld npm run build
SITE_URL=https://your-owned-domain.tld npm test
```

The origin above is an example to replace, not a claimed QuadShip domain. The validator rejects malformed URLs, credentials, paths, queries, fragments, HTTP and common local/placeholder origins. Hosting access controls, HTTP headers and production reachability must still be verified at launch.

## Implemented

- Descriptive title/description, one H1, native anchor navigation and meaningful heading hierarchy.
- Production-only canonical and absolute social URLs. A 1200×630 PNG is provided for social consumers; its SVG source is retained.
- Truthful JSON-LD: SoftwareApplication and Person, plus WebSite when a production origin is configured. No fake offers, ratings, customers or release date.
- Generated robots.txt and sitemap.xml share the same build origin. No fabricated lastmod timestamps.
- A small client script only for language, examples and motion; self-hosted variable fonts, responsive layout and reduced-motion support.
- Native HTML FAQ. No FAQ rich-result guarantee or unnecessary FAQ schema.
- Optional llms.txt and product.md: concise factual context, not a substitute for HTML or crawler access.
- No analytics, external embeds, cookies or pretend waitlist. Contact links lead to the real portfolio; no personal data is collected here.

The production robots policy allows all compliant crawlers, including search and training crawlers. It does not claim to distinguish or opt out of training. If the owner wants a different training policy, change it deliberately before publication; do not confuse GPTBot with OAI-SearchBot.

## Research and decisions

Research completed with Firecrawl: two searches and nine scrapes, using primary guidance rather than GEO marketing claims.

| Primary source | Applied decision |
| --- | --- |
| [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features) | Ordinary indexing and snippet eligibility apply; no special AI markup is required. |
| [Google: mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) | Same primary text, links and metadata at all screen sizes; no click-to-load core content. |
| [Google: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | Clear titles, descriptive links, crawlable HTML and canonical URLs. |
| [Google: structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) | JSON-LD reflects visible facts only. |
| [web.dev: Core Web Vitals](https://web.dev/articles/vitals) | Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the field-data 75th percentile; local tests do not prove these. |
| [OpenAI: crawlers](https://developers.openai.com/api/docs/bots) | Search crawling and model-training policies are distinct. |
| [llms.txt proposal](https://llmstxt.org/) | Supplementary summary only; not a Google requirement or citation guarantee. |
| [Astro: deployment](https://docs.astro.build/en/guides/deploy/) | Build static output to dist; inspect generated files. |
| [Verified portfolio](https://mangel14.dev) | Link the real development lead without inventing company or founder status. |

## Launch checks that remain external

1. Choose the real domain and host, then authorize publication separately.
2. Build with SITE_URL and verify actual HTTP status codes, robots, canonical, sitemap, HTTPS and error handling on that host.
3. Validate rendered structured data; add Search Console and Bing Webmaster Tools if desired.
4. Measure mobile and desktop PageSpeed/CrUX field data after sufficient real traffic. Local responsive checks are not field performance measurements.

## Bilingual single-URL constraint

The user explicitly rejected locale routes. Spanish is the initial HTML; English is an in-place enhancement. This does not guarantee separate English indexing. No hreflang variants are fabricated. See `MOTION-AND-LANGUAGE.md`.
