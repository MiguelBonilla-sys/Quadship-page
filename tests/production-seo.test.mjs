import test from 'node:test';
import assert from 'node:assert/strict';
import * as siteConfig from '../src/lib/site.mjs';

test('the default production build uses the verified QuadShip origin', () => {
  assert.equal(siteConfig.resolveBuildSite({}), 'https://quadship.app/');
  assert.equal(siteConfig.resolveBuildSite({ VERCEL_ENV: 'production' }), 'https://quadship.app/');
});

test('explicit previews and nonproduction Vercel builds cannot become indexable', () => {
  for (const env of [
    { SITE_PREVIEW: '1' },
    { SITE_URL: '' },
    { VERCEL_ENV: 'preview' },
    { VERCEL_ENV: 'development' },
    { VERCEL_ENV: 'unknown' },
    { VERCEL_ENV: 'preview', SITE_PREVIEW: '0', SITE_URL: 'https://quadship.app' },
  ]) assert.equal(siteConfig.resolveBuildSite(env), undefined);
});

test('an explicit valid production origin remains supported and normalized', () => {
  assert.equal(siteConfig.resolveBuildSite({ SITE_URL: 'https://launch.real-domain.dev' }), 'https://launch.real-domain.dev/');
});

test('invalid origins still fail even when the build is a preview', () => {
  for (const SITE_URL of ['not a url', 'http://quadship.app', 'https://user:pass@quadship.app']) {
    assert.throws(() => siteConfig.resolveBuildSite({ SITE_URL }), { message: /SITE_URL/ });
    assert.throws(() => siteConfig.resolveBuildSite({ SITE_URL, SITE_PREVIEW: '1' }), { message: /SITE_URL/ });
  }
});

test('a misspelled explicit preview switch fails instead of publishing by accident', () => {
  assert.throws(() => siteConfig.resolveBuildSite({ SITE_PREVIEW: 'true' }), { message: /SITE_PREVIEW/ });
});
