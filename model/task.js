import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const taskSchema = Schema({
  // Define other task fields here
  name: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    default: "medium",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  goalId: {
    type: String,
    required: true,
  },
});

export default model("Task", taskSchema);
