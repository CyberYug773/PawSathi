import express from "express";
import { runRescueAgent } from "../agents/rescueAgent.js";

const router = express.Router();

/**
 * POST /api/agent
 *
 * Example request:
 * {
 *   "message": "Find animal hospitals near Jaipur",
 *   "location": "Jaipur, Rajasthan, India"
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { message, location = null, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "message is required",
      });
    }

    const result = await runRescueAgent({
      message,
      location,
      conversationHistory,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Agent route error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
});

export default router;
