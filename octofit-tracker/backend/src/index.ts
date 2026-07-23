import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/database";
import { PORT, API_BASE_URL, FRONTEND_BASE_URL } from "./config/env";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";

dotenv.config();

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
