import { searchSerpApi } from "../services/serpapi.js";

/**
 * Search recent news using Google News through SerpApi.
 *
 * Useful for:
 * - Animal rescue incidents
 * - Government announcements
 * - Animal welfare campaigns
 * - Disease/vaccination news
 * - Local animal welfare developments
 */
export async function newsSearch({ query, location }) {
  if (!query) {
    throw new Error("query is required");
  }

  const data = await searchSerpApi({
    engine: "google_news",
    q: query,
    location,
  });

  return {
    query,

    newsResults: (data.news_results || []).slice(0, 10).map((article) => ({
      title: article.title || "",
      link: article.link || "",
      source: article.source?.name || article.source || "",
      date: article.date || "",
      snippet: article.snippet || "",
      thumbnail: article.thumbnail || "",
    })),
  };
}
