// backend/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to User
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

export default mongoose.model("Post", postSchema);
