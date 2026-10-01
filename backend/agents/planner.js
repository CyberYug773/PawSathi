const TOOL_DESCRIPTIONS = {
  web_search: {
    description:
      "Search the live web for current information, research, official information, laws, policies, animal welfare information, NGO information, and general facts.",
  },

  maps_search: {
    description:
      "Search Google Maps for local places such as veterinary hospitals, animal shelters, rescue centers, NGOs, clinics, pet hospitals, and other nearby services.",
  },

  news_search: {
    description:
      "Search recent news about animal rescue, animal welfare, diseases, vaccination campaigns, government announcements, incidents, and local developments.",
  },

  image_search: {
    description:
      "Search Google Images for visual references such as animal adoption posters, awareness campaign examples, educational images, and other visual material.",
  },

  youtube_search: {
    description:
      "Search YouTube for educational and training videos related to animal rescue, animal care, veterinary education, NGO activities, and awareness.",
  },
};

/**
 * Creates a simple research plan from the user's request.
 *
 * This is the first version of the planner.
 * Later, the LLM will make more dynamic planning decisions.
 */
export function createPlan(userRequest) {
  if (!userRequest || !userRequest.trim()) {
    throw new Error("User request is required");
  }

  const request = userRequest.toLowerCase();

  const selectedTools = [];

  // Local places and services
  const locationKeywords = [
    "near me",
    "nearby",
    "near",
    "hospital",
    "vet",
    "veterinary",
    "clinic",
    "shelter",
    "rescue center",
    "ngo",
    "animal hospital",
  ];

  if (locationKeywords.some((keyword) => request.includes(keyword))) {
    selectedTools.push("maps_search");
  }

  // News and recent events
  const newsKeywords = [
    "latest",
    "recent",
    "today",
    "news",
    "this week",
    "announcement",
    "incident",
    "update",
  ];

  if (newsKeywords.some((keyword) => request.includes(keyword))) {
    selectedTools.push("news_search");
  }

  // Visual research
  const imageKeywords = [
    "image",
    "images",
    "photo",
    "photos",
    "poster",
    "visual",
    "design",
    "example poster",
  ];

  if (imageKeywords.some((keyword) => request.includes(keyword))) {
    selectedTools.push("image_search");
  }

  // YouTube / educational content
  const youtubeKeywords = [
    "youtube",
    "video",
    "videos",
    "tutorial",
    "training",
    "learn",
    "educational",
  ];

  if (youtubeKeywords.some((keyword) => request.includes(keyword))) {
    selectedTools.push("youtube_search");
  }

  // General research
  const researchKeywords = [
    "research",
    "find",
    "information",
    "information about",
    "explain",
    "law",
    "laws",
    "scheme",
    "schemes",
    "policy",
    "policies",
    "how",
    "what",
    "why",
  ];

  if (
    researchKeywords.some((keyword) => request.includes(keyword)) ||
    selectedTools.length === 0
  ) {
    selectedTools.push("web_search");
  }

  // Remove duplicates
  const uniqueTools = [...new Set(selectedTools)];

  return {
    userRequest,
    tools: uniqueTools,
    toolDescriptions: uniqueTools.map((tool) => TOOL_DESCRIPTIONS[tool]),
  };
}
