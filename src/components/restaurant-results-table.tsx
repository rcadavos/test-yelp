"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/native-select";
import { cn } from "@/lib/utils/cn";
import type { RestaurantRow } from "@/types/restaurant";

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function RestaurantMobileCard({ row }: { row: RestaurantRow }) {
  const { latitude: lat, longitude: lng } = row;
  return (
    <Card variant="subtle" padding="sm" className="shadow-sm">
      <h3 className="text-base font-semibold leading-snug text-sf-ink">{row.name}</h3>
      <dl className="mt-3 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-sf-muted">
            Rating
          </dt>
          <dd className="mt-0.5 text-sf-primary">
            {row.rating > 0 ? `${row.rating.toFixed(1)} ★` : "—"}
            {row.reviewCount > 0 ? (
              <span className="font-normal text-sf-muted"> ({row.reviewCount} reviews)</span>
            ) : null}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-sf-muted">
            Address
          </dt>
          <dd className="mt-0.5 leading-snug text-sf-muted">{row.address}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-sf-muted">
            Coordinates
          </dt>
          <dd className="mt-0.5 font-mono text-xs leading-relaxed text-sf-muted">
            {lat != null && lng != null ? (
              <>
                <span className="block break-all">Lat {lat.toFixed(5)}</span>
                <span className="block break-all">Lng {lng.toFixed(5)}</span>
              </>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

export type RestaurantResultsTableProps = {
  rows: RestaurantRow[];
  total: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  isFetching: boolean;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

export function RestaurantResultsTable({
  rows,
  total,
  pagination,
  onPaginationChange,
  isFetching,
}: RestaurantResultsTableProps) {
  const columns = useMemo<ColumnDef<RestaurantRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ getValue }) => (
          <span className="font-semibold text-sf-ink">{String(getValue() ?? "")}</span>
        ),
      },
      {
        id: "rating",
        header: "Rating",
        cell: ({ row }) => {
          const r = row.original.rating;
          const c = row.original.reviewCount;
          return (
            <span className="text-sf-primary">
              {r > 0 ? `${r.toFixed(1)} ★` : "—"}
              {c > 0 ? (
                <span className="font-normal text-sf-muted"> ({c} reviews)</span>
              ) : null}
            </span>
          );
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ getValue }) => (
          <span className="text-sf-muted">{String(getValue() ?? "")}</span>
        ),
      },
      {
        id: "coordinates",
        header: "Coordinates",
        cell: ({ row }) => {
          const { latitude: lat, longitude: lng } = row.original;
          return (
            <span className="font-mono text-xs tabular-nums text-sf-muted">
              {lat != null && lng != null
                ? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
                : "—"}
            </span>
          );
        },
      },
    ],
    [],
  );

  const pageCount =
    total <= 0 ? 1 : Math.max(1, Math.ceil(total / pagination.pageSize));

  /* eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table instance is intentionally non-memoizable */
  const table = useReactTable({
    data: rows,
    columns,
    state: { pagination },
    onPaginationChange,
    manualPagination: true,
    rowCount: total,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
  });

  const from = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return (
    <div className="relative flex max-md:min-h-0 max-md:flex-1 max-md:flex-col flex-col gap-0">
      <div
        className={cn(
          "flex min-h-0 flex-col overflow-hidden rounded-xl border border-sf-border/90 bg-sf-card",
          "max-md:min-h-0 max-md:flex-1 max-md:max-h-none",
          "md:max-h-[min(52vh,520px)]",
          isFetching && "opacity-60",
        )}
        role="region"
        aria-label="Restaurant results"
        aria-busy={isFetching}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]">
          <ul className="list-none space-y-3 p-3 md:hidden" role="list">
            {rows.length === 0 ? (
              <li className="py-8 text-center text-sm text-sf-muted">No rows on this page.</li>
            ) : (
              rows.map((r) => (
                <li key={r.id}>
                  <RestaurantMobileCard row={r} />
                </li>
              ))
            )}
          </ul>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-sf-border bg-sf-mint-soft/50">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-3 py-3 font-semibold text-sf-ink sm:px-4"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-sf-muted"
                    >
                      No rows on this page.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-sf-border/70 last:border-b-0 odd:bg-white even:bg-sf-mint-soft/20"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-3 py-3 align-top sm:px-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-sf-muted">
          {total === 0 ? (
            "No places match."
          ) : (
            <>
              <span className="hidden md:inline">
                Showing {from}–{to} of {total}
              </span>
              <span className="md:hidden">Showing {from}–{to} of {total}</span>
            </>
          )}
        </p>

        <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-2 md:w-auto md:justify-end md:gap-3">
          <NativeSelect
            label={
              <>
                <span className="md:hidden">Rows</span>
                <span className="hidden md:inline">Rows per page</span>
              </>
            }
            aria-label="Rows per page"
            rootClassName="min-w-0 flex-1 md:flex-none"
            value={pagination.pageSize}
            onChange={(e) => {
              const pageSize = Number(e.target.value);
              onPaginationChange({ pageIndex: 0, pageSize });
            }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </NativeSelect>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="px-2.5 md:px-3"
              aria-label="Previous page"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isFetching}
            >
              <ChevronLeftIcon className="size-4 md:hidden" />
              <span className="hidden md:inline">Previous</span>
            </Button>
            <span className="min-w-0 shrink px-1 text-center text-xs tabular-nums text-sf-muted md:min-w-[7rem] md:px-0 md:text-sm">
              Page {pagination.pageIndex + 1} of {pageCount}
            </span>
            <Button
              variant="outline"
              type="button"
              className="px-2.5 md:px-3"
              aria-label="Next page"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isFetching}
            >
              <ChevronRightIcon className="size-4 md:hidden" />
              <span className="hidden md:inline">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
