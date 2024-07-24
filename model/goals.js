import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const goalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    miniDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: { type: String, default: "medium" },
    },
    coverImage: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    isComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model("Goal", goalSchema);
