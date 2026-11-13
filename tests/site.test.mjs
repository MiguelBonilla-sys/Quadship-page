import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const robots = readFileSync(new URL('../dist/robots.txt', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const site = process.env.SITE_URL;
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
test('crawl policy and canonical use only configured origin', () => {
  if (site) {
    assert.match(html, /content="index, follow/); assert.ok(html.includes(`rel="canonical" href="${new URL(site).origin}/"`));
    assert.ok(sitemap.includes(`${new URL(site).origin}/`)); assert.match(robots, /Allow: \//);
  } else {
    assert.match(html, /content="noindex, nofollow"/); assert.doesNotMatch(html, /rel="canonical"/);
    assert.match(robots, /Disallow: \//); assert.doesNotMatch(sitemap, /<loc>/);
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
