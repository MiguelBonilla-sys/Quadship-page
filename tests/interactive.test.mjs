import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { translations, englishMetadata } from '../src/lib/translations.mjs';
const html = readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
test('both language controls share one URL rather than locale routes', () => {
 assert.match(html,/data-language="es"/); assert.match(html,/data-language="en"/);
 for(const path of ['es','en']) assert.equal(existsSync(new URL(`../dist/${path}`,import.meta.url)),false);
 assert.equal(translations['Próximamente'],'Coming soon'); assert.match(englishMetadata.title,/Coming soon/);
});
test('illustrative use cases explain the application-server-people relationship', () => {
 for(const value of ['website','booking','internal']) assert.ok(html.includes(`data-panel="${value}"`));
 assert.match(html,/Ejemplo ilustrativo/); assert.match(html,/Las personas/); assert.match(html,/No son pantallas reales/);
});
test('English preserves technical intent and prelaunch qualifications', () => {
 for(const source of ['¿Ya puedo usar QuadShip?','Líder del desarrollo integral de QuadShip','Bindings con bases de datos gestionadas o externas: usuarios por aplicación, privilegios limitados y rotación de credenciales.']) assert.ok(translations[source]);
 assert.ok(Object.values(translations).some(value=>value.includes('not production-ready')));
});
