/** Public browser capability token, intentionally published in production HTML. */
export const WEBMCP_ORIGIN_TRIAL_TOKEN = 'AghDnhEfyKeDWcUDpzhqARX6jkt4pEmDD7r2Xd5TLu3d7F33dYVo6X4UWQzPOMVUOXUmh/yaspSC3IfklmcnGAUAAABfeyJvcmlnaW4iOiJodHRwczovL3F1YWRzaGlwLmFwcDo0NDMiLCJmZWF0dXJlIjoiV2ViTUNQIiwiZXhwaXJ5IjoxODA2MzY0ODAwLCJpc1N1YmRvbWFpbiI6dHJ1ZX0='; // gitleaks:allow -- Public token intentionally embedded in HTML, not an account credential.
export const WEBMCP_TRIAL_ORIGIN = 'https://quadship.app';
export const WEBMCP_TRIAL_EXPIRES_AT = 1806364800000;

/** Omit the optional trial on previews, unrelated origins and expired builds. */
export function getWebMCPOriginTrialToken(site, now = Date.now()) {
  if (!site || now >= WEBMCP_TRIAL_EXPIRES_AT) return undefined;
  try {
    if (new URL(site).origin !== WEBMCP_TRIAL_ORIGIN) return undefined;
  } catch {
    return undefined;
  }
  return WEBMCP_ORIGIN_TRIAL_TOKEN;
}
