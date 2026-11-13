import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const css = readFileSync(
  new URL("../src/styles/global.css", import.meta.url),
  "utf8",
);
const colors = Object.fromEntries(
  [...css.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, key, value]) => [
    key,
    value,
  ]),
);
function luminance(hex) {
  const c = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
test("attention uses a warm brand action and distinct tonal surface roles", () => {
  for (const key of [
    "--action-bg",
    "--action-ink",
    "--surface-deep",
    "--surface-raised",
    "--accent-ink",
  ])
    assert.ok(colors[key], key);
  assert.ok(
    new Set([
      colors["--bg"],
      colors["--surface-deep"],
      colors["--surface-raised"],
    ]).size === 3,
  );
});
test("action labels and accent copy preserve normal-text contrast", () => {
  assert.ok(
    colors["--action-bg"] && colors["--action-ink"] && colors["--accent-ink"],
  );
  assert.ok(contrast(colors["--action-bg"], colors["--action-ink"]) >= 4.5);
  assert.ok(
    contrast(colors["--accent-ink"], colors["--surface-raised"]) >= 4.5,
  );
});
