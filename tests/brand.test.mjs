import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const root = new URL('../', import.meta.url);
test('canonical compartment diamond and naval palette are preserved', () => {
 const favicon = readFileSync(new URL('public/favicon.svg',root),'utf8');
 const css = readFileSync(new URL('src/styles/global.css',root),'utf8');
 assert.match(favicon, /rotate\(45 16 16\)/);
 for (const color of ['#13233A','#B4442A']) assert.ok(favicon.includes(color));
 for (const color of ['#13233A','#B4442A','#4F5E72','#F4F6F8','#D3DAE2']) assert.ok(css.toLowerCase().includes(color.toLowerCase()));
 assert.match(css, /Archivo/); assert.match(css, /Atkinson/);
 assert.doesNotMatch(css, /Manrope|#2545d6|#ffbf98/i);
});
test('original product definition and key documented differentiators remain in HTML', () => {
 const html=readFileSync(new URL('dist/index.html',root),'utf8');
 const original='Es un PaaS self-hosted en Rust: Podman rootless con un usuario Linux por proyecto, supervisión nativa con systemd/Quadlet, Caddy con HTTPS automático, deploy que solo avanza cuando el CI está en verde y un servidor MCP de primera clase con aprobaciones humanas para las acciones destructivas.';
 assert.ok(html.includes(original));
 for (const fragment of ['CI', 'MCP', 'bases de datos', 'aprobaciones humanas', 'Próximamente', 'quadship']) assert.ok(html.includes(fragment),fragment);
});
test('favicon keeps the original diamond while adapting to light and dark browser tabs', () => {
 const favicon=readFileSync(new URL('public/favicon.svg',root),'utf8');
 const html=readFileSync(new URL('dist/index.html',root),'utf8');
 assert.equal((favicon.match(/<rect /g)||[]).length,4);
 assert.match(favicon,/prefers-color-scheme:\s*dark/);
 for(const color of ['#13233A','#B4442A','#E6ECF2','#E8714F']) assert.ok(favicon.includes(color));
 assert.match(html,/href="\/favicon\.svg\?v=quadship-2"/);
});
