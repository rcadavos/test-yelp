"use client";

import { useId, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { RestaurantSearchResults } from "@/components/restaurant-search-results";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

export function RestaurantSearchPanel() {
  const formId = useId();
  const inputId = `${formId}-city`;
  const [draft, setDraft] = useState("");
  const debouncedDraft = useDebounce(draft, 400);
  /** Flushes an immediate search on Submit before debounce catches up. */
  const [instantLocation, setInstantLocation] = useState<string | null>(null);

  const city = useMemo(() => {
    const instant = instantLocation?.trim() ?? "";
    const debounced = debouncedDraft.trim();
    if (instant.length >= 2) return instant;
    if (debounced.length >= 2) return debounced;
    return "";
  }, [instantLocation, debouncedDraft]);

  function onDraftChange(e: ChangeEvent<HTMLInputElement>) {
    setDraft(e.target.value);
    setInstantLocation(null);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = draft.trim();
    if (t.length >= 2) setInstantLocation(t);
  }

  const showResults = city.length >= 2;

  return (
    <section
      aria-labelledby={`${formId}-heading`}
      className="flex min-h-0 flex-1 flex-col"
    >
      <Card
        padding="none"
        className={cn(
          "flex flex-col p-3 sm:p-5",
          showResults &&
            "min-h-0 max-md:flex-1 max-md:overflow-hidden max-md:min-h-0 sm:overflow-visible",
        )}
      >
        <CardHeader>
          <CardTitle
            id={`${formId}-heading`}
            className="text-base sm:text-xl"
          >
            Search by city
          </CardTitle>
        </CardHeader>

        <form
          className="mt-3 flex flex-row items-stretch gap-1.5 sm:mt-4 sm:gap-3"
          onSubmit={onSubmit}
          role="search"
          aria-label="Restaurant Finder — search by city"
        >
          <div className="min-w-0 flex-1">
            <label htmlFor={inputId} className="sr-only">
              City or area
            </label>
            <Input
              id={inputId}
              name="location"
              autoComplete="address-level2"
              autoFocus
              placeholder="e.g. Miami, FL or Austin"
              value={draft}
              onChange={onDraftChange}
              className="h-10 rounded-lg px-3 text-sm sm:h-12 sm:rounded-xl sm:px-4 sm:text-base"
            />
          </div>
          <Button
            type="submit"
            className="h-10 shrink-0 rounded-lg px-3 text-sm sm:h-12 sm:min-w-[8.5rem] sm:rounded-xl sm:px-6 sm:text-base"
          >
            Search
          </Button>
        </form>

        <div
          className={cn(
            "mt-3 sm:mt-4",
            showResults &&
              "max-md:flex max-md:min-h-0 max-md:flex-1 max-md:flex-col max-md:overflow-hidden",
          )}
        >
          {!showResults && (
            <Callout variant="info">
              Enter at least two characters to search.
            </Callout>
          )}

          {showResults && (
            <RestaurantSearchResults key={city} searchCity={city} />
          )}
        </div>
      </Card>
    </section>
  );
}
