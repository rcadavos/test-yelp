import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type PageHeaderProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  eyebrow: string;
  /** Main heading (inside `h1`). */
  heading: ReactNode;
  description: ReactNode;
  /** Merged onto the description paragraph (e.g. responsive visibility). */
  descriptionClassName?: string;
  /** Merged onto the main `h1` (e.g. single-line mobile layout). */
  headingClassName?: string;
};

export function PageHeader({
  eyebrow,
  heading,
  description,
  descriptionClassName,
  headingClassName,
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
      <h1
        className={cn(
          "mt-2 text-xl font-semibold tracking-tight text-sf-ink sm:mt-3 sm:text-3xl lg:text-4xl",
          headingClassName,
        )}
      >
        {heading}
      </h1>
      <p
        className={cn(
          "mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-sf-muted sm:mt-3 sm:text-base lg:mx-0",
          descriptionClassName,
        )}
      >
        {description}
      </p>
    </header>
  );
}
