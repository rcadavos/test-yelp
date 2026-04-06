import { z } from "zod";

export const locationQuerySchema = z.object({
  location: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters")
    .max(120, "Location is too long"),
});

export type LocationQuery = z.infer<typeof locationQuerySchema>;

/** GET /api/restaurants — location + server-side pagination (Yelp limit/offset). */
export const restaurantsListQuerySchema = z.object({
  location: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters")
    .max(120, "Location is too long"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
});

export type RestaurantsListQuery = z.infer<typeof restaurantsListQuerySchema>;
