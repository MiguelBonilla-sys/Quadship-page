# Search-ready by construction

QuadShip ships semantic, static HTML with equivalent primary content on mobile and desktop. It uses conventional SEO foundations for both search and AI discovery. No ranking, indexing or AI-citation outcome is guaranteed.

## Production indexing and protected previews

The public origin is now verified as `https://quadship.app/`. A default production build uses that origin when `SITE_URL` is absent. This fixes the observed live build's `noindex, nofollow` metadata and `Disallow: /` robots policy caused by missing `SITE_URL`; the root cause was build configuration, not a lack of keyword markup.

```sh
npm run build
npm test
```

Production HTML, robots, sitemap and social metadata share the same validated origin. An explicit `SITE_URL` still overrides it and rejects malformed URLs, credentials, paths, queries, fragments, HTTP and common local/placeholder origins. Invalid origins fail even in preview mode, rather than silently accepting broken configuration.

Use a non-indexable build for previews:

```sh
SITE_PREVIEW=1 npm run build
SITE_PREVIEW=1 npm test
```

| Input | Crawl behavior |
| --- | --- |
| `SITE_URL` absent, no preview marker | Indexable production at `https://quadship.app/`. |
| Valid `SITE_URL`, no preview marker | Indexable production at that validated origin. |
| `SITE_PREVIEW=1` | Noindex, robots blocked, canonical/social origin fields omitted, empty sitemap. |
| Supplied `VERCEL_ENV` other than `production` | Protected preview, including `preview` and `development`; `SITE_PREVIEW=0` cannot bypass it. |
| Empty `SITE_URL` | Backward-compatible explicit preview. |
| `SITE_PREVIEW` other than `1`, `0` or unset | Build failure; no accidental publication. |

If a preview host does not expose an environment marker, set `SITE_PREVIEW=1` explicitly. Build-time configuration does not publish output or alter host response headers. After the owner authorizes publication, rebuild/redeploy and verify the actual production response; previously deployed output remains blocked until replaced.

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

1. The verified domain is `quadship.app` and the current public host is Vercel; authorize any new publication separately.
2. Rebuild/redeploy the production output, then verify actual HTTP status codes, robots, canonical, sitemap, HTTPS and error handling on the host. Preview protection must be checked separately.
3. Validate rendered structured data; add Search Console and Bing Webmaster Tools if desired.
4. Measure mobile and desktop PageSpeed/CrUX field data after sufficient real traffic. Local responsive checks are not field performance measurements.

## Bilingual single-URL constraint

The user explicitly rejected locale routes. Spanish is the initial HTML; English is an in-place enhancement. This does not guarantee separate English indexing. No hreflang variants are fabricated. See `MOTION-AND-LANGUAGE.md`.
