import { searchSerpApi } from "../services/serpapi.js";

/**
 * Search Google Maps through SerpApi.
 */
export async function mapsSearch({ query, location }) {
  if (!query) {
    throw new Error("query is required");
  }

  let cleanQuery = query
    .replace(/find/gi, "")
    .replace(/near me/gi, "")
    .replace(/near/gi, "")
    .trim();

  // Remove duplicate Jaipur if it already exists in the query
  cleanQuery = cleanQuery.replace(/\bjaipur\b/gi, "").trim();

  const searchLocation = location || "Jaipur";

  const locationAwareQuery = `${cleanQuery} ${searchLocation}`.trim();

  const data = await searchSerpApi({
    engine: "google_maps",
    q: locationAwareQuery,
    type: "search",
  });

  return {
    query: cleanQuery,
    location: searchLocation,

    places: (data.local_results || []).slice(0, 10).map((place) => ({
      title: place.title || "",
      address: place.address || "",
      phone: place.phone || "",
      rating: place.rating ?? null,
      reviews: place.reviews ?? null,
      type: place.type || "",
      website: place.website || "",
      placeId: place.place_id || "",
      hours: place.hours || "",
      openState: place.open_state || "",
      latitude: place.gps_coordinates?.latitude ?? null,
      longitude: place.gps_coordinates?.longitude ?? null,
    })),
  };
}
