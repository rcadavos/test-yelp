import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /** Lets Playwright (and other tools) load dev assets when the app is served on 127.0.0.1. */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
