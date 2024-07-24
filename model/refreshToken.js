// models/RefreshToken.js
import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  token: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, expires: "15d" }, 
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
