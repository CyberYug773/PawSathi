import express from "express";
import cors from "cors";
import "dotenv/config";

import agentRouter from "./routes/agent.js";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PawSathi backend is running",
  });
});

// Agent API
app.use("/api/agent", agentRouter);

// MongoDB connection
async function startServer() {
  try {
    /* await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully"); */

    app.listen(PORT, () => {
      console.log(`PawSathi server running on port ${PORT}`);
      console.log(`API: http://localhost:${PORT}/api/agent`);
    });
  } catch (error) {
    console.error("Failed to start PawSathi:", error.message);
    process.exit(1);
  }
}

startServer();
