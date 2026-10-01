import "dotenv/config";

const SERPAPI_URL = "https://serpapi.com/search.json";

/**
 * Central SerpApi service.
 *
 * All SerpApi searches in RescueAI go through this function.
 */
export async function searchSerpApi({
  engine = "google",
  q,
  location,
  ...options
}) {
  if (!process.env.SERPAPI_KEY) {
    throw new Error("SERPAPI_KEY is missing from .env");
  }

  if (!q || !q.trim()) {
    throw new Error("Search query (q) is required");
  }

  const params = new URLSearchParams({
    engine,
    q: q.trim(),
    api_key: process.env.SERPAPI_KEY,
    output: "json",
    ...options,
  });

  if (location) {
    params.set("location", location);
  }

  const response = await fetch(`${SERPAPI_URL}?${params.toString()}`);

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `SerpApi request failed (${response.status}): ${errorText}`,
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`SerpApi error: ${data.error}`);
  }

  return data;
}
