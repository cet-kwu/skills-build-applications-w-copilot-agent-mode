import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true },
);

export default model("User", userSchema);
