# QuadShip launch website

An independent, static Astro landing page for QuadShip’s upcoming launch. The page introduces the product to technical and nontechnical visitors and credits Miguel Ángel Bonilla Torres as full-system development lead.

## Run locally

Node ≥22.23.4 is required. The lockfile pins the dependency tree.

```sh
npm ci
npm run dev
```

Open the URL printed by Astro (normally http://127.0.0.1:4321).

## Verify

```sh
npm run build
npm test
npm run test:e2e
npm run preview
```

The unit/static tests inspect built HTML, crawl files, authorship, prelaunch status, branding and domain configuration. The Playwright E2E tests use installed Google Chrome and Python3 to serve dist locally, verifying language, examples, CI states, motion, no-JavaScript and responsive behavior. Run the build before the tests. Use the same build-mode environment for both commands when checking production or preview output.

## Production and preview builds

Production builds now default to the verified public origin `https://quadship.app/`, so a normal `npm run build` produces indexable metadata, canonical/social URLs and a populated sitemap without a missing environment variable blocking the live site. A different owned origin may still be supplied through `SITE_URL`; the same strict HTTPS-origin validator applies.

Explicit previews must remain non-indexable:

```sh
SITE_PREVIEW=1 npm run build
SITE_PREVIEW=1 npm test
```

`VERCEL_ENV=preview` and `VERCEL_ENV=development` also select the protected preview mode. Any supplied nonproduction Vercel environment fails closed to preview, even with `SITE_PREVIEW=0`. If a host does not provide an environment marker, set `SITE_PREVIEW=1` explicitly. An empty `SITE_URL` remains a backward-compatible preview override. `SITE_PREVIEW` accepts only `1`, `0` or an unset value; invalid values fail the build rather than accidentally publishing.

Pass environment values to the build process; this project does not automatically load `.env` in its configuration. Preview output emits `noindex, nofollow`, `Disallow: /`, no canonical/social origin fields and an empty sitemap. Use the same environment when running built-output tests.

Publish only the generated `dist/` directory after separate authorization. Never publish source or development-only design/research files. The current public host is Vercel; this code change does not mutate hosting settings, DNS, response headers or Search Console. Rebuilding and redeploying the corrected output is still required to change the live response.

## Edit

- `src/pages/index.astro`: content, attribution, SEO and structured data.
- `src/styles/global.css`: shared visual tokens and responsive rules.
- `astro.config.mjs` / `src/lib/site.mjs`: single build-origin validation.
- `src/pages/robots.txt.ts` / `sitemap.xml.ts`: build-time crawl files.
- `public/product.md` / `llms.txt`: optional machine-readable summaries.
- `docs/COLOR-AND-ENTRANCES.md`: researched attention roles, tonal depth and accessible entrances.
- `docs/REFERENCE-REDESIGN.md`: Coolify/GSAP reference evidence and current composition.
- `src/scripts/scroll-story.ts`: responsive GSAP ScrollTrigger choreography.
- `docs/MOTION-AND-LANGUAGE.md`: researched motion and single-URL language tradeoffs.
- `docs/SEO-GEO.md`: researched decisions, sources and launch checklist.
- `DESIGN.md`: implemented design system.

The user required preservation of the existing Spanish product documentation and brand. The landing uses professional Spanish and includes the original product definition verbatim. See `docs/BRAND-SOURCES.md` for source mapping. All primary content remains present on mobile. The site has no backend, signup form or analytics. Its small client script powers in-place English/Spanish, illustrative use-case/CI controls and a GSAP scroll-driven deployment story and selective progressive entrances with static accessibility fallbacks. No locale routes are generated. Plans must not be rewritten as shipped capabilities until verified against the product.


## Browser-agent discovery

See [AGENT-READINESS.md](docs/AGENT-READINESS.md) for the canonical ARD catalog, compatible ai-catalog aliases and two real read-only WebMCP tools. A genuine [Agent Skills document](public/skills/quadship-project/SKILL.md) is the discoverable artifact; the planned platform is not advertised as an operational MCP service. Native WebMCP support remains browser/origin-trial dependent; ordinary browsing works without it.


## Test prerequisites

Use Node22.23.4 or newer, Python3 and an installed desktop Google Chrome. The suite deliberately selects Playwright's `chrome` channel; Playwright-managed Chromium alone is not sufficient. The native WebMCP check can skip unavailable API support, but Chrome itself is a prerequisite for the suite.
