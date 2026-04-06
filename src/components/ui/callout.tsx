import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "info" | "error";
};

const variantClass: Record<NonNullable<CalloutProps["variant"]>, string> = {
  info: "rounded-xl bg-sf-mint-soft/60 px-4 py-3 text-sm text-sf-muted",
  error:
    "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900",
};

export function Callout({
  className,
  variant = "info",
  children,
  ...props
}: CalloutProps) {
  return (
    <div className={cn(variantClass[variant], className)} {...props}>
      {children}
    </div>
  );
}
