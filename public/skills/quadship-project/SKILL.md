---
name: quadship-project
description: "Trigger: QuadShip product, pre-alpha status, architecture or contact questions. Read verified project facts and development-lead links."
license: Proprietary
metadata:
  author: MiguelBonilla-sys
  version: "1.0"
---

## Activation Contract

Use this skill to answer questions about the public QuadShip landing, planned architecture, release readiness or development-lead contact.

## Hard Rules

- Treat QuadShip as pre-alpha and not production-ready. Describe version1 capabilities as plans, not shipped guarantees.
- Do not deploy, provision, sign up, send messages, request credentials or claim an operational remote MCP service.
- Read only public information. Do not change browser settings or bypass feature availability.

## Decision Gates

| Available interface | Action |
| --- | --- |
| Native `document.modelContext` with the named tools | Discover with `getTools()`; pass the returned tool object and `{}` to `executeTool()`. |
| Unsupported browser or unavailable tools | Read the same facts from the page and product document. Do not install a fake API. |

## Execution Steps

1. Read the current page and its explicit development limitations.
2. For project questions, use `get_quadship_project_info` when available; otherwise read the original definition and architecture note.
3. For contact questions, use `get_quadship_contact` when available; otherwise read the development-lead section and existing portfolio/contact links. Do not navigate or send anything without the user's request.
4. Keep the distinction between this read-only browser integration and the planned QuadShip platform MCP server explicit.

## Output Contract

Answer in the user's language. Cite the current public source, preserve pre-alpha qualifications and use only the real contact links. Do not invent launch dates, customers, prices or operational capabilities.

## References

- [Public project landing](/)
- [Factual product summary](/product.md)
