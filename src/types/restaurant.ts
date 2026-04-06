export type RestaurantRow = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

export type RestaurantsResponse =
  | {
      ok: true;
      businesses: RestaurantRow[];
      total: number;
      page: number;
      pageSize: number;
    }
  | { ok: false; error: string; code?: string };
