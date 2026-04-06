import type { ReactNode } from "react";
import { SkipLink } from "@/components/skip-link";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      <header
        className="border-b border-sf-border/80 bg-sf-card/90 shadow-sm backdrop-blur-sm"
        role="banner"
      >
        <div
          className="h-1 w-full bg-gradient-to-r from-sf-primary via-sf-secondary to-sf-accent"
          aria-hidden
        />
        <div className="mx-auto flex max-w-4xl items-center px-4 py-3 sm:px-6">
          <p className="text-lg font-semibold tracking-tight text-sf-primary">
            <span className="sr-only">Application title: </span>
            Restaurant search
          </p>
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-sf-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sf-mint-soft"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
    </>
  );
}
