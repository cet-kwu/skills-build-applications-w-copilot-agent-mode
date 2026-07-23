import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/database";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";

dotenv.config();

const codespaceName = process.env.CODESPACE_NAME;

const PORT = process.env.PORT || 8000;

/**
 * Public base URL for this API. When running inside a GitHub Codespace,
 * ports are exposed at https://$CODESPACE_NAME-<port>.app.github.dev.
 * Falls back to localhost when CODESPACE_NAME is not set.
 */
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

/**
 * Public base URL for the paired frontend (Vite dev server on port 5173),
 * used to allow it as a CORS origin.
 */
const FRONTEND_BASE_URL = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : "http://localhost:5173";

const app = express();

const allowedOrigins = Array.from(
  new Set([FRONTEND_BASE_URL, "http://localhost:5173"]),
);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`API base URL: ${API_BASE_URL}`);
});
