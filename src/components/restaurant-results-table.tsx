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
import {
  RestaurantResultsTableColgroup,
  RestaurantResultsTableThead,
} from "@/components/restaurant-results-table-thead";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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

function RestaurantMobileCardSkeleton() {
  return (
    <Card variant="subtle" padding="none" className="rounded-lg px-3 py-2 shadow-sm">
      <Skeleton className="h-4 w-3/4 max-w-[13rem]" />
      <div className="mt-2 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <Skeleton className="h-2.5 w-10" />
            <Skeleton className="mt-1 h-3.5 w-full max-w-[16rem]" />
            {i === 2 ? <Skeleton className="mt-0.5 h-2.5 w-4/5 max-w-[13rem]" /> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

function RestaurantMobileCard({ row }: { row: RestaurantRow }) {
  const { latitude: lat, longitude: lng } = row;
  return (
    <Card variant="subtle" padding="none" className="rounded-lg px-3 py-2 shadow-sm">
      <h3 className="text-sm font-semibold leading-snug text-sf-ink">{row.name}</h3>
      <dl className="mt-2 space-y-2 text-xs">
        <div className="flex min-w-0 items-start gap-2">
          <dt className="flex w-7 shrink-0 justify-center text-center text-sm leading-none">
            <span className="text-amber-500" aria-hidden>
              ★
            </span>
            <span className="sr-only">Rating</span>
          </dt>
          <dd className="m-0 min-w-0 flex-1 text-sf-primary">
            {row.rating > 0 ? (
              <>
                <span className="tabular-nums">{row.rating.toFixed(1)}</span>{" "}
                <span className="text-sf-primary" aria-hidden>
                  ★
                </span>
                {row.reviewCount > 0 ? (
                  <span className="font-normal text-sf-muted">
                    {" "}
                    ({row.reviewCount} reviews)
                  </span>
                ) : null}
              </>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div className="flex min-w-0 items-start gap-2">
          <dt className="flex w-7 shrink-0 justify-center text-center text-sm leading-none text-sf-muted">
            <span aria-hidden>📍</span>
            <span className="sr-only">Address</span>
          </dt>
          <dd className="m-0 min-w-0 flex-1 leading-snug text-sf-muted">{row.address}</dd>
        </div>
        <div className="flex min-w-0 items-start gap-2">
          <dt className="flex w-7 shrink-0 justify-center text-center text-sm leading-none text-sf-muted">
            <span aria-hidden>⌖</span>
            <span className="sr-only">Coordinates</span>
          </dt>
          <dd className="m-0 min-w-0 flex-1 font-mono text-[0.6875rem] leading-snug text-sf-muted">
            {lat != null && lng != null ? (
              <span className="break-all">
                Lat {lat.toFixed(5)} · Lng {lng.toFixed(5)}
              </span>
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
  /**
   * First fetch with no cached response — renders skeleton inside this table shell so
   * layout does not swap with a separate component (avoids CLS).
   */
  loading?: boolean;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

const desktopTableClass = "min-w-[640px] table-fixed";

function TableSkeletonBody({ rowCount }: { rowCount: number }) {
  const n = Math.min(Math.max(rowCount, 1), 50);
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <TableRow
          key={i}
          className="border-b border-sf-border/70 last:border-b-0 odd:bg-white even:bg-sf-mint-soft/20"
        >
          <TableCell>
            <Skeleton className="h-4 w-[min(100%,12rem)] max-w-[14rem]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[min(100%,18rem)] max-w-[20rem]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-36" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function PaginationSkeleton() {
  return (
    <div className="mt-3 flex min-h-[2.25rem] flex-col gap-2 md:mt-4 md:min-h-[2.75rem] md:gap-3 md:flex-row md:items-center md:justify-between">
      <Skeleton className="h-4 w-36 shrink-0 md:h-5 md:w-52" />
      <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-1.5 md:w-auto md:justify-end md:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 md:gap-2 md:flex-none">
          <Skeleton className="hidden h-4 w-24 md:block" />
          <Skeleton className="h-9 w-[4rem] shrink-0 rounded-lg md:h-10 md:w-28" />
        </div>
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <Skeleton className="h-8 w-8 shrink-0 rounded-lg md:h-10 md:w-[5.5rem]" />
          <Skeleton className="hidden h-4 w-[7rem] md:block" />
          <Skeleton className="h-8 w-8 shrink-0 rounded-lg md:h-10 md:w-[4.5rem]" />
        </div>
      </div>
    </div>
  );
}

export function RestaurantResultsTable({
  rows,
  total,
  pagination,
  onPaginationChange,
  isFetching,
  loading = false,
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
            <span className="whitespace-nowrap text-sf-primary">
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
    data: loading ? [] : rows,
    columns,
    state: { pagination },
    onPaginationChange,
    manualPagination: true,
    rowCount: loading ? 0 : total,
    pageCount: loading ? 1 : pageCount,
    getCoreRowModel: getCoreRowModel(),
  });

  const from = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  const skeletonRowCount = pagination.pageSize;

  return (
    <div className="relative flex max-md:min-h-0 max-md:flex-1 max-md:flex-col flex-col gap-0">
      {loading ? <span className="sr-only">Loading restaurant results…</span> : null}

      <div
        className={cn(
          "flex min-h-0 flex-col overflow-hidden rounded-xl border border-sf-border/90 bg-sf-card",
          "max-md:min-h-0 max-md:flex-1 max-md:max-h-none",
          "md:max-h-[min(52vh,520px)]",
          isFetching && !loading && "opacity-60",
        )}
        role="region"
        aria-label="Restaurant results"
        aria-busy={isFetching}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-scroll overflow-x-hidden [scrollbar-gutter:stable] md:hidden">
            <ul className="list-none space-y-2 p-2" role="list">
              {loading ? (
                Array.from({ length: skeletonRowCount }, (_, i) => (
                  <li key={i}>
                    <RestaurantMobileCardSkeleton />
                  </li>
                ))
              ) : rows.length === 0 ? (
                <li className="py-8 text-center text-sm text-sf-muted">No rows on this page.</li>
              ) : (
                rows.map((r) => (
                  <li key={r.id}>
                    <RestaurantMobileCard row={r} />
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="hidden min-h-0 flex-1 flex-col md:flex">
            <div className="min-h-0 flex-1 overflow-x-auto overflow-y-scroll [scrollbar-gutter:stable]">
              <Table className={desktopTableClass}>
                <RestaurantResultsTableColgroup />
                <RestaurantResultsTableThead />
                <TableBody>
                  {loading ? (
                    <TableSkeletonBody rowCount={skeletonRowCount} />
                  ) : table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="px-4 py-8 text-center text-sf-muted"
                      >
                        No rows on this page.
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="border-b border-sf-border/70 last:border-b-0 odd:bg-white even:bg-sf-mint-soft/20"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <PaginationSkeleton />
      ) : (
        <div className="mt-3 flex min-h-[2.25rem] flex-col gap-2 md:mt-4 md:min-h-[2.75rem] md:gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-4 text-sf-muted md:text-sm md:leading-5">
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

          <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-1.5 md:w-auto md:justify-end md:gap-3">
            <NativeSelect
              label={
                <>
                  <span className="md:hidden">Rows</span>
                  <span className="hidden md:inline">Rows per page</span>
                </>
              }
              aria-label="Rows per page"
              rootClassName="min-w-0 flex-1 text-base md:flex-none md:text-sm"
              selectClassName="h-9 pl-2 pr-6 text-base md:h-10 md:pl-3 md:pr-7 md:text-sm"
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

            <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
              <Button
                variant="outline"
                type="button"
                className="h-8 min-w-8 px-2 text-xs md:h-10 md:min-w-0 md:px-3 md:text-sm"
                aria-label="Previous page"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || isFetching}
              >
                <ChevronLeftIcon className="size-3.5 md:hidden" />
                <span className="hidden md:inline">Previous</span>
              </Button>
              <span className="min-w-0 max-w-[5.5rem] shrink px-0.5 text-center text-[0.6875rem] tabular-nums leading-tight text-sf-muted md:max-w-none md:min-w-[7rem] md:px-0 md:text-sm">
                Page {pagination.pageIndex + 1} of {pageCount}
              </span>
              <Button
                variant="outline"
                type="button"
                className="h-8 min-w-8 px-2 text-xs md:h-10 md:min-w-0 md:px-3 md:text-sm"
                aria-label="Next page"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || isFetching}
              >
                <ChevronRightIcon className="size-3.5 md:hidden" />
                <span className="hidden md:inline">Next</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
