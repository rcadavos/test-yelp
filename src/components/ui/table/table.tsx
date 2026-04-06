import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

const tableBase = "w-full caption-bottom border-collapse text-left text-sm";

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<"table">>(
  function Table({ className, ...props }, ref) {
    return <table ref={ref} className={cn(tableBase, className)} {...props} />;
  },
);

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<"thead">
>(function TableHeader({ className, ...props }, ref) {
  return <thead ref={ref} className={cn(className)} {...props} />;
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<"tbody">
>(function TableBody({ className, ...props }, ref) {
  return <tbody ref={ref} className={cn(className)} {...props} />;
});

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<"tfoot">
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn("border-t border-sf-border bg-sf-mint-soft/50 font-medium", className)}
      {...props}
    />
  );
});

export const TableRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<"tr">>(
  function TableRow({ className, ...props }, ref) {
    return <tr ref={ref} className={cn(className)} {...props} />;
  },
);

export const TableHead = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<"th">>(
  function TableHead({ className, ...props }, ref) {
    return (
      <th
        ref={ref}
        className={cn(
          "px-3 py-3 text-left align-top text-sm font-semibold text-sf-ink sm:px-4",
          className,
        )}
        {...props}
      />
    );
  },
);

export const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<"td">>(
  function TableCell({ className, ...props }, ref) {
    return (
      <td ref={ref} className={cn("px-3 py-3 align-top text-sm sm:px-4", className)} {...props} />
    );
  },
);

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentPropsWithoutRef<"caption">
>(function TableCaption({ className, ...props }, ref) {
  return <caption ref={ref} className={cn("mt-4 text-sm text-sf-muted", className)} {...props} />;
});

export function TableColGroup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"colgroup">) {
  return (
    <colgroup className={cn(className)} {...props}>
      {children}
    </colgroup>
  );
}

export function TableCol({ className, ...props }: ComponentPropsWithoutRef<"col">) {
  return <col className={cn(className)} {...props} />;
}
