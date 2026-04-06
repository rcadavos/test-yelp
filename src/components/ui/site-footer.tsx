import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type SiteFooterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function SiteFooter({ className, children, ...props }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "mt-auto shrink-0 border-t border-sf-border/70 pt-4 text-center text-xs text-sf-muted lg:pt-3",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}
