# Real browser tools and one discovery catalog

QuadShip exposes two read-only tools for the existing landing page, not a deployment backend. Unsupported browsers keep the normal page, controls and content. No fake forms or global API polyfills are added to change an audit result.

## Discovery

The same manifest is generated from `src/lib/agent-resources.mjs` at:

- `/.well-known/ard.json` — current canonical ARD location, advertised with `rel="ard"`.
- `/.well-known/ai-catalog.json` — legacy discovery compatibility.
- `/ai-catalog.json` — compatibility alias for the explicitly requested filename.

Every alias returns identical JSON. The entry describes a real Agent Skills instruction document at `/skills/quadship-project/SKILL.md`, with a domain-anchored identifier and representative queries. Its recognized media type is `text/markdown; profile="urn:air:agent-skills"`; the document actually contains the required name/description frontmatter and bounded operational instructions for the two real read-only tools, plus an ordinary browsing fallback. The landing and product summary remain linked sources, not falsely relabeled discovery artifacts. They do not claim an operational remote MCP server, a server card, provisioning, or an invented standardized WebMCP descriptor.

Do not add an `Agentmap:` robots directive: [Lighthouse issue17480](https://github.com/GoogleChrome/lighthouse/issues/17480) reports that its ordinary robots audit rejects that directive. HTML and well-known discovery are sufficient.

## Browser registration

`setupWebMCP()` is exported from `src/scripts/webmcp.ts`. Call it once after the normal client initializes; it returns a teardown function. It feature-detects the callable `document.modelContext.registerTool` first. A legacy navigator-method fallback is compatibility-only, not an assertion of universal older-browser support.

| Tool | Actual behavior |
| --- | --- |
| `get_quadship_project_info` | Reads the current page's headline, description, original product definition and limitations. Explicitly returns pre-alpha status, no production readiness and no announced launch date. |
| `get_quadship_contact` | Reads the real development lead's attribution and existing portfolio/contact links. Does not open links or send messages. |

Both accept an empty object only. Their JSON Schemas reject additional properties; runtime checks also reject unknown keys, arrays, non-objects and unsupported prototypes. They never accept arbitrary URLs, HTML, code, credentials, filenames or deployment instructions. The callbacks return plain JSON-serializable data from the page rather than assuming a mandatory MCP `content[]` envelope.

Tools are same-origin by default; no cross-origin `exposedTo` option is added. Annotations correctly mark them read-only and non-consequential. Registration uses an AbortController signal; teardown cancels its registrations, execution honors cancellation, and a registration failure rolls back partial registration without breaking the page. Legacy cleanup uses `unregisterTool` when available. No tools mutate page state or access a backend.

## Standards and schema provenance

Verified November13,2026:

- [Chrome imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api), updated October16: current document interface, registration signals and JSON-serializable results.
- [Chrome secure tools guidance](https://developer.chrome.com/docs/ai/webmcp/secure-tools), updated September1: runtime validation, limited exposure and honest annotations.
- [W3C WebMCP draft](https://webmachinelearning.github.io/webmcp/): registration and execution contracts.
- [Lighthouse ARD guidance](https://developer.chrome.com/docs/lighthouse/agentic-browsing/ard), updated October20: canonical ARD discovery and legacy catalog compatibility.
- [ARD0.91 specification](https://agenticresourcediscovery.org/spec/) and its [official JSON Schema](https://github.com/ards-project/ard-spec/blob/main/spec/schemas/ard-entry.schema.json).

The unmodified schema snapshot lives at `tests/fixtures/ard-entry.schema.json`. Its SHA256 is `3032dad432607ddae0ec088db5759fa456f36308e0e9f340165aaed504d535f4`. Tests use Ajv2020 plus formats against `#/$defs/ArdManifest`, not the schema's default single-entry root. The snapshot is pinned by a digest; its upstream URL remains a moving branch, so any future schema update requires deliberate review of the bytes and assertions.

## Evidence and limits

The new Node rules were observed failing before their modules/routes existed, then passed in an isolated scratch build. Six Node checks cover official-schema validation, identical route aliases, document-preferred/legacy feature detection, strict input and read-only output, cancellation, teardown and registration failure.

Browser tests separately cover real catalog HTTP responses, mocked document/legacy contracts and unsupported-browser behavior. A real installed Chrome157 run with the documented `--enable-features=WebMCP` testing feature registered both tools through the native document API, discovered them with `getTools()` and executed them with `executeTool()`. Native discovery is alphabetically ordered, unlike mock registration order; the test respects that contract.

This local native test is not proof of universal, unflagged production support. [Chrome's WebMCP overview](https://developer.chrome.com/docs/ai/webmcp) still describes an origin trial; any production token must be registered by the owner and scoped to the real origin. No token or browser support is fabricated here. Unsupported or irrelevant Lighthouse WebMCP/form checks may correctly remain Not applicable. A valid ARD manifest proves its discovery/schema, not arbitrary operational capabilities or guaranteed AI citations.


## Recognized artifact correction

The initial schema-valid catalog advertised generic HTML/Markdown and received low-severity Lighthouse media-type warnings. A regression rule was observed RED, then the catalog was changed to advertise a genuine Agent Skills document rather than relabeling the HTML or summary. Its structure follows the [Agent Skills specification](https://agentskills.io/specification). This is a public discovery artifact, not an installed repository-development skill; no personal skill installation or AGENTS.md registration is performed. Its Proprietary metadata does not grant a new open-source license to the application.

## Owner-issued production origin trial

The owner supplied a public WebMCP trial token for `https://quadship.app:443`. Its payload permits subdomains, but this build publishes it only for the canonical `https://quadship.app` origin. It expires at March30,2027,00:00UTC (March29,2027,19:00 in Bogotá). Keep the public token and its matching expiry in `src/lib/webmcp-origin-trial.mjs`; renew both together before expiration. This token is intentionally visible in HTML, not an API key or account credential.

The head meta tag precedes client modules. Development, explicit previews, unrelated production origins and expired builds omit it. An already-deployed expired token is ignored by Chrome; the existing feature detection keeps ordinary page controls usable. No fake forms, new tools, broader cross-origin exposure or browser flags are added.

The production meta rule was observed RED before implementation, then passed. Unit checks cover payload/expiry consistency and production/preview/origin boundaries. A native Chrome test uses no experimental flags: it serves candidate build bytes at the token's HTTPS origin only inside an isolated browser, discovers both real tools and executes project information. This validates browser acceptance of the signed token without mutating the live site; deployed activation still needs publication and a live check.

The secret scanner exception is limited to the one public token declaration (`gitleaks:allow`); no credential category or repository-wide rule is disabled.
