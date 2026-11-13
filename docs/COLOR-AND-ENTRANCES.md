# Focused color, tonal depth and progressive entrances

The user requested more attention through color, parts appearing while scrolling, and less visual flatness. The change extends the existing QuadShip navy/Oxide identity; it does not replace the logo, typography, product copy or bilingual single-URL behavior.

## Researched basis

- [IBM Carbon color](https://www.carbondesignsystem.com/building-blocks/foundations/color): dominant neutral fields, a consistent action role, restrained additional hues and progressively lighter dark surfaces provide hierarchy.
- [Carbon color guidelines](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines): explicit layering roles distinguish surfaces without arbitrary decoration.
- [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): normal text requires 4.5:1; large text 3:1.
- [WCAG use of color](https://www.w3.org/TR/WCAG22/#use-of-color): meaningful states also need labels, shapes or other cues.
- [WCAG interaction animation](https://www.w3.org/TR/WCAG22/#animation-from-interactions): disabling nonessential interaction motion is an AAA criterion, not a claim of overall conformance.

Firecrawl research supports these principles, not a prediction of conversion improvement or universal color psychology.

## Palette roles

| Role              | Color   | Purpose                                               |
| ----------------- | ------- | ----------------------------------------------------- |
| Reading canvas    | #1B2E47 | Preserve the user-selected blue base.                 |
| Deep plane        | #12233A | Hero, diagram windows and closing fields.             |
| Raised plane      | #294765 | Application section and central deployment node.      |
| Action            | #E8714F | Real primary links and brief large headline emphasis. |
| Action ink        | #12233A | Dark normal-size labels on warm action backgrounds.   |
| Small accent copy | #F5A88D | Readable Oxide-derived text on lighter blue surfaces. |

Calculated sRGB contrast is 5.20:1 for action/ink and 4.98:1 for small accent copy/raised plane. Unit tests derive these pairs from actual CSS tokens. State green/red/yellow retain separate meanings and visible labels/icons. No glow, added shadows or multicolor rebranding is introduced. Depth comes from differentiated planes, adjacency and a small raised central diagram node; mobile removes the node offset.

## Entrance behavior

`src/scripts/entrances.ts` uses the existing GSAP dependency. It prepares only offscreen elements after successful module loading: grouped headings, chapter copy, illustrative panels, compartment parts and builder content. Above-the-fold content stays visible immediately. Entrances run once, use short deceleration and bounded transforms/clip reveal, and clear their inline styles when complete.

The scrubbed diagram keeps exclusive control of its own animated properties; entrance wrappers never animate the sticky diagram itself. Keyboard focus immediately completes any pending ancestor entrance. Reduced-motion changes revert animation styles and pending states. Missing JavaScript or an animation-module loading failure leaves the static page visible. Neither the document scroll nor the language URL behavior is intercepted.

## Verification scope

New color-role/contrast tests and the progressive-entrance browser rule were observed failing before implementation. Existing language, CI/example, no-JavaScript, responsiveness and scrub tests remain in the suite. Final counts and independent review outcome are recorded in VERIFICATION.md; a static screenshot alone does not prove entrance timing quality.
