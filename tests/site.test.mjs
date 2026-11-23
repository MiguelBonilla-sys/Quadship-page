import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolveBuildSite } from '../src/lib/site.mjs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const robots = readFileSync(new URL('../dist/robots.txt', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const site = resolveBuildSite(process.env);
test('primary Spanish content, one h1 and responsive viewport are rendered statically', () => {
  assert.match(html, /<html[^>]+lang="es"/); assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /name="viewport"/); assert.match(html, /Tu aplicación, en línea/); assert.match(html, /El control, en tus manos/);
  assert.match(html, /personas/); assert.match(html, /Rust/);
});
test('prelaunch state and real authorship are explicit without an invented signup', () => {
  assert.match(html, /Próximamente/); assert.match(html, /prealfa/); assert.match(html, /Miguel Ángel Bonilla Torres/);
  assert.match(html, /href="https:\/\/mangel14.dev\/es"/); assert.match(html, /Lidero el desarrollo integral/);
  assert.doesNotMatch(html, /<form\b|aggregateRating|application\/ld\+json[^>]*>[^<]*offers/);
});
test('JSON-LD agrees with visible product and author', () => {
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(raw); const graph = JSON.parse(raw)['@graph'];
  assert.equal(graph.find(x => x['@type'] === 'SoftwareApplication').name, 'QuadShip');
  assert.equal(graph.find(x => x['@type'] === 'Person').name, 'Miguel Ángel Bonilla Torres');
});
test('crawl policy and canonical match the build mode and validated origin', () => {
  if (site) {
    assert.match(html, /content="index, follow/); assert.ok(html.includes(`rel="canonical" href="${new URL(site).origin}/"`));
    assert.ok(sitemap.includes(`${new URL(site).origin}/`)); assert.match(robots, /Allow: \//);
    assert.ok(robots.includes(`Sitemap: ${new URL('sitemap.xml', site).href}`));
    assert.ok(html.includes(`property="og:url" content="${site}"`));
    const socialImage = new URL('social.png?v=quadship-3', site).href;
    assert.ok(html.includes(`property="og:image" content="${socialImage}"`));
    assert.ok(html.includes(`name="twitter:image" content="${socialImage}"`));
  } else {
    assert.match(html, /content="noindex, nofollow"/); assert.doesNotMatch(html, /rel="canonical"/);
    assert.match(robots, /Disallow: \//); assert.doesNotMatch(sitemap, /<loc>/);
    assert.doesNotMatch(html, /property="og:(?:url|image)"|name="twitter:image"/);
  }
});
test('navigation anchors have real targets and main content works without JavaScript', () => {
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), id);
  assert.match(html, /<details/); assert.match(html, /class="skip-link"/);
  assert.equal((html.match(/<script[^>]+src=/g) || []).length, 1);
});
test('social image, favicon and optional machine-readable summary exist', () => {
  for (const path of ['social.svg', 'social.png', 'favicon.svg', 'llms.txt', 'product.md']) assert.ok(existsSync(new URL(`../dist/${path}`, import.meta.url)), path);
  assert.match(html, /property="og:title"/); assert.match(html, /name="description"/);
});
test('social previews describe the actual public PNG explicitly without client-side rendering', () => {
  const image = readFileSync(new URL('../dist/social.png', import.meta.url));
  assert.deepEqual(image.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  assert.equal(width, 1200);
  assert.equal(height, 630);
  assert.ok(image.length < 5 * 1024 * 1024);
  if (site) {
    const url = new URL('social.png?v=quadship-3', site).href;
    assert.ok(html.includes(`property="og:image:secure_url" content="${url}"`));
    assert.ok(html.includes(`property="og:image:width" content="${width}"`));
    assert.ok(html.includes(`property="og:image:height" content="${height}"`));
    assert.match(html, /property="og:image:type" content="image\/png"/);
  } else {
    assert.doesNotMatch(html, /property="og:image(?::(?:secure_url|width|height|type))?"/);
  }
  assert.match(html, /name="twitter:image:alt" content="QuadShip\./);
});
