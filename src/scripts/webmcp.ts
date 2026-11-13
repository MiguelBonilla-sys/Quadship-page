type ExecutionOptions = { signal?: AbortSignal };
type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; consequentialHint: boolean; untrustedContentHint: boolean };
  execute: (input?: unknown, options?: ExecutionOptions) => Promise<unknown>;
};
type ModelContext = {
  registerTool: (tool: Tool, options: { signal: AbortSignal }) => unknown;
  unregisterTool?: (name: string) => unknown;
};
type ToolDocument = Document & { modelContext?: ModelContext };
type ToolNavigator = Navigator & { modelContext?: ModelContext };

/** Optional enhancement: no polyfill, cross-origin exposure, navigation or backend actions. */
export function setupWebMCP(root: Document = document, legacy: Navigator = navigator) {
  let context: ModelContext | undefined;
  let legacyInterface = false;
  try {
    const current = (root as ToolDocument).modelContext;
    if (typeof current?.registerTool === 'function') context = current;
  } catch { /* A restricted browser can deny access to an experimental API. */ }
  if (!context) {
    try {
      const previous = (legacy as ToolNavigator).modelContext;
      if (typeof previous?.registerTool === 'function') {
        context = previous;
        legacyInterface = true;
      }
    } catch { /* The normal landing does not depend on WebMCP support. */ }
  }
  if (!context) return () => {};

  const api = context;
  const controller = new AbortController();
  const registered = new Set<string>();
  let stopped = false;
  const removeLegacy = (name: string) => {
    if (!legacyInterface) return;
    try { api.unregisterTool?.(name); } catch { /* Best-effort old-interface cleanup. */ }
  };
  const stop = () => {
    if (stopped) return;
    stopped = true;
    controller.abort();
    for (const name of registered) removeLegacy(name);
    registered.clear();
  };
  const assertReadable = (input: unknown, options: ExecutionOptions) => {
    controller.signal.throwIfAborted();
    options.signal?.throwIfAborted();
    if (!input || typeof input !== 'object' || Array.isArray(input)
      || ![Object.prototype, null].includes(Object.getPrototypeOf(input))
      || Reflect.ownKeys(input).length !== 0) {
      throw new TypeError('This tool accepts an empty object only.');
    }
  };
  const text = (selector: string) => {
    const value = root.querySelector(selector)?.textContent?.replace(/\s+/g, ' ').trim();
    if (!value) throw new Error('QuadShip page content is unavailable.');
    return value.slice(0, 4000);
  };
  const link = (selector: string, expected: string) => {
    const href = root.querySelector(selector)?.getAttribute('href');
    if (href !== expected) throw new Error('QuadShip contact information is unavailable.');
    return href;
  };
  const annotations = { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false };
  const inputSchema = { type: 'object', properties: {}, additionalProperties: false };
  const tools: Tool[] = [
    {
      name: 'get_quadship_project_info',
      description: 'Read the current QuadShip landing page: its pre-alpha status, original product definition and planned-architecture limitations. Does not deploy or change anything.',
      inputSchema,
      annotations,
      async execute(input: unknown = {}, options: ExecutionOptions = {}) {
        assertReadable(input, options);
        const summary = root.querySelector('meta[name="description"]')?.getAttribute('content');
        if (!summary) throw new Error('QuadShip page content is unavailable.');
        return {
          name: 'QuadShip',
          status: 'pre-alpha',
          productionReady: false,
          launchDate: null,
          language: root.documentElement.lang === 'en' ? 'en' : 'es',
          headline: text('h1'),
          summary: summary.slice(0, 1000),
          definition: text('.source-definition blockquote p'),
          limitations: text('.architecture-note'),
          resources: { homepage: 'https://quadship.app/', product: 'https://quadship.app/product.md' },
        };
      },
    },
    {
      name: 'get_quadship_contact',
      description: 'Read the real QuadShip development lead attribution and existing portfolio/contact links. Does not open links, send messages or collect personal data.',
      inputSchema,
      annotations,
      async execute(input: unknown = {}, options: ExecutionOptions = {}) {
        assertReadable(input, options);
        return {
          name: text('.builder-name'),
          role: text('.builder-role'),
          portfolio: link('.builder-copy a[href]', 'https://mangel14.dev/es'),
          contact: link('.closing-action a[href]', 'https://mangel14.dev/es#contacto'),
        };
      },
    },
  ];
  void (async () => {
    try {
      for (const tool of tools) {
        if (stopped) return;
        await api.registerTool(tool, { signal: controller.signal });
        if (stopped) { removeLegacy(tool.name); return; }
        registered.add(tool.name);
      }
    } catch { stop(); }
  })();
  return stop;
}
