import { searchSerpApi } from "../services/serpapi.js";

/**
 * Search the live web using Google through SerpApi.
 *
 * This tool is intended for the RescueAI agent.
 */
export async function webSearch({ query, location }) {
  if (!query) {
    throw new Error("query is required");
  }

  const data = await searchSerpApi({
    engine: "google",
    q: query,
    location,
  });

  return {
    query,
    organicResults: (data.organic_results || []).slice(0, 8).map((result) => ({
      title: result.title || "",
      link: result.link || "",
      snippet: result.snippet || "",
    })),

    answerBox: data.answer_box
      ? {
          title: data.answer_box.title || "",
          answer: data.answer_box.answer || data.answer_box.snippet || "",
        }
      : null,
  };
}
