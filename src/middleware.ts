import { NextResponse, type NextRequest } from "next/server";
import {
  buildDevelopmentCsp,
  buildProductionCsp,
} from "@/lib/security/build-csp";
import { applyStaticSecurityHeaders } from "@/lib/security/headers";

function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary);
}

export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const nonce = isProduction ? createNonce() : "";
  const csp = isProduction
    ? buildProductionCsp(nonce)
    : buildDevelopmentCsp();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);
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
