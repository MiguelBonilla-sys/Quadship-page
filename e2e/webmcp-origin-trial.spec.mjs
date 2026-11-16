import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const hasTrial = /http-equiv="origin-trial"/.test(html);

test('the production token enables real WebMCP without experimental Chrome flags', async ({page}) => {
  test.skip(!hasTrial, 'Preview or expired build intentionally omits the trial.');
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // Serve candidate bytes at their signed origin only inside this isolated browser.
  // No production response or account setting is changed, and no API is mocked.
  await page.route('https://quadship.app/**', async route => {
    const url = new URL(route.request().url());
    const response = await route.fetch({url:`http://127.0.0.1:4333${url.pathname}${url.search}`});
    await route.fulfill({response});
  });
  await page.goto('https://quadship.app/', {waitUntil:'networkidle'});
  expect(await page.evaluate(()=>isSecureContext)).toBe(true);
  await expect.poll(()=>page.evaluate(()=>typeof document.modelContext?.registerTool)).toBe('function');
  await expect.poll(()=>page.evaluate(async()=>(await document.modelContext.getTools()).map(tool=>tool.name))).toEqual([
    'get_quadship_contact', 'get_quadship_project_info',
  ]);
  const info = await page.evaluate(async()=>{
    const tools=await document.modelContext.getTools();
    const tool=tools.find(tool=>tool.name==='get_quadship_project_info');
    const result=await document.modelContext.executeTool(tool,{});
    return typeof result==='string' ? JSON.parse(result) : result;
  });
  expect(info.name).toBe('QuadShip');
  expect(info.status).toBe('pre-alpha');
  expect(info.productionReady).toBe(false);
  expect(errors).toEqual([]);
});
