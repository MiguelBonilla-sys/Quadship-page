# Explain the deployment, not the animation

The user rejected the earlier text-heavy landing and explicitly selected [Coolify](https://coolify.io) and [GSAP Scroll](https://gsap.com/scroll/) as inspiration. This replaces the composition and motion model, not QuadShip’s existing identity or product truth.

## Verified reference evidence

Both pages were scraped with Firecrawl and inspected in isolated Chrome sessions. Coolify pairs a concise promise with a large product view and a labeled code → deployment platform → servers diagram. GSAP pairs each scroll concept with a large demonstration. Wheel samples confirmed its windmill rotation changes while the demonstration stays approximately stationary in the viewport; exact timings were not inferred from markdown.

No third-party screenshot, logo, purple palette, pastel sculpture, adoption metric or product claim is embedded in QuadShip. The transfer is causal clarity and scroll-controlled explanation.

## Implemented composition

- A centered opening promise with a prominent application → QuadShip → owned-server map. It is explicitly conceptual, not a fake live dashboard.
- One persistent code → checks → server → people diagram paired with three short narrative steps. Desktop native scrolling advances GSAP ScrollTrigger timelines; SVG segments draw and one packet follows their actual geometry.
- The desktop diagram stays sticky through the narrative; extra end space keeps it available for the final step. Its height is bounded to the viewport. Mobile uses the same text and completed diagram in normal flow, without a long pinned screen.
- Original application examples and the CI pass/failure simulator remain functional and clearly illustrative.
- Compartment isolation remains a readable visual. Long technical details and the verbatim original definition are in a native disclosure rather than dominating the initial reading path.

## Motion and fallback contract

GSAP is dynamically imported only when nonessential motion is permitted. `gsap.matchMedia()` manages responsive and reduced-motion cleanup. Content never starts hidden; blocked scripts, a failed animation import or reduced motion leave a complete static diagram and readable page. Language changes refresh scroll geometry rather than resetting the selected language or navigating.

There is no scroll hijacking, ScrollSmoother, wheel interception, endless decorative loop or rotating original logo. The previous global fade/reveal observer is removed.

Official implementation reference: [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/). Native SVG path measurement drives the packet; no MotionPath plugin or external animation CDN is required.

## Review status

The previous design approval describes a superseded composition. A fresh independent visual/functional review of this redesign returned ship: clean installation, preview/configured-origin builds, 16 unit/static tests and 7 Chrome E2E passed. Six current captures were validated, including checks/people scroll states. Native review of the earlier full candidate stopped at its evidence-context limit with no authority created; no old START or approval may be reused. No commits, push or publication are authorized by this redesign request.
