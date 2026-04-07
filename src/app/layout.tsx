import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL &&
  process.env.NEXT_PUBLIC_APP_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_APP_URL
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Restaurant Finder",
    template: "%s · Restaurant Finder",
  },
  description:
    "Explore restaurants by city with ratings, addresses, and map-ready coordinates—built for quick, confident dining decisions.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Restaurant Finder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="relative flex min-h-dvh flex-col font-sans max-md:h-dvh max-md:max-h-dvh max-md:overflow-hidden">
        <QueryProvider>
          <SiteShell>{children}</SiteShell>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
