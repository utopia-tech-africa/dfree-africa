/** Maps country names (from GeoJSON ADMIN) to app routes */
export const COUNTRY_ROUTES: Record<string, string> = {
  Ghana: "/africa/continental/ghana",
  "South Africa": "/africa/continental/south-africa",
  Uganda: "/africa/projects?country=uganda",
  Liberia: "/africa/projects?country=liberia",
};

export function getCountryRoute(countryName: string): string | null {
  return COUNTRY_ROUTES[countryName] ?? null;
}

/** Pin points on the globe: lat, lng, label, route */
export const IMPACT_PINS = [
  {
    lat: 7.9465,
    lng: -1.0232,
    label: "Ghana",
    route: "/africa/continental/ghana",
  },
  {
    lat: -30.5595,
    lng: 22.9375,
    label: "South Africa",
    route: "/africa/continental/south-africa",
  },
  {
    lat: 1.3733,
    lng: 32.2903,
    label: "Uganda",
    route: "/africa/projects?country=uganda",
  },
  {
    lat: 6.4281,
    lng: -9.4295,
    label: "Liberia",
    route: "/africa/projects?country=liberia",
  },
] as const;
