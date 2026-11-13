import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', workers: 1, retries: 0,
  use: { baseURL: 'http://127.0.0.1:4333', channel: 'chrome', reducedMotion: 'reduce' },
  webServer: { command: 'python3 -m http.server 4333 --bind 127.0.0.1 --directory dist', url: 'http://127.0.0.1:4333', reuseExistingServer: false },
});
