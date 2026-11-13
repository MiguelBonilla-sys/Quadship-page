/** One source of truth for build-time canonical and crawler URLs. */
export function resolveSite(value) {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash || /^(localhost|127\.|\[::1\]|example\.)/.test(url.hostname) || !url.hostname.includes('.')) throw new Error('Invalid origin');
    return `${url.origin}/`;
  } catch {
    throw new Error('SITE_URL must be a real public HTTPS origin without credentials, path, query or fragment.');
  }
}
