import { test, expect, chromium } from '@playwright/test';

const names = ['get_quadship_project_info', 'get_quadship_contact'];

async function mockAPI(page, { legacy = false, failOn = 0 } = {}) {
  await page.addInitScript(({ legacy, failOn }) => {
    const tools = new Map();
    const calls = [];
    const api = {
      async registerTool(tool, options) {
        calls.push({ name: tool.name, options: Object.keys(options), schema: tool.inputSchema, annotations: tool.annotations });
        if (calls.length === failOn) throw new Error('Mock registration refusal');
        tools.set(tool.name, tool);
        options.signal.addEventListener('abort', () => tools.delete(tool.name), { once: true });
      },
      unregisterTool(name) { tools.delete(name); },
    };
    window.__agentTest = { tools, calls };
    if (legacy) Object.defineProperty(document, 'modelContext', { configurable: true, value: undefined });
    Object.defineProperty(legacy ? navigator : document, 'modelContext', { configurable: true, value: api });
    if (!legacy) {
      Object.defineProperty(navigator, 'modelContext', { configurable: true, value: {
        registerTool() { throw new Error('Legacy API must not be preferred'); },
      } });
    }
  }, { legacy, failOn });
}

test('canonical and compatibility catalogs return one real JSON manifest', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="ard"]')).toHaveAttribute('href', '/.well-known/ard.json');
  const manifests = [];
  for (const path of ['/.well-known/ard.json', '/.well-known/ai-catalog.json', '/ai-catalog.json']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/application\/json/);
    manifests.push(await response.json());
  }
  expect(manifests[1]).toEqual(manifests[0]);
  expect(manifests[2]).toEqual(manifests[0]);
  for (const entry of manifests[0].entries) {
    const url = new URL(entry.url);
    const resource = await request.get(url.pathname);
    expect(resource.status()).toBe(200);
  }
});

test('mocked current WebMCP reads real page content without changing the page', async ({ page }) => {
  await mockAPI(page);
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => [...window.__agentTest.tools.keys()])).toEqual(names);
  const before = await page.locator('body').evaluate(e => e.outerHTML);
  const result = await page.evaluate(async () => {
    const info = await window.__agentTest.tools.get('get_quadship_project_info').execute({});
    const contact = await window.__agentTest.tools.get('get_quadship_contact').execute({});
    return { info, contact, calls: window.__agentTest.calls };
  });
  expect(result.info.status).toBe('pre-alpha');
  expect(result.info.productionReady).toBe(false);
  expect(result.info.definition).toContain('PaaS self-hosted en Rust');
  expect(result.contact.name).toBe('Miguel Ángel Bonilla Torres');
  expect(result.contact.contact).toBe('https://mangel14.dev/es#contacto');
  expect(result.calls.every(call => call.annotations.readOnlyHint && !call.annotations.consequentialHint)).toBe(true);
  expect(await page.locator('body').evaluate(e => e.outerHTML)).toBe(before);
  await page.locator('[data-language="en"]').click();
  const english = await page.evaluate(() => window.__agentTest.tools.get('get_quadship_project_info').execute({}));
  expect(english.language).toBe('en');
  expect(english.headline).toContain('Your application, online.');
  expect(await page.evaluate(async () => {
    try { await window.__agentTest.tools.get('get_quadship_contact').execute({url:'https://untrusted.invalid/'}); return false; }
    catch (error) { return error instanceof TypeError; }
  })).toBe(true);
});

test('mocked legacy support and registration failure keep the landing usable', async ({ browser }) => {
  for (const options of [{legacy:true}, {failOn:2}]) {
    const context = await browser.newContext({reducedMotion:'reduce'});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await mockAPI(page, options);
    await page.goto('http://127.0.0.1:4333/');
    await expect.poll(() => page.evaluate(() => window.__agentTest.calls.length)).toBe(2);
    await expect.poll(() => page.evaluate(() => window.__agentTest.tools.size)).toBe(options.failOn ? 0 : 2);
    await page.locator('[data-language="en"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang','en');
    expect(errors).toEqual([]);
    await context.close();
  }
});

test('unsupported browsers do not receive a fake API or lose page controls', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'modelContext', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'modelContext', { configurable: true, value: undefined });
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('[data-language="en"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.evaluate(() => [typeof document.modelContext, typeof navigator.modelContext])).toEqual(['undefined', 'undefined']);
  expect(errors).toEqual([]);
});

test('native flagged Chrome registers and executes actual WebMCP tools', async () => {
  const browser = await chromium.launch({channel:'chrome',args:['--enable-features=WebMCP']});
  try {
    const page = await browser.newPage({reducedMotion:'reduce'});
    await page.goto('http://127.0.0.1:4333/');
    const supported = await page.evaluate(() => typeof document.modelContext?.registerTool === 'function');
    test.skip(!supported, 'Installed Chrome does not expose the documented WebMCP testing feature.');
    await expect.poll(() => page.evaluate(async () => (await document.modelContext.getTools()).map(tool => tool.name))).toEqual([...names].sort());
    const result = await page.evaluate(async () => {
      const tools = await document.modelContext.getTools();
      const values = {};
      for (const tool of tools) values[tool.name] = JSON.parse(await document.modelContext.executeTool(tool, {}));
      return values;
    });
    expect(result.get_quadship_project_info.productionReady).toBe(false);
    expect(result.get_quadship_project_info.definition).toContain('PaaS self-hosted en Rust');
    expect(result.get_quadship_contact.name).toBe('Miguel Ángel Bonilla Torres');
    expect(result.get_quadship_contact.portfolio).toBe('https://mangel14.dev/es');
  } finally { await browser.close(); }
});
