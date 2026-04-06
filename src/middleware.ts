import { NextResponse } from "next/server";
import { applyStaticSecurityHeaders } from "@/lib/security/headers";

/**
 * CSP is intentionally not set: nonce-based policies conflict with Next.js inline /
 * chunk scripts in production. Re-enable via `build-csp.ts` only after aligning with
 * Next.js CSP docs and testing all routes.
 */
export function middleware() {
  const isProduction = process.env.NODE_ENV === "production";
  const response = NextResponse.next();
  applyStaticSecurityHeaders(response, { isProduction });
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch", value: "1" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
