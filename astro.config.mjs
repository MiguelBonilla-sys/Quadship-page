import { defineConfig } from 'astro/config';
import { resolveSite } from './src/lib/site.mjs';
export default defineConfig({ output: 'static', site: resolveSite(process.env.SITE_URL) });
