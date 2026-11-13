/** One factual discovery document, served under canonical and compatibility routes. */
export function createAgentManifest() {
  return {
    entries: [
      {
        identifier: 'urn:air:quadship.app:skill:quadship-project',
        displayName: 'Read QuadShip project information and contact',
        type: 'text/markdown; profile="urn:air:agent-skills"',
        url: 'https://quadship.app/skills/quadship-project/SKILL.md',
        description: 'Read-only Agent Skills instructions for the actual QuadShip landing: use its two browser tools when supported, or read the same public product and contact information without them. No backend or deployment actions.',
        capabilities: ['project-information', 'development-lead-contact', 'conditional-webmcp-browser-tools'],
        representativeQueries: [
          'What is QuadShip, and is it ready for production?',
          'Who leads QuadShip development, and how can I contact them?',
          'What deployment architecture is QuadShip working toward?',
        ],
      },
    ],
  };
}

export function createAgentManifestResponse() {
  return new Response(JSON.stringify(createAgentManifest()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
