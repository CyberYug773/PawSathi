const API_BASE_URL = "http://localhost:5000";

/**
 * Send a message to the RescueAI backend.
 */
export async function sendAgentMessage({
  message,
  location = null,
  conversationHistory = [],
}) {
  const response = await fetch(`${API_BASE_URL}/api/agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      location,
      conversationHistory,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to communicate with RescueAI");
  }

  return data;
}
