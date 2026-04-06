import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const selectTriggerClass = cn(
  "h-10 min-w-[2.75rem] w-max max-w-full cursor-pointer appearance-none rounded-lg border border-sf-border bg-white pl-3 pr-7 text-sf-ink shadow-sm outline-none transition-[border-color,box-shadow]",
  "focus:border-sf-secondary focus:ring-2 focus:ring-sf-accent/40",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export type NativeSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className"
> & {
  /** Optional label; control is nested so the label is associated implicitly. */
  label?: ReactNode;
  className?: string;
  /** Classes for the outer wrapper (`<label>` or `<div>`). */
  rootClassName?: string;
  /** Classes merged onto the `<select>`. */
  selectClassName?: string;
  children: ReactNode;
};

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(
    {
      label,
      id: idProp,
      className,
      rootClassName,
      selectClassName,
      children,
      ...props
    },
    ref,
  ) {
    const genId = useId();
    const selectId = idProp ?? `native-select-${genId}`;

    const control = (
      <span className="group relative inline-block w-max max-w-full shrink-0">
        <select
          ref={ref}
          id={selectId}
          className={cn(selectTriggerClass, selectClassName)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-sf-muted transition-transform duration-200 ease-out group-focus-within:rotate-180" />
      </span>
    );

    if (label) {
      return (
        <label
          className={cn(
            "flex cursor-default items-center gap-2 text-sm text-sf-muted",
            rootClassName,
            className,
          )}
        >
          <span className="min-w-0 shrink-0 whitespace-nowrap">{label}</span>
          {control}
        </label>
      );
    }

    return (
      <div className={cn(rootClassName, className)}>{control}</div>
    );
  },
);
