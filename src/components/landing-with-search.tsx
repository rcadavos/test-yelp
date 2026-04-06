"use client";

import { RestaurantSearchPanel } from "@/components/restaurant-search-panel";
import { PageHeader } from "@/components/ui/page-header";
import { SiteFooter } from "@/components/ui/site-footer";

export function LandingWithSearch() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-4 overflow-hidden px-4 py-2 sm:gap-6 sm:px-6 sm:py-4 sm:overflow-visible lg:py-2">
      <PageHeader
        eyebrow=""
        heading={
          <>
            Discover restaurants worth
            <span className="text-sf-primary"> showing up for</span>
          </>
        }
        headingClassName="max-sm:text-nowrap max-sm:text-[min(3.4vw,0.8125rem)] max-sm:leading-tight"
        descriptionClassName="max-md:hidden"
        description="Enter a city to see restaurants, their ratings, addresses, and coordinates."
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <RestaurantSearchPanel />
      </div>

      <SiteFooter>
        <p>Plan nights out and trips faster—fewer tabs, clearer choices.</p>
      </SiteFooter>
    </div>
  );
}
