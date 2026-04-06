/**
 * CSP helpers (currently unused — middleware does not send CSP; see `middleware.ts`).
 * Next.js reads the nonce from the Content-Security-Policy *request* header when applied.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */

export function buildProductionCsp(nonce: string): string {
  const directives = [
    "default-src 'self'",
    // No 'strict-dynamic': it disables host allowlisting and breaks Next.js chunk / bootstrap
    // scripts that are not always attributed with the nonce in the trust chain.
    // 'self' + per-request nonce still allows same-origin scripts and tagged inline scripts.
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

/** Dev-friendly CSP: allows HMR; still blocks framing and limits defaults. */
export function buildDevelopmentCsp(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' ws: wss: http://127.0.0.1:* http://localhost:*",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}
