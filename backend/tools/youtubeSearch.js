import { searchSerpApi } from "../services/serpapi.js";

/**
 * Search YouTube using SerpApi.
 *
 * Useful for:
 * - Animal rescue education
 * - Veterinary education
 * - NGO training resources
 * - Awareness campaigns
 * - Animal-care tutorials
 */
export async function youtubeSearch({ query, location }) {
  if (!query) {
    throw new Error("query is required");
  }

  const data = await searchSerpApi({
    engine: "youtube",
    q: query,
    location,
  });

  return {
    query,

    videos: (data.video_results || []).slice(0, 10).map((video) => ({
      title: video.title || "",
      link: video.link || "",
      channel: video.channel?.name || video.channel || "",
      description: video.description || "",
      published: video.published_date || "",
      thumbnail: video.thumbnail || "",
      duration: video.length || "",
    })),
  };
}
