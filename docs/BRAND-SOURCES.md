# Preserve QuadShip’s existing identity

The landing follows the existing product documents, not the superseded provisional cobalt/peach identity. The application and original documents were inspected read-only; no source content was rewritten.

## Authoritative local sources

Source application checkout supplied by the user: `v2-fu-app/`. Paths below are relative to that separate source repository; local absolute paths are intentionally not published.

| Source | Material preserved |
| --- | --- |
| `docs/design/brand-guide.html:8–57` | Exact naval palette and font families. |
| `docs/design/brand-guide.html:237–247` | Original compartment-diamond geometry. |
| `docs/design/brand-guide.html:344–349` | Lowercase quadship lockup; QuadShip in prose; Archivo width118%, weight760 and tracking−1.5%. |
| `docs/design/brand-guide.html:409–442` | Scarce oxide accent, separate status colors and labels. |
| `docs/design/brand-guide.html:499–506` | Compartment separators, 4px corners, no shadows. |
| `web/public/favicon.svg` | Original geometry preserved in public/favicon.svg; adaptive dark-tab colors use the same documented dark variant as public/quadship-mark.svg. |
| `docs/spec.md:10` | Original definition reproduced verbatim, visibly identified as the original specification. |
| `docs/requirements/functional.md:284–309` | Database bindings and v1-target qualifications. |
| `docs/adr/0012-llm-opcional-byo-key.md:5` | Optional LLM means text assistance, not autonomous execution. |
| `README.md:14` | Pre-alpha, not production-ready. |

The canonical guide, not a conflicting app detail, is authoritative: the app currently uses oxide primary buttons while the guide prescribes Casco primary actions. The landing uses Casco on light surfaces and a legible inverse treatment on Casco; it does not change the app.

## Content boundaries

- Original source documents remain intact. The landing does not claim to reproduce all 132 documentation files or establish their individual authorship.
- Original product definition is preserved verbatim. New explanatory copy is not presented as a quotation.
- Feature lists and installation/performance/security figures in the specifications are targets, not shipped capabilities or achieved benchmarks.
- Do not repeat the brand text’s absolute “nothing runs as root” as a guarantee: ADR0007 specifies a privileged agent and ADR0006 a rootful control-plane database. Rootless application workloads is the accurate scope.
- Compatibility does not imply partnership. No third-party logos appear.

## Review coverage

All 132 files were inventoried by format, headings and topic: 72 Markdown, 37 TXT and 23 other artifacts. Deep reading covered the brand guide, spec, functional requirements, wireframes, README and coordinator handoff; targeted passages covered status, ADR, legal, research and implementation tokens/assets. This was not a full semantic or security audit of every historical log, fixture or script.

## Asset provenance

Canonical favicon geometry is unchanged; light tabs use original navy/Oxide and dark tabs use the documented light-ink/dark-Oxide variant. The favicon URL is versioned to refresh browser caches. The visible mark uses the canonical geometry with documented dark colors. The final social PNG is rendered from scripts/social-card.html in Chromium using the real bundled Archivo width/weight axes and Atkinson typography, with embedded provenance. The SVG is an editable alternate, not the PNG typography authority. It is not an AI-generated logo. Self-hosted Archivo standard includes width and weight axes; Atkinson Hyperlegible Next is the body face. No technical-code surface currently needs the guide’s Mono family.

## Explicit later user direction

The user rejected a white page and requested a slightly lighter tone of #12233A. The canvas is #1B2E47 with #243A54 surfaces; original mark geometry, Archivo/Atkinson families and documented dark oxide #E8714F remain intact. This explicit direction supersedes the earlier light-canvas decision, not the brand’s identity.
