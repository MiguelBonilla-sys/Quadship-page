# Verified locally, not deployed

## Observed checks

- Astro static production build: passed.
- Unit/static tests: 30 passed for the latest default-production build; preview/custom-origin matrices passed during isolated verification.
- Playwright E2E in installed Google Chrome: 16 passed.
- Responsive overflow checks: 320, 390, 768 and 1440px, both languages and all illustrative use cases.
- Language selector: text, document language, metadata, pressed state and persistence update without navigation. Blocked storage remains usable.
- Application examples and passed/blocked CI controls: expected visible/hidden and pressed states.
- Scroll: GSAP wire offsets change with native scroll, the diagram stays in place through the narrative, and the final caption remains in view. Reduced motion restores the static reading layout.
- JavaScript disabled: core content and native FAQ remain usable; enhancement-only controls are hidden.
- Dependency audit including development packages: zero reported vulnerabilities at the check time.
- Brand favicon: original compartment geometry preserved; light/dark-tab colors verified in Chrome. The on-page mark uses the same documented dark variant.
- Original application worktree: clean Git status after read-only document review.
- Independent fresh-scratch verifier: clean install, preview/configured-origin builds, 16 tests in each mode and 7 E2E passed for the reference redesign; latest contained refinement passed 18 static/unit and 8 E2E in the workspace.
- Impeccable fresh full finish review: `ship`, covering current dark, bilingual, interactive design; all six desktop/mobile language and normal-motion story captures valid. Static captures do not prove animation timing quality.

## Accessibility evidence and limits

Automated axe WCAG A/AA scans reported zero violations in the latest baseline; an earlier blocked-CI-state contrast issue was fixed by fading only the decorative icon, not text. The corrected blocked-state scan also reported zero violations. The latest redesign scan reported zero violations with one manual-review entry; this is evidence for the scanned state, not exhaustive state coverage. These checks are not a claim of complete WCAG conformance.

## Test-first and baseline scope

Original configuration/static-page checks first failed because their implementation/output did not exist. Two explicit brand-preservation tests were observed failing against the premature palette/logo and missing source definition before the corrective implementation passed. Later language/interaction tests verify the public browser behavior; a pre-implementation RED was not captured for every later user-directed addition. No pre-existing application commands existed at baseline commit c51a53b, so sibling-command differential testing does not apply.

## Not claimed

No publication, DNS/hosting configuration, Search Console submission, live Rich Results validation, production Core Web Vitals, separate English indexing or guaranteed AI citations. No comprehensive semantic/security audit of every one of the 132 inventoried source documents. Native review consent and outcome are separate from this functional/design proof.

## Native review boundary

The earlier full-candidate native START returned lens_context_budget_exceeded with mutation_outcome not_started. It created no authority. That old candidate and START are superseded by the reference-led redesign; no native approval, receipt, commit, push or publication is claimed. The independent design/functional review is separate and returned ship after clean-install verification.

## Color and entrance refinement

Fresh finish review returned ship for the latest Oxide attention and tonal-depth refinement. Eighteen unit/static tests include calculated CSS-token contrast (5.20:1 action labels,4.98:1 accent copy on raised plane). Eight Chrome E2E pass, including pending-to-visible entrances on scroll, immediate keyboard-focus reveal and reduced-motion cleanup. Existing scrub/language/CI/noJS/overflow tests remain. New color/entrance rules were observed RED before implementation. Axe scanned the latest reduced-motion state with zero violations and one manual-review entry; the detector returned no findings. These are bounded checks, not complete WCAG or live-performance guarantees.

## Scroll-stage spacing refinement

Firecrawl and rendered Mailflare evidence informed the scoped curved-dot background, not a replacement palette or copied claims. Fresh finish review returned `ship` with no material fixes after opening all eight current captures. The new spacing/background public-browser rule was observed RED before implementation and GREEN afterward. Latest production build,18 unit/static tests and9 Chrome E2E checks passed. Responsive insets, noninteractive decoration and unchanged sticky/reduced-motion/no-JS behavior are covered. See SCROLL-STAGE.md.

During the earlier untracked implementation, native assessment refused without an explicit inventory declaration. Packaging later assessed the committed toolchain and static landing ranges as medium/under_budget, with no new review due. Files still awaiting their own commit were excluded only from the committed toolchain range, not from the final delivery. No approval or receipt is claimed; this is separate from successful functional/design checks.

## Visible wave refinement

The requested halftone wave now moves in a slow9-second phase-shifted swell. Build,18 unit/static and10 Chrome E2E checks passed. New checks observe painted-pixel changes on desktop/mobile, actual changing/frozen transforms, translated pause/resume, offscreen pause and reduced-motion/no-JS fallbacks. Zero page errors occurred during the capture run.

The first CSS implementation animated source groups inside SVG defs/use, but the painted instances stayed static. Computed transforms alone produced a false-positive test. A rendered-pixel check was observed RED, then the implementation changed to directly painted SVG groups and passed. Settled captures2.2seconds apart show3502 changed desktop pixels and507 changed mobile pixels in sampled dot-only regions. This proves visible movement in those browser states, not a production performance guarantee. Detector output includes pre-existing design-token advisories; unrelated token drift was not repaired.


Latest refinements: wave period changed from9 to6seconds (50% faster). Favicon now preserves original geometry with adaptive light/dark-tab colors and a versioned URL. The favicon regression was observed RED then GREEN.


## Search and agent readiness: current local proof

The published baseline was independently reproduced with Lighthouse13.6: performance/accessibility/best-practices100, SEO66 and agentic100; indexing was blocked by missing production origin. The corrected default build uses https://quadship.app, with explicit/Vercel preview guards. Independent verification passed the whole feature: clean install/build,29 pre-correction tests plus16 E2E, four configuration matrices, invalid-config rejection,11 unchanged resolver outcomes and12 rejected native tool inputs without state/storage/network mutation. Full npm audit reported0 vulnerabilities. The final artifact correction raised the Node count to30; all16 E2E still pass.

A full final local Lighthouse13.6 run with the verified Chrome157 WebMCP test flag scored100 in all five categories. ARD schema, native tool schemas, actual registration/discovery and crawlability pass. The earlier catalog's generic media-type warnings were fixed by publishing genuine Agent Skills instructions, not relabeling HTML/product content. A scoped independent recheck validated its frontmatter, exact recognized profile, real HTTP resource and byte-identical aliases. Form coverage correctly remains Not applicable because this page has no form.

Measured loading improvement: the original story/GSAP chunk was requested immediately, while the candidate makes zero initial requests on both mobile and desktop and requests it once near the story. This defers47,729 transferred bytes; it does not remove the resource or establish a faster FCP/LCP. CSS/fonts were retained because baseline measurements showed no corresponding savings or useful extra preconnect candidates. Existing unweighted language-label and network-chain diagnostics remain baseline advisories.

These are local lab results, not a deployed score or field-data guarantee. The live site remains on its previous build until publication. Unflagged/native WebMCP availability depends on browser support or a valid owner-issued origin-trial token; no token or universal support is fabricated. No standalone tsc runner is configured. The fresh UX-preservation review returned ship with no material fixes.


## Current native review outcomes

The production/preview SEO commit8a82b58 completed three native review perspectives with no findings; its exact approved acknowledgement closed and burned that authority. The browser-agent commit2b8feb4 completed four perspectives and was approved without blockers; its exact acknowledgement also closed and burned that separate authority. A nonblocking test-environment warning recommended making installed Chrome explicit; README now states that prerequisite, consistent with the existing suite-wide `chrome` channel. No browser fallback or product behavior was changed to silence it. These review outcomes do not authorize publication or claim a deployed score.
