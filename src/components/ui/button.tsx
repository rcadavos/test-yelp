import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "outline";
};

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: cn(
    "inline-flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-xl px-6 text-base font-semibold text-white shadow-sm transition-colors",
    "bg-sf-primary hover:bg-sf-primary-dark",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-accent",
    "active:scale-[0.99] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ),
  outline: cn(
    "inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-sf-border bg-white px-3 text-sm font-medium text-sf-ink shadow-sm transition-colors",
    "hover:bg-sf-mint-soft",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-accent",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
  ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = "primary", type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(variantClass[variant], className)}
        {...props}
      />
    );
  },
);
