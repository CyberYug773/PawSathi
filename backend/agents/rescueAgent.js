import { createPlan } from "./planner.js";
import { askLLM } from "../services/llm.js";

import { webSearch } from "../tools/webSearch.js";
import { mapsSearch } from "../tools/mapsSearch.js";
import { newsSearch } from "../tools/newsSearch.js";
import { imageSearch } from "../tools/imageSearch.js";
import { youtubeSearch } from "../tools/youtubeSearch.js";

const toolHandlers = {
  web_search: webSearch,
  maps_search: mapsSearch,
  news_search: newsSearch,
  image_search: imageSearch,
  youtube_search: youtubeSearch,
};

async function executeTool(toolName, query, location) {
  const tool = toolHandlers[toolName];

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  return await tool({
    query,
    location,
  });
}

export async function runRescueAgent({
  message,
  location = null,
  conversationHistory = [],
}) {
  if (!message || !message.trim()) {
    throw new Error("message is required");
  }

  const plan = createPlan(message);

  const toolResults = [];

  for (const toolName of plan.tools) {
    try {
      const result = await executeTool(toolName, message, location);

      toolResults.push({
        tool: toolName,
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(`Tool failed: ${toolName}`, error);

      toolResults.push({
        tool: toolName,
        success: false,
        error: error.message,
      });
    }
  }

  // If every selected tool failed, return the actual
  // error immediately instead of sending it through
  // the local LLM fallback.
  const successfulTools = toolResults.filter((result) => result.success);

  if (successfulTools.length === 0) {
    const errors = toolResults
      .map((result) => `${result.tool}: ${result.error}`)
      .join("\n");

    return {
      message:
        `RescueAI could not retrieve external research results.\n\n` +
        `Tool errors:\n${errors}`,

      plan: {
        toolsUsed: plan.tools,
      },

      research: toolResults,
    };
  }

  const researchContext = JSON.stringify(toolResults, null, 2);

  const messages = [
    ...conversationHistory,

    {
      role: "user",
      content: `
User request:

${message}

User location:

${location || "Not provided"}

Research plan:

${JSON.stringify(plan, null, 2)}

Search results:

${researchContext}

Using the available research results, answer the user's
request.

Important:
- Do not invent information.
- If search results are incomplete, say so.
- Include useful source links when available.
- For emergency or time-sensitive information, clearly
  tell the user what should be confirmed directly.
- Keep the response practical for an animal rescue NGO.
`,
    },
  ];

  const finalResponse = await askLLM(messages);

  return {
    message: finalResponse?.content || "I could not generate a response.",

    plan: {
      toolsUsed: plan.tools,
    },

    research: toolResults,
  };
}
