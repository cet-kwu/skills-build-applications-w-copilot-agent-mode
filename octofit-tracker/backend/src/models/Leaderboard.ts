import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    points: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true },
);

export default model("Leaderboard", leaderboardSchema);
