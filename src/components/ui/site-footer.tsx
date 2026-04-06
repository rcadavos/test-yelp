import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type SiteFooterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function SiteFooter({ className, children, ...props }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "mt-auto shrink-0 border-t border-sf-border/70 pt-1 text-center text-xs text-sf-muted lg:pt-1",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}
