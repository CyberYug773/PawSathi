import { searchSerpApi } from "../services/serpapi.js";

/**
 * Search images using Google Images through SerpApi.
 *
 * Useful for:
 * - Animal adoption campaign inspiration
 * - Awareness materials
 * - Animal identification references
 * - Educational visual research
 */
export async function imageSearch({ query, location }) {
  if (!query) {
    throw new Error("query is required");
  }

  const data = await searchSerpApi({
    engine: "google_images",
    q: query,
    location,
  });

  return {
    query,

    images: (data.images_results || []).slice(0, 10).map((image) => ({
      title: image.title || "",
      imageUrl: image.original || image.thumbnail || "",
      thumbnail: image.thumbnail || "",
      source: image.source || "",
      sourceUrl: image.link || "",
    })),
  };
}
