"use client";

import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import type { RestaurantsResponse } from "@/types/restaurant";
import { RestaurantResultsTable } from "@/components/restaurant-results-table";
import { Callout } from "@/components/ui/callout";

async function fetchRestaurants(
  location: string,
  pageIndex: number,
  pageSize: number,
): Promise<RestaurantsResponse> {
  const params = new URLSearchParams({
    location,
    page: String(pageIndex + 1),
    pageSize: String(pageSize),
  });
  const res = await fetch(`/api/restaurants?${params.toString()}`, {
    method: "GET",
  });
  const data = (await res.json()) as RestaurantsResponse;
  if (!res.ok && data && typeof data === "object" && "ok" in data && data.ok === false) {
    return data;
  }
  if (!res.ok) {
    return { ok: false, error: "Something went wrong.", code: "http" };
  }
  return data;
}

const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

type Props = {
  searchCity: string;
};

/**
 * Mounted with `key={searchCity}` from the parent so pagination resets when the city changes.
 */
export function RestaurantSearchResults({ searchCity }: Props) {
  const [pagination, setPagination] = useState<PaginationState>(initialPagination);

  const query = useQuery({
    queryKey: ["restaurants", searchCity, pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchRestaurants(searchCity, pagination.pageIndex, pagination.pageSize),
    enabled: searchCity.length >= 2,
  });

  const data = query.data;
  const list = data && data.ok === true ? data.businesses : [];
  const total = data && data.ok === true ? data.total : 0;
  const errorMessage =
    data && data.ok === false ? data.error : query.isError ? "Could not load results." : null;

  return (
    <div
      aria-live="polite"
      aria-busy={query.isFetching}
      className="max-md:flex max-md:min-h-0 max-md:flex-1 max-md:flex-col"
    >
      {query.isFetching && !query.data && (
        <Callout variant="info">Loading restaurants…</Callout>
      )}

      {errorMessage && (
        <Callout variant="error" role="alert">
          {errorMessage}
        </Callout>
      )}

      {data?.ok === true && total === 0 && !query.isFetching && (
        <Callout variant="info">
          No restaurants found for that area. Try another city or spelling.
        </Callout>
      )}

      {data?.ok === true && total > 0 && (
        <RestaurantResultsTable
          rows={list}
          total={total}
          pagination={pagination}
          onPaginationChange={setPagination}
          isFetching={query.isFetching}
        />
      )}
    </div>
  );
}
