---
name: QuadShip
description: Naval workshop identity for the independent QuadShip launch website.
colors:
  casco: "#13233A"
  dark-ink: "#E6ECF2"
  canvas: "#1B2E47"
  surface: "#243A54"
  muted: "#B4C2D1"
  line: "#3A4F69"
  diagram-line: "#697B92"
  dark-oxide: "#E8714F"
  subdued-ink: "#D3DAE2"
  success: "#4CC38A"
  warning: "#E3A63D"
  blocked: "#F27387"
  casco-hover: "#2C405C"
  surface-deep: "#12233A"
  surface-raised: "#294765"
  action-bg: "#E8714F"
  action-hover: "#F18C6D"
  action-ink: "#12233A"
  accent-ink: "#F5A88D"
  compartment-plane: "#263F5B"
typography:
  display:
    fontFamily: '"Archivo Variable", sans-serif'
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: -0.04em
  headline:
    fontFamily: '"Archivo Variable", sans-serif'
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: -0.035em
  title:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: 1.35rem
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: -0.035em
  body:
    fontFamily: '"Atkinson Hyperlegible Next Variable", sans-serif'
    lineHeight: 1.7
  navigation:
    fontFamily: '"Atkinson Hyperlegible Next Variable", sans-serif'
    fontSize: 0.86rem
  wordmark:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: 1.5rem
    fontWeight: 760
    letterSpacing: -0.015em
rounded:
  control: 4px
  inset-control: 2px
  diagram-cell: 3px
  panel: 6px
  compartments: 5px
  scroll-stage: 24px
  scroll-stage-mobile: 16px
spacing:
  compact: 8px
  related: 12px
  control: 16px
  group: 20px
  panel: 24px
  block: 32px
  spacious: 50px
  stage-inner: 48px
  stage-top: 72px
  stage-bottom: 64px
  stage-heading-gap: 48px
  stage-heading-gap-mobile: 35px
components:
  button-inverse:
    backgroundColor: "{colors.action-bg}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.control}"
    padding: 15px 22px
  button-inverse-hover:
    backgroundColor: "{colors.action-hover}"
  button-dark:
    backgroundColor: "{colors.casco}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.control}"
    padding: 15px 22px
  button-dark-hover:
    backgroundColor: "{colors.casco-hover}"
  example-control:
    backgroundColor: transparent
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.control}"
    padding: 10px 15px
  example-control-selected:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.dark-ink}"
  language-control:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    rounded: "{rounded.inset-control}"
    padding: 6px 7px
  language-control-selected:
    backgroundColor: "{colors.dark-ink}"
    textColor: "{colors.casco}"
  demo-window:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.panel}"
  launch-status:
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.control}"
    padding: 8px 12px
  navigation:
    textColor: "{colors.dark-ink}"
    typography: "{typography.navigation}"
  story-figure:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.panel}"
    padding: 24px
  scroll-stage:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.scroll-stage}"
    padding: 72px 0 64px
  scroll-stage-mobile:
    rounded: "{rounded.scroll-stage-mobile}"
    padding: 48px 0
  wave-toggle:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.control}"
    padding: 8px 12px
---

# Design System: QuadShip

## Overview

**Creative North Star: "The Naval Workshop"**

The Naval Workshop preserves the existing QuadShip identity: precise compartment geometry, expanded industrial lettering and legible humanist reading text. The independent marketing site extends that world; it does not redesign the application or rewrite its source documents.

The user-directed dark canvas remains a slightly lighter interpretation of the supplied #12233A. Large explanatory diagrams now carry the composition, with distinct deep, reading and raised planes, fine structural rules and focused warm action signals. The reference-led composition remains intact; the latest refinement adds selective grouped entrances without reviving a generic global section observer.

**Key Characteristics:**
- Original four-compartment diamond and lowercase wordmark.
- Expanded Archivo paired with Atkinson Hyperlegible Next.
- Deep, reading and raised naval planes with focused warm actions.
- Large causal diagrams with native-scroll enhancement and complete static fallbacks.

Ground truth: `src/styles/global.css`, `src/components/HeroDiagram.astro`, `src/components/ScrollStory.astro`, `src/scripts/scroll-story.ts` and the original `public/quadship-mark.svg`. [Brand provenance](docs/BRAND-SOURCES.md) preserves canonical authority. [PRODUCT.md](PRODUCT.md) owns product constraints; the [surface brief](.impeccable/surfaces/src-pages-index-astro.md) and [reference-led redesign](docs/REFERENCE-REDESIGN.md) own composition and inspiration. This is a refresh of the implemented system, not a new visual-world seed.

## Colors

The naval identity is preserved; user-authorized warm action and explicit tonal-depth roles now extend it. Frontmatter values are normative; sidecar tonal ramps are generated panel previews, not additional implemented tokens.

### Primary
- **Casco:** canonical naval brand anchor and dark secondary actions.
- **Action background / action ink / action hover:** the documented dark oxide becomes the real primary-action fill, paired with deep navy labels and a lighter warm hover. One large hero headline line also uses the action color.
- **Dark ink:** reading text, CI/language selection surfaces, example-selection text and three logo compartments.
- **Dark oxide:** the original final logo compartment, keyboard focus and route highlights; it shares a value with the explicit action role but retains its own semantic purpose.

### Neutral
- **Deep / canvas / raised:** hero, story/preview windows and closing use the deep plane; the reading canvas remains unchanged; the application region and central deployment node use the raised plane.
- **Surface / compartment plane:** the inset scroll stage and existing SVG nodes share the surface role; a distinct compartment-cell plane retains readable separation.
- **Muted:** explanatory text and secondary diagram labels.
- **Subdued ink:** retained canonical brand-line declaration, not a new body-text assignment.
- **Line / diagram line:** quiet separators and stronger diagram/control outlines.
- **Casco hover:** the dark secondary-action hover fill; it also appears inside the illustrative application node.
- **Accent ink:** lighter oxide-derived small copy on the raised application region and story terms; do not use the stronger action fill indiscriminately as small text.

### Semantic states
- **Success / warning / blocked:** passed checks, pending tasks and failed checks. Keep explicit labels and distinct SVG shapes; blocked pink is a graphical symbol color, not small body text on the surface.

**The Scarce Oxide Rule.** Use warm oxide to prioritize real primary actions, one large hero headline line, focus and causal highlights. Keep broad planes naval; use the lighter accent-copy role for small warm text on raised surfaces.

Dark ink or muted text sits on naval planes. Real warm primary actions pair action ink with action fill; language/CI selection still inverts Casco onto dark ink, while example selection uses deep fill, light ink and an oxide border. Quiet dividers are not text colors. Sidecar contrast ratios include the action-label and small-accent/raised pairs, not complete WCAG conformance. The guide's light-theme colors remain source authority, not replacements for the implemented dark reading palette.

## Typography

**Display Font:** Archivo Variable, self-hosted standard face with width and weight axes; sans-serif fallback.
**Body Font:** Atkinson Hyperlegible Next Variable, self-hosted; sans-serif fallback.

### Hierarchy
- **Display:** weight (650), line height (1.12), tracking (-.04em), width (112%). Size is `clamp(2.8rem, 6.2vw, 5.6rem)`; up to (899px), `clamp(2.8rem, 7.1vw, 4.4rem)`; up to (700px), `clamp(2.5rem, 9.4vw, 4rem)`.
- **Headline:** weight (650), line height (1.12), tracking (-.035em), width (112%), size `clamp(2.2rem, 4.3vw, 4rem)`. Builder and FAQ use contextual smaller clamps.
- **Title:** the frontmatter title role; story chapters use `clamp(1.65rem, 2.5vw, 2.4rem)`, then (1.4rem) up to (899px) and (1.7rem) up to (700px). Example titles are (2.4rem), narrowing to (1.8rem).
- **Body:** paragraphs use line height (1.7), normally capped at (70ch). Hero explanation is (1.12rem), narrowing to (1rem). Diagram labels are kept at native readable sizes on mobile rather than shrinking a desktop drawing.
- **Navigation:** (.86rem), narrowing to (.73rem); no authored heavy navigation weight.
- **Wordmark:** Archivo width (118%), weight (760), tracking (-.015em), base size (1.5rem), compact/footer (1.3rem). Builder lockup is (2.5rem), narrowing to (2rem).

Fluid sizes and font width live in prose and sidecar metadata because portable typography tokens cannot represent CSS clamps or `font-stretch`. No mono surface is implemented.

**The Original Lockup Rule.** Keep the original rotated compartment geometry and lowercase quadship lockup; use QuadShip in prose.

## Layout

The shared wrapper caps content at (1280px), subtracting (80px) from viewport width. Up to (1050px), it subtracts (56px); up to (700px), (40px). These are total horizontal insets, not per-side padding. Ordinary sections use (110px) vertical spacing, narrowing to (65px); builder and closing have their own measured spacing.

The centered opening promise and actions sit above an application → QuadShip → owned-server map. On desktop the map has five grid tracks, including connector tracks. Up to (700px) it becomes a vertical map capped at (340px), with the two server destinations side by side. Navigation wraps to a full-width row, not a hamburger; the header badge hides while prelaunch information remains elsewhere.

The scroll explanation is a contained surface-colored stage, not another ordinary full-width section. Its outer width is `min(1456px, calc(100% - 48px))`, giving at least (24px) outer inset per side; inner content is `min(1280px, calc(100% - 96px))`, giving at least (48px) inner inset. Vertical padding is (72px) top / (64px) bottom, outer block margin (64px), and heading-to-story separation (48px). Up to (700px), outer width subtracts (16px), inner width subtracts (32px), yielding (8px) outer / (16px) inner insets; vertical padding is (48px), block margin (40px), and heading separation (35px). Larger viewports may produce greater insets because of the maximum widths.

The story uses narrative/diagram columns in a (.8fr / 1.2fr) relationship with a (50px) gap. Enhanced desktop begins at (900px): each chapter occupies at least (76svh), the figure sticks at (110px), and its SVG is bounded by `calc(100svh - 320px)`. The final chapter also sticks at (110px). A real-flow narrative `::after` spacer of `calc(100svh - 120px)` preserves room for that final caption; it is not padding and must not be replaced by padding that shortens the sticky containing range.

Up to (899px), the story is one main column with three narrative columns and no desktop sticky activation. Up to (700px), narrative chapters stack and the desktop SVG is replaced by a native-size vertical map. Technical disclosure content becomes a single column. Project compartments are four across on wide screens, two across up to (1050px), with internal contents stacking on narrow screens.

The spacing tokens record recurring distances, not a rigid base-unit scale. Coverage widths (320px), (390px), (768px), (1440px) are test sizes, not media-query breakpoints.

## Elevation & Depth

No shadows or glow are used. Depth comes from distinct deep, reading and raised planes, stronger node outlines and fine section rules. The hero map is a framed canvas plane within the deep opening. Its raised central node offsets upward (8px) on larger screens; the offset disappears up to (700px). This is a resting spatial relationship, not a hover lift; actions change fill only.

**The Compartment Rule.** Separate regions through tonal contrast and fine rules, never shadows.

**The Decorative Clip Rule.** Clip only the scroll-stage decoration, never the stage or its content; preserve visible overflow and the final narrative’s real-flow spacer so native sticky behavior survives.

## Shapes

Rectangular controls retain (4px) corners; inset language buttons use (2px). The redesigned map nodes, story figure, CI container and example window use (6px); the compartment grid uses (5px), internal cells (3px). These measured container radii supersede the earlier blanket four-pixel-container description without changing the original mark.

The scroll-stage outer shell alone uses its dedicated stage radius, narrowing to the mobile-stage radius. These (24px / 16px) shell corners do not alter the (4px) control or (6px) diagram-panel geometry.

One-pixel rules establish structure; SVG node outlines may be (1.5px), active routes (2px). Circles remain native for statuses and people. The original four rectangles rotate together (45 degrees) within a (32×32) viewBox; preserve its exact compartment geometry and (1.2px) internal radius. Do not redraw it as a generic diamond.

The favicon preserves the same canonical four-rectangle geometry and (45-degree) rotation. Its light/default rendering uses original Casco (#13233A) and oxide (#B4442A); an embedded `prefers-color-scheme: dark` rule switches those fills to documented dark ink (#E6ECF2) and dark oxide (#E8714F). The CSS/classes make `public/favicon.svg` an adaptive derivative, no longer a byte-identical copy of the original. The page references `/favicon.svg?v=quadship-2` to refresh the cached asset; the visible page mark remains its separate existing asset.

## Components

### Buttons and text links

The existing inverse-action variant now carries warm action fill with deep navy labels; dark secondary actions preserve Casco fill and light ink. Both have minimum height (52px), padding (15px 22px), font size (.9rem), weight (700), narrowing to (.85rem). Fill transitions use (.2s ease), without translation. Text links underline on hover. Interactive anchors, buttons and disclosures share a dark-oxide (3px) focus ring and (6px) offset. The global focus radius is (3px); later component rules retain their own corner radius where the cascade overrides it.

### Selection controls and language

Example and CI selectors are grouped native `aria-pressed` buttons, not ARIA tabs. Unselected controls use dark ink, a diagram-line border and transparent fill. CI selection still inverts; selected application examples use deep fill, light text and an oxide outline. Padding is (10px 15px), narrowing to (10px 12px); font size (.8rem), narrowing to (.75rem).

The ES/EN group retains inset buttons, appearing only when handlers are ready. Spanish is server-rendered; English changes text, accessible labels, metadata and document language in place. Storage failure does not prevent switching. No localized routes or separately indexed language variants are created.

### Navigation and status

Navigation is an ordinary row of text links, underlined on hover. The outlined prelaunch label has (8px 12px) padding and a (6px) warning marker. It is not a signup action or availability promise. No input field is implemented.

### Diagram surfaces and previews

The hero map uses deep-filled source/server nodes inside a canvas-filled frame; the raised central QuadShip node retains an oxide outline. The story figure uses the deep plane with its stronger (#526B85) border. Neither is a fake live dashboard. The raised application region frames deep example windows, with a distinct (#1B324E) toolbar and diagram-line outline. Example panel padding is (45px), narrowing to (24px); minimum height (310px), narrowing to (460px). Mock action spans remain inert explanations.

The four-project grid uses one-pixel internal separators and compartment-plane cells with (28px) padding, narrowing to (20px 16px). Captions identify the intended isolation model rather than promising absolute security.

### Native disclosure

FAQ and the technical sheet use `details`/`summary`, fine separators and CSS-stroke plus/minus. Shared summary text is (.98rem), weight (650), padding (24px) vertically, narrowing to (.92rem); technical summary is (1.15rem) with (27px) vertical padding. Original definition and architecture details remain accessible inside the technical disclosure without JavaScript.

### Contained scroll stage

A surface-filled stage frames the existing causal story and CI example without replacing copy, actions or diagram pinning. Its authored halftone current is inline SVG, marked `aria-hidden="true"`, nonfocusable and pointer-transparent. Cool (#91AFCD) dots at (.32) fill opacity and sparse oxide dots at (.25) trace a curved current; a second, rotated field carries (.65) opacity. The quieter left lane and opaque panels protect reading contrast. This decorative palette is local to the illustration, not an additional action/state color.

The backdrop is an absolutely positioned, negative-z layer inside an isolated stage; its own corners clip while stage/content overflow remains visible. Normal-motion desktop at (900px) and above uses `overflow: clip` on that decorative layer and CSS sticky placement at (96px) for its first SVG. Reduced motion and smaller screens do not use sticky decorative placement; narrow SVG height is (600px), versus (800px) otherwise. Normal-motion mobile now animates the dot field while visible, without adding background pinning. There is no looping canvas, timer, pointer-follow effect or new dependency. The existing sticky diagram, selective entrances and final real-flow spacer retain their separate ownership. See [scroll-stage implementation evidence](docs/SCROLL-STAGE.md).


#### Pausable halftone wave

The user-authorized wave animates directly painted SVG column groups in both visible fields; do not restore the former `defs`/`use` indirection. Each column carries a negative phase delay of `-x / 1440 × 6s`. CSS supplies a (6s) repeating swell, moving from (-14) to (+14) SVG units with `cubic-bezier(0.45, 0, 0.55, 1)`; only dot-group transforms change, never stage, content, panel or sticky layout geometry. No per-dot JavaScript loop, timer, canvas loop or new dependency is added.

Playback runs only after enhancement is ready, when the stage intersects the viewport, the tab is visible, motion is permitted and the visitor has not paused it. Observer/visibility/preference listeners gate CSS play state. The visitor’s pause choice survives scrolling out of and back into the stage. Missing client JavaScript or IntersectionObserver, or reduced motion, leaves a static field and hides the animation-only control. The lightweight wave is initialized independently by the base client; deferred GSAP loading, failure or teardown does not own or disable its lifecycle.

The separate native pause/resume button sits beside the scroll introduction: deep fill, light text, diagram-line outline, (4px) corners, (8px 12px) padding, (.8rem) type and minimum height (44px). Hover changes its outline to focus oxide; keyboard focus follows the shared ring. Spanish labels “Pausar ola” / “Reanudar ola” switch with the English interface labels. This control is interactive; the decorative SVG remains hidden, nonfocusable and pointer-transparent.

Implementation evidence: transforms on SVG definition groups previously changed computed styles without changing Chrome’s rendered pixels. Both actual fields now contain direct column groups; rendered-pixel checks, not computed transforms alone, establish movement. The bounded repeating wave is an explicit exception to the former blanket no-perpetual-motion note, not permission for uncontrolled loops. See [wave evidence and fallback contract](docs/SCROLL-STAGE.md).

### Scroll-controlled explanation

The old global reveal observer remains removed. GSAP (3.15.1) and ScrollTrigger retain the independent scrubbed story; a separate entrance controller now progressively introduces explicitly marked offscreen groups. Both are presentation-only enhancements. Their GSAP module is requested only after the story approaches a (200px) vertical viewport margin and motion is permitted. The one-shot proximity observer disconnects when reached; a later preference change may then load the module. If IntersectionObserver is unavailable, the story uses the permitted-motion immediate-load fallback. Content starts visible; delayed or failed GSAP loading leaves readable static story/entrance content while the independently initialized CSS wave retains its own gating.

Desktop native scrolling scrubs the three SVG wire segments with (.4s) smoothing and linear easing. A single packet follows actual SVG path measurements, not an invented coordinate track; CI/server outlines highlight as the story advances. The timeline phase changes the chapter marker and the diagram progress rule. This is reversible scroll-driven explanation, not an autonomous loop, wheel interception or ScrollSmoother.

Tablet uses the SVG in normal flow. Handsets use the native-size vertical map; its connectors scrub with (.3s) smoothing and (.2) stagger, but layout scrolls normally without pinning. Reduced motion keeps the completed static diagram, disables transitions and smooth scrolling, and never requires progression to read a label. GSAP matchMedia handles responsive cleanup; font readiness and language events refresh scroll geometry. The three narrative chapters and diagram remain readable with JavaScript disabled. See [reference and fallback contract](docs/REFERENCE-REDESIGN.md).


### Selective grouped entrances

The entrance controller uses its own GSAP matchMedia context and never animates the sticky figure or the scrubbed diagram’s owned properties. Marked chapter copy, grouped headings, examples, compartment cells and builder content enter only when initially offscreen; initial viewport and non-rendered targets are left visible. Rise starts (26px) down; the builder side entrance starts (18px) left. Opacity and a small bottom clip resolve over (.65s) with power3.out easing, starting at top (88%) of the viewport and running once. Delays are index-based (.06s), capped at three indices (.18s).

Completed entrances clear opacity, transform and clip-path rather than retaining an animation-owned layout. Keyboard focus immediately reveals the closest pending entrance ancestor, kills its tween/trigger and clears those properties. Reduced-motion changes revert the matchMedia context and pending states. Missing JavaScript or module failure leaves content visible; entrance behavior never intercepts document scrolling or language changes. See [color and entrance constraints](docs/COLOR-AND-ENTRANCES.md).

## Do's and Don'ts

### Do:
- **Do** preserve the canonical mark geometry and bundled variable fonts.
- **Do** use deep navy labels on warm primary actions and the lighter accent-copy role for small warm text on raised planes.
- **Do** pair state colors with text and distinct SVG shapes.
- **Do** keep content visible without JavaScript and complete without motion.
- **Do** preserve Spanish as the static default and switch English in place on the same URL.

### Don't:
- **Don't** treat illustrative application screens or CI diagrams as shipped product interfaces.
- **Don't** replace the existing identity with provisional cobalt/peach styling.
- **Don't** introduce shadows, large oxide fields, uncontrolled or unpausable perpetual motion, or scroll hijacking.
- **Don't** create localized routes or claim separate English indexing.
- **Don't** modify the original application or its brand and product documents as part of this website system.

Not canonized or repaired: the separate application's oxide-button drift remains outside this website's authority. Context labels inside conceptual illustrations are not a reusable marketing-kicker style. The user-authorized warm action role supersedes this site’s earlier no-oxide-primary rule; it does not change the separate application. This pass changes only the two design-system files.
