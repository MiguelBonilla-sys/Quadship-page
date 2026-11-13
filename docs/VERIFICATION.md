# Verified locally, not deployed

## Observed checks

- Astro static production build: passed.
- Unit/static tests: 19 passed for the latest preview build; configured-origin checks were verified in earlier iterations.
- Playwright E2E in installed Google Chrome: 10 passed.
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
