import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type PageHeaderProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  eyebrow: string;
  /** Main heading (inside `h1`). */
  heading: ReactNode;
  description: ReactNode;
};

export function PageHeader({
  eyebrow,
  heading,
  description,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn("shrink-0 text-center lg:text-left", className)}
      {...props}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-sf-secondary sm:text-sm">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-sf-ink sm:mt-3 sm:text-3xl lg:text-4xl">
        {heading}
      </h1>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-sf-muted sm:mt-3 sm:text-base lg:mx-0">
        {description}
      </p>
    </header>
  );
}
