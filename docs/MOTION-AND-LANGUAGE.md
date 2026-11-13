# Explain relationships, not effects

The user requested coherent scroll animation, English/Spanish without locale routes, more approachable graphics, and a dark background derived from #12233A. The implementation preserves the existing QuadShip mark and typography while applying these explicit changes.

## Interaction model

| Surface | Meaning and behavior |
| --- | --- |
| First viewport | Plain-language promise, clear prelaunch state and route from application code to server to people. Text is immediately visible. |
| Application examples | Buttons switch a business website, booking calendar and internal tool. Explicit illustrative labels prevent confusion with shipped software. |
| Deployment story | A persistent desktop diagram follows three narrative chapters. Native scroll scrubs GSAP paths and a packet from application to CI, server and people. Mobile uses a readable vertical map in normal flow. |
| CI example | Passed/failed controls demonstrate the intended version1 gate. A failed check stops the illustrated path; nothing is deployed. Text and distinct glyphs communicate both states. |
| Project compartments | Static, labeled project boundaries explain the isolation model without implying absolute security. |
| Builder | Original mark and truthful development attribution; no invented milestones or adoption metrics. |
| Reading sections | Content is immediately visible. The desktop story uses native sticky positioning; generic whole-section fades and scroll hijacking are absent. The explicitly requested wave is separately controlled and pauses offscreen, in hidden tabs or by the visitor. |

All fundamental content remains in server-rendered HTML. Without JavaScript, section visibility is unchanged and the first illustrative example stays readable. Enhanced-only buttons are hidden until their handlers are ready. Native FAQ disclosure works independently of scripts.

Reduced-motion preferences keep a complete static diagram and ordinary document layout. GSAP is dynamically imported only when motion is allowed and the story approaches the viewport, and matchMedia reverts animations when preferences or breakpoints change. Failed module loading leaves essential content visible. The previous IntersectionObserver reveal system is removed. There are no autoplaying sound or video assets.

## One URL, two languages

The selector updates visible text, accessible labels, title, description and document language in place. It does not navigate or create `/es` or `/en` routes. The chosen language is stored locally when storage is available; blocked storage does not prevent switching.

Spanish is the initial server-rendered content. This honors the explicit single-URL requirement but does not provide separately indexable English and Spanish pages. No hreflang alternates or equivalent English indexing are claimed. Switching the interface language does not alter the canonical URL or create search-engine variants. The original Spanish product definition remains in source and initial HTML; the English view translates it without modifying the app documentation.

## Research

Firecrawl was used for targeted searches and primary/reputable source extraction; the implementation borrows explanatory principles, never competitor logos or brand systems. Observing a pattern is not proof of better conversion.

- [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): nonessential scroll-induced motion can affect vestibular users; disabling interaction animation is AAA, not a claim that this audit proves overall compliance.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): respect the user preference and provide a static equivalent.
- [web.dev: high-performance animations](https://web.dev/articles/animations-guide): prioritize bounded transform/opacity effects, avoid layout-driving animation and indiscriminate will-change.
- [NNGroup: progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/): practical meaning first, specialist detail afterward.
- [Coolify](https://coolify.io/): explicit code-to-deploy-to-server relationships.
- [Dokploy](https://dokploy.com/): recognizable operational capability groups.
- [Railway](https://railway.com/): visual relationships paired with contextual platform explanations.

Exact timings and gestures in those products were not established from markdown. The website’s timings are authored choices, not copied or claimed as verified competitor behavior.

The latest reference-led composition and verified scroll behavior are documented in [REFERENCE-REDESIGN.md](REFERENCE-REDESIGN.md). It supersedes the earlier one-time section entrances.

## Latest user-directed entrances

The user explicitly requested parts appearing while scrolling after the reference-led redesign. Selective offscreen wrappers now have independent one-shot GSAP entrances; they do not animate the sticky diagram’s controlled properties or restore the rejected whole-section observer. Content stays visible by default. Keyboard focus completes a pending group immediately; reduced motion reverts styles and state; failed module initialization clears any pending inline appearance styles. See [COLOR-AND-ENTRANCES.md](COLOR-AND-ENTRANCES.md).


## Measured loading refinement

The story-proximity IntersectionObserver gates the optional GSAP import; it is not the removed generic reveal observer. The lightweight wave initializes independently, so its controls and visibility/preference safeguards do not wait for the larger story engine. Baseline/current browser probes observed one initial GSAP request before this change and zero afterward on both mobile and desktop, followed by a single request near the story. The resource is deferred, not eliminated; no FCP/LCP gain is promised. Core CSS and fonts remain unchanged because the measured baseline reported no associated rendering savings.
