# Scroll stage: spacing and halftone current

## Authorized scope

User request: “revisa padding y deja en la parte del scroll con un fonndo similar a https://mailflare.co/”. This is a contained refinement of the existing scroll explanation, not a brand, copy, or interaction replacement.

## Reference evidence

Firecrawl HTML and browser inspection of [Mailflare](https://mailflare.co/) on November13,2026 verified a dark blue field with curved halftone ribbons, clipped section corners and responsive inset spacing. Its `#top` has `data-dots="curves"` and seed `#6EA6EE`; the observed dark fill is #2D3F56. A canvas continuously paints its fields and pointer response. QuadShip borrows the visual principle, not its implementation, rainbow colors, claims, logos or pill controls.

## Applied spacing and background

- Retain QuadShip's existing #243A54 surface and navy/Oxide roles; scope the treatment to `#why`.
- Desktop: minimum24px outer inset and48px inner inset, maximum1280px content,72px top/64px bottom padding,48px chapter-to-story separation.
- Mobile:8px outer inset,16px inner inset,48px vertical padding and35px chapter separation. Text remains in document order; no pinned mobile trap.
- The halftone current is authored inline SVG, hidden from assistive technology and pointer events. It adds no dependency, image request, timer or canvas render loop. On normal-motion desktop it remains alongside the story using CSS sticky positioning; reduced motion uses static placement. The later user-requested wave animation also runs on mobile while visible, without pinning its background.
- Only the decorative layer clips its corners. The scroll stage must not use overflow:hidden; doing so would change the sticky containing behavior. Preserve the final narrative's real-flow spacer, which is functional scroll distance, not accidental padding.
- Panels stay opaque to protect diagram contrast. Decoration is deliberately subordinate to text.

## Checks

The new public-browser spacing/background rule failed before implementation because the backdrop did not exist. After implementation, the static build,18 unit/static checks and10 Chrome E2E checks passed. The added E2E measures insets, vertical padding, background, noninteractivity, visible stage overflow and total-page overflow at320/390/768/1440px. Existing tests retain bilingual controls, normal-scroll pinning and final-caption visibility, no-JS and reduced-motion fallbacks. Rendered desktop/mobile stage views and all existing language/story captures support visual review; these are not complete WCAG or production-performance certification.

## Wave animation refinement

User request: “generale animaicion de ola”. The halftone columns now move through a phase-shifted6-second swell,±14 SVG units vertically. Animation belongs only to the dot groups; it never changes content, panel or layout geometry. Native CSS animations avoid per-dot JavaScript updates and new dependencies.

An IntersectionObserver and visibility/preference listeners gate playback. Offscreen stages and hidden tabs pause; reduced motion or unavailable JavaScript keeps the field static and hides the animation-only control. A translated44px-minimum “Pausar ola”/“Reanudar ola” control gives explicit pause/resume. The user's pause choice survives scrolling out and back into the stage. The public-browser rule was observed RED before implementation, then GREEN; it checks rendered-pixel changes on desktop/mobile as well as changing/frozen transforms, the bilingual control, offscreen pause, reduced-motion static fallback and mobile playback.


Implementation gotcha: CSS transforms on groups inside SVG defs/use changed computed styles without changing rendered pixels in Chrome. Both visible fields therefore contain directly painted groups. Regression checks compare dot-region screenshot bytes rather than trusting computed transforms alone.


The user subsequently requested “sube la velocidad de la ola”: the period changed from9 to6seconds, a50% speed increase, with unchanged amplitude, pause controls and visibility/preferences gating.
