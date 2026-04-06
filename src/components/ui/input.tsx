import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-12 w-full rounded-xl border border-sf-border bg-white px-4 text-base text-sf-ink shadow-sm outline-none ring-sf-accent/40",
          "placeholder:text-sf-muted focus:border-sf-secondary focus:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
    );
  },
);
