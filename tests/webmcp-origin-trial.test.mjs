import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveBuildSite } from '../src/lib/site.mjs';
import { WEBMCP_ORIGIN_TRIAL_TOKEN, WEBMCP_TRIAL_ORIGIN, WEBMCP_TRIAL_EXPIRES_AT, getWebMCPOriginTrialToken } from '../src/lib/webmcp-origin-trial.mjs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('the registered production build publishes its WebMCP trial token before client scripts', () => {
  const meta = html.match(/<meta\b[^>]*http-equiv="origin-trial"[^>]*content="([^"]+)"[^>]*>/i);
  const eligible = resolveBuildSite(process.env) === 'https://quadship.app/' && Date.now() < 1806364800000;
  if (!eligible) {
    assert.equal(meta, null);
    return;
  }
  assert.ok(meta, 'production must publish the owner-issued origin-trial token');
  const encoded = Buffer.from(meta[1], 'base64');
  const payload = JSON.parse(encoded.subarray(69).toString('utf8'));
  assert.equal(payload.feature, 'WebMCP');
  assert.equal(new URL(payload.origin).origin, 'https://quadship.app');
  assert.equal(payload.expiry, 1806364800);
  assert.ok(html.indexOf(meta[0]) < html.search(/<script[^>]*type="module"/));
});


test('trial metadata matches the owner-issued public token payload', () => {
  const encoded = Buffer.from(WEBMCP_ORIGIN_TRIAL_TOKEN, 'base64');
  assert.equal(encoded[0], 2);
  assert.equal(encoded.readUInt32BE(65), encoded.length - 69);
  const payload = JSON.parse(encoded.subarray(69).toString('utf8'));
  assert.equal(payload.feature, 'WebMCP');
  assert.equal(new URL(payload.origin).origin, WEBMCP_TRIAL_ORIGIN);
  assert.equal(payload.expiry * 1000, WEBMCP_TRIAL_EXPIRES_AT);
});

test('only the registered production origin receives the unexpired trial', () => {
  const now = Date.UTC(2026, 10, 16);
  assert.equal(getWebMCPOriginTrialToken('https://quadship.app/', now), WEBMCP_ORIGIN_TRIAL_TOKEN);
  assert.equal(getWebMCPOriginTrialToken(new URL('https://quadship.app:443/'), now), WEBMCP_ORIGIN_TRIAL_TOKEN);
  for (const site of [undefined, '', 'https://preview.quadship.app/', 'https://other.example/', 'http://quadship.app/']) {
    assert.equal(getWebMCPOriginTrialToken(site, now), undefined);
  }
});

test('expired builds omit the optional trial without breaking the landing', () => {
  assert.equal(getWebMCPOriginTrialToken(WEBMCP_TRIAL_ORIGIN, WEBMCP_TRIAL_EXPIRES_AT - 1), WEBMCP_ORIGIN_TRIAL_TOKEN);
  assert.equal(getWebMCPOriginTrialToken(WEBMCP_TRIAL_ORIGIN, WEBMCP_TRIAL_EXPIRES_AT), undefined);
  assert.equal(getWebMCPOriginTrialToken(WEBMCP_TRIAL_ORIGIN, WEBMCP_TRIAL_EXPIRES_AT + 1), undefined);
});
