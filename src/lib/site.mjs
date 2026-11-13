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

/** Production has a known origin; previews must opt out explicitly or via Vercel. */
export function resolveBuildSite(env = {}) {
  // Validate even preview overrides so invalid configuration never passes silently.
  const origin = resolveSite(env.SITE_URL ?? 'https://quadship.app');
  if (env.SITE_PREVIEW !== undefined && !['0', '1'].includes(env.SITE_PREVIEW)) {
    throw new Error('SITE_PREVIEW must be 1, 0 or unset.');
  }
  const hostedPreview = Boolean(env.VERCEL_ENV && env.VERCEL_ENV !== 'production');
  return env.SITE_PREVIEW === '1' || hostedPreview ? undefined : origin;
}
