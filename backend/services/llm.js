/**
 * Local response generator for RescueAI.
 *
 * No OpenAI API is used.
 */

export async function askLLM(messages) {
  const lastMessage = messages[messages.length - 1];

  const content = lastMessage?.content || "";

  // rescueAgent.js places the JSON between:
  // "Search results:"
  // and
  // "Using the available research results..."
  const startMarker = "Search results:";
  const endMarker = "Using the available research results";

  const startIndex = content.indexOf(startMarker);

  if (startIndex === -1) {
    return {
      role: "assistant",
      content: "RescueAI could not find the research data.",
    };
  }

  const jsonStart = startIndex + startMarker.length;

  const endIndex = content.indexOf(endMarker, jsonStart);

  const jsonText =
    endIndex === -1
      ? content.slice(jsonStart).trim()
      : content.slice(jsonStart, endIndex).trim();

  let research = [];

  try {
    research = JSON.parse(jsonText);
  } catch (error) {
    console.error("Failed to parse research:", error.message);

    console.error("Research text received:", jsonText.substring(0, 500));

    return {
      role: "assistant",
      content: "RescueAI found the search results, but could not process them.",
    };
  }

  const successfulTools = research.filter((item) => item.success);

  if (successfulTools.length === 0) {
    return {
      role: "assistant",
      content: "RescueAI could not find any successful research results.",
    };
  }

  let response = "Here are the results I found:\n\n";

  for (const result of successfulTools) {
    const data = result.data;

    if (data.places?.length) {
      response += "Animal hospitals and local places:\n\n";

      data.places.slice(0, 5).forEach((place, index) => {
        response += `${index + 1}. ${place.title}\n`;

        if (place.address) {
          response += `Address: ${place.address}\n`;
        }

        if (place.phone) {
          response += `Phone: ${place.phone}\n`;
        }

        if (place.rating) {
          response += `Rating: ${place.rating}\n`;
        }

        if (place.website) {
          response += `Website: ${place.website}\n`;
        }

        response += "\n";
      });
    }

    if (data.organicResults?.length) {
      response += "Web results:\n\n";

      data.organicResults.slice(0, 5).forEach((item, index) => {
        response += `${index + 1}. ${item.title}\n`;

        if (item.link) {
          response += `${item.link}\n`;
        }

        if (item.snippet) {
          response += `${item.snippet}\n`;
        }

        response += "\n";
      });
    }

    if (data.newsResults?.length) {
      response += "News results:\n\n";

      data.newsResults.slice(0, 5).forEach((item, index) => {
        response += `${index + 1}. ${item.title}\n`;

        if (item.link) {
          response += `${item.link}\n`;
        }

        response += "\n";
      });
    }

    if (data.videos?.length) {
      response += "YouTube results:\n\n";

      data.videos.slice(0, 5).forEach((item, index) => {
        response += `${index + 1}. ${item.title}\n`;

        if (item.link) {
          response += `${item.link}\n`;
        }

        response += "\n";
      });
    }

    if (data.images?.length) {
      response += "Image results:\n\n";

      data.images.slice(0, 5).forEach((item, index) => {
        response += `${index + 1}. ${item.title}\n`;

        if (item.sourceUrl) {
          response += `${item.sourceUrl}\n`;
        }

        response += "\n";
      });
    }
  }

  response += "\nThese results were retrieved using live SerpApi searches.";

  return {
    role: "assistant",
    content: response,
  };
}
