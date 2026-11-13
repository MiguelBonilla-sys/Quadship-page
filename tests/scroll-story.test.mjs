import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const html = readFileSync(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
test("reference-led composition opens with a large causal product diagram", () => {
  assert.match(html, /class="hero-diagram"/);
  assert.match(html, /data-scroll-story/);
  assert.equal((html.match(/data-story-step="[0-2]"/g) || []).length, 3);
  assert.match(html, /data-story-wire/);
});
test("generic whole-section fade reveals no longer drive the design", () => {
  assert.doesNotMatch(html, /data-reveal/);
  assert.match(html, /Los detalles, para quien los quiera/);
});
