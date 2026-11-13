import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { createAgentManifest } from '../src/lib/agent-resources.mjs';
import { setupWebMCP } from '../src/scripts/webmcp.ts';

const schemaText = readFileSync(new URL('./fixtures/ard-entry.schema.json', import.meta.url), 'utf8');
const schema = JSON.parse(schemaText);
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(schema);
const validate = ajv.compile({ $ref: `${schema.$id}#/$defs/ArdManifest` });
const settle = () => new Promise(resolve => setImmediate(resolve));

function context({ failOn = 0 } = {}) {
  const tools = new Map();
  const calls = [];
  return {
    tools, calls,
    async registerTool(tool, options) {
      calls.push({ tool, options });
      if (calls.length === failOn) throw new Error('Registration refused');
      tools.set(tool.name, tool);
      options.signal.addEventListener('abort', () => tools.delete(tool.name), { once: true });
    },
    unregisterTool(name) { tools.delete(name); },
  };
}

function documentFixture(modelContext) {
  const values = {
    h1: 'Tu aplicación, en línea. El control, en tus manos.',
    '.source-definition blockquote p': 'Es un PaaS self-hosted en Rust.',
    '.architecture-note': 'Las capacidades pertenecen al objetivo de la versión 1; no son garantías de producción.',
    '.builder-name': 'Miguel Ángel Bonilla Torres',
    '.builder-role': 'Líder del desarrollo integral de QuadShip',
  };
  const attrs = {
    'meta[name="description"]': { content: 'QuadShip: una plataforma en desarrollo.' },
    '.builder-copy a[href]': { href: 'https://mangel14.dev/es' },
    '.closing-action a[href]': { href: 'https://mangel14.dev/es#contacto' },
  };
  return {
    modelContext,
    documentElement: { lang: 'es' },
    querySelector(selector) {
      if (selector in values) return { textContent: values[selector] };
      if (selector in attrs) return { getAttribute: name => attrs[selector][name] };
      return null;
    },
  };
}

test('ARD uses the official manifest schema and truthful discoverable resources', () => {
  assert.equal(createHash('sha256').update(schemaText).digest('hex'), '3032dad432607ddae0ec088db5759fa456f36308e0e9f340165aaed504d535f4');
  const manifest = createAgentManifest();
  assert.equal(validate(manifest), true, JSON.stringify(validate.errors));
  assert.equal(manifest.entries.length, 1);
  assert.equal('collections' in manifest, false);
  for (const entry of manifest.entries) {
    assert.match(entry.identifier, /^urn:air:quadship\.app:/);
    assert.equal(entry.type, 'text/markdown; profile="urn:air:agent-skills"');
    assert.equal(new URL(entry.url).origin, 'https://quadship.app');
    assert.equal('data' in entry, false);
    assert.ok(entry.representativeQueries.length >= 2 && entry.representativeQueries.length <= 5);
    assert.ok(entry.representativeQueries.every(query => typeof query === 'string' && query.length > 10));
  }
  assert.doesNotMatch(JSON.stringify(manifest), /mcp-server-card|deploy_application|trustManifest|\/Users\//);
  const invalid = structuredClone(manifest);
  invalid.entries[0].data = {};
  assert.equal(validate(invalid), false, 'url and data must be mutually exclusive');
  invalid.entries[0] = { identifier: 'not-a-urn', displayName: 'Invalid', type: 'text/html' };
  assert.equal(validate(invalid), false, 'missing resource and invalid identifier must fail');
});

test('all catalog route aliases serve the same single-source manifest', () => {
  for (const path of ['.well-known/ard.json', '.well-known/ai-catalog.json', 'ai-catalog.json']) {
    const manifest = JSON.parse(readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8'));
    assert.deepEqual(manifest, createAgentManifest(), path);
    assert.equal(validate(manifest), true, JSON.stringify(validate.errors));
  }
});

test('document WebMCP is preferred and exposes only two validated read-only tools', async () => {
  const api = context();
  const legacy = context();
  const root = documentFixture(api);
  const before = JSON.stringify(root.documentElement);
  const stop = setupWebMCP(root, { modelContext: legacy });
  await settle();
  assert.equal(api.tools.size, 2);
  assert.equal(legacy.calls.length, 0);
  assert.deepEqual([...api.tools.keys()], ['get_quadship_project_info', 'get_quadship_contact']);
  for (const { tool, options } of api.calls) {
    assert.equal(typeof tool.description, 'string');
    assert.equal(tool.inputSchema.type, 'object');
    assert.equal(tool.inputSchema.additionalProperties, false);
    assert.deepEqual(tool.annotations, { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false });
    assert.deepEqual(Object.keys(options), ['signal']);
    const validateInput = ajv.compile(tool.inputSchema);
    assert.equal(validateInput({}), true);
    assert.equal(validateInput({ url: 'https://untrusted.invalid/' }), false);
    for (const invalid of [null, [], 5, 'text', { url: 'https://untrusted.invalid/' }, { __proto__: null, extra: true }]) {
      await assert.rejects(tool.execute(invalid), TypeError);
    }
  }
  const info = await api.tools.get('get_quadship_project_info').execute({});
  assert.equal(info.status, 'pre-alpha');
  assert.equal(info.productionReady, false);
  assert.equal(info.launchDate, null);
  assert.equal(info.definition, 'Es un PaaS self-hosted en Rust.');
  const contact = await api.tools.get('get_quadship_contact').execute({});
  assert.equal(contact.name, 'Miguel Ángel Bonilla Torres');
  assert.equal(contact.portfolio, 'https://mangel14.dev/es');
  assert.equal(contact.contact, 'https://mangel14.dev/es#contacto');
  assert.equal(JSON.stringify(root.documentElement), before, 'reading tools must not alter page state');
  const cachedTool = api.tools.get('get_quadship_project_info');
  stop();
  assert.equal(api.tools.size, 0);
  await assert.rejects(cachedTool.execute({}), { name: 'AbortError' });
});

test('unsupported browsers are unchanged and legacy registration is compatibility-only', async () => {
  assert.doesNotThrow(() => setupWebMCP(documentFixture(undefined), {} )());
  const legacy = context();
  const stop = setupWebMCP(documentFixture(undefined), { modelContext: legacy });
  await settle();
  assert.equal(legacy.tools.size, 2);
  stop();
  assert.equal(legacy.tools.size, 0);
});

test('registration failure, execution cancellation and missing content fail safely', async () => {
  const api = context({ failOn: 2 });
  const stop = setupWebMCP(documentFixture(api), {});
  await settle();
  assert.equal(api.tools.size, 0, 'partial registration must be rolled back');
  assert.doesNotThrow(stop);
  const working = context();
  const root = documentFixture(working);
  const dispose = setupWebMCP(root, {});
  await settle();
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(working.tools.get('get_quadship_project_info').execute({}, { signal: controller.signal }), { name: 'AbortError' });
  root.querySelector = () => null;
  await assert.rejects(working.tools.get('get_quadship_contact').execute({}), /unavailable/);
  dispose();
});

test('ARD advertises genuine Agent Skills instructions with the recognized media profile', () => {
  for (const entry of createAgentManifest().entries) {
    assert.equal(entry.type, 'text/markdown; profile="urn:air:agent-skills"');
    const resource = new URL(entry.url);
    const skill = readFileSync(new URL(`../public${resource.pathname}`, import.meta.url), 'utf8');
    assert.match(skill, /^---\nname: quadship-project\n/);
    assert.match(skill, /description: "/);
    assert.match(skill, /get_quadship_project_info/);
    assert.match(skill, /get_quadship_contact/);
    assert.match(skill, /pre-alpha/);
    assert.match(skill, /Do not deploy/);
  }
});
