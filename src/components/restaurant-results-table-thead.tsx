import {
  TableCol,
  TableColGroup,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Column labels for the restaurant results data table. */
export const RESTAURANT_TABLE_HEADERS = [
  "Name",
  "Rating",
  "Address",
  "Coordinates",
] as const;

/** Matches column widths for `table-fixed` layouts. */
export function RestaurantResultsTableColgroup() {
  return (
    <TableColGroup>
      <TableCol className="w-[28%]" />
      <TableCol className="w-[16%]" />
      <TableCol className="w-[32%]" />
      <TableCol className="w-[24%]" />
    </TableColGroup>
  );
}

export function RestaurantResultsTableThead() {
  return (
    <TableHeader>
      <TableRow className="border-b border-sf-border">
        {RESTAURANT_TABLE_HEADERS.map((label) => (
          <TableHead
            key={label}
            scope="col"
            className="sticky top-0 z-10 bg-sf-mint-soft"
          >
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
