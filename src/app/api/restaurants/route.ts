import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { restaurantsListQuerySchema } from "@/lib/validators/restaurant-search";
import type { RestaurantRow } from "@/types/restaurant";

export const dynamic = "force-dynamic";

const yelpBusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number().optional(),
  review_count: z.number().optional(),
  location: z
    .object({
      display_address: z.array(z.string()).optional(),
    })
    .optional(),
  coordinates: z
    .object({
      latitude: z.number().nullable().optional(),
      longitude: z.number().nullable().optional(),
    })
    .optional(),
});

const yelpSearchSchema = z.object({
  businesses: z.array(z.unknown()),
  total: z.number().optional(),
});

function mapBusiness(raw: unknown): RestaurantRow | null {
  const parsed = yelpBusinessSchema.safeParse(raw);
  if (!parsed.success) return null;
  const b = parsed.data;
  const lines = b.location?.display_address?.filter(Boolean) ?? [];
  const address = lines.length > 0 ? lines.join(", ") : "Address unavailable";
  const lat = b.coordinates?.latitude ?? null;
  const lng = b.coordinates?.longitude ?? null;
  return {
    id: b.id,
    name: b.name,
    rating: b.rating ?? 0,
    reviewCount: b.review_count ?? 0,
    address,
    latitude: lat ?? null,
    longitude: lng ?? null,
  };
}

export async function GET(request: NextRequest) {
  const key = process.env.YELP_API_KEY;
  if (!key?.trim()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Search is not configured yet. Add YELP_API_KEY to your environment.",
        code: "missing_key",
      },
      { status: 503 },
    );
  }

  const sp = request.nextUrl.searchParams;
  const raw = {
    location: sp.get("location") ?? "",
    page: sp.get("page") ?? undefined,
    pageSize: sp.get("pageSize") ?? undefined,
  };

  const validated = restaurantsListQuerySchema.safeParse(raw);
  if (!validated.success) {
    const locErr = validated.error.flatten().fieldErrors.location?.[0];
    const msg = locErr ?? "Invalid query";
    return NextResponse.json({ ok: false, error: msg, code: "validation" }, { status: 400 });
  }

  const { location, page, pageSize } = validated.data;
  const offset = (page - 1) * pageSize;

  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("term", "restaurants");
  url.searchParams.set("location", location);
  url.searchParams.set("limit", String(pageSize));
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("sort_by", "best_match");

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the business directory.", code: "network" },
      { status: 502 },
    );
  }

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected response from directory service.", code: "parse" },
      { status: 502 },
    );
  }

  if (!res.ok) {
    const errBody = z.object({ error: z.object({ description: z.string().optional() }).optional() }).safeParse(json);
    const desc =
      errBody.success && errBody.data.error?.description
        ? errBody.data.error.description
        : "Search could not be completed.";
    return NextResponse.json(
      { ok: false, error: desc, code: "upstream" },
      { status: 502 },
    );
  }

  const body = yelpSearchSchema.safeParse(json);
  if (!body.success) {
    return NextResponse.json(
      { ok: false, error: "Could not read search results.", code: "shape" },
      { status: 502 },
    );
  }

  const businesses = body.data.businesses
    .map(mapBusiness)
    .filter((b): b is RestaurantRow => b !== null);

  const total = body.data.total ?? businesses.length;

  return NextResponse.json({
    ok: true,
    businesses,
    total,
    page,
    pageSize,
  });
}
