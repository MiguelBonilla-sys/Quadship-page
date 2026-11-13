import { defineConfig } from 'astro/config';
import { resolveBuildSite } from './src/lib/site.mjs';
export default defineConfig({ output: 'static', site: resolveBuildSite(process.env) });
