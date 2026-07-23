import { Schema, model } from "mongoose";

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    suggestedFor: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export default model("Workout", workoutSchema);
