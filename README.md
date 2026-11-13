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

The 19 unit/static tests inspect built HTML, crawl files, authorship, prelaunch status, branding and domain configuration. The 10 Playwright E2E tests use installed Google Chrome and Python3 to serve dist locally, verifying language, examples, CI states, motion, no-JavaScript and responsive behavior. Run the build before the tests. Use the same SITE_URL value for both commands when checking a production build.

## Configure a future release

Without `SITE_URL`, the build is a non-indexable preview. Set a real owned public HTTPS origin for canonical URLs, sitemap entries and indexable metadata. Environment values must be passed to the build process; this project does not automatically load a `.env` file.

```sh
SITE_URL=https://your-owned-domain.tld npm run build
SITE_URL=https://your-owned-domain.tld npm test
```

Publish only the generated `dist/` directory after separate authorization. Never publish source or development-only design/research files. Production hosting, DNS, security headers and submission to search engines are not configured here.

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
