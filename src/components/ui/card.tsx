import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "subtle";
  padding?: "none" | "sm" | "md";
};

const variantClass: Record<NonNullable<CardProps["variant"]>, string> = {
  default: cn(
    "rounded-2xl border border-sf-border bg-sf-card shadow-[0_4px_24px_rgba(0,103,77,0.07)]",
  ),
  subtle: cn("rounded-xl border border-sf-border/80 bg-sf-mint-soft/30"),
};

const paddingClass: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "px-4 py-3 sm:px-5",
  md: "p-4 sm:p-5",
};

export function Card({
  className,
  variant = "default",
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(variantClass[variant], paddingClass[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-sf-primary sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-sf-muted sm:text-right", className)} {...props} />
  );
}
