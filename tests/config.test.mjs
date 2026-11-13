import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveSite } from '../src/lib/site.mjs';
test('an unconfigured preview has no invented production URL', () => assert.equal(resolveSite(), undefined));
test('a production HTTPS origin is normalized', () => assert.equal(resolveSite('https://launch.real-domain.dev/'), 'https://launch.real-domain.dev/'));
test('invalid or ambiguous origins fail rather than publish wrong canonicals', () => {
  for (const value of ['http://launch.real-domain.dev', 'https://localhost', 'https://example.com', 'https://launch.real-domain.dev/path', 'https://user:pass@launch.real-domain.dev', 'https://launch.real-domain.dev/?q=x', 'https://launch.real-domain.dev/#top', 'not a url']) assert.throws(() => resolveSite(value), { message: /SITE_URL/ });
});
