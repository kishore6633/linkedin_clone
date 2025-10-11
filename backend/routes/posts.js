// backend/routes/posts.js
import express from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Post content is required" });

    // Create post linked to the logged-in user
    const newPost = new Post({
      content,
      user: req.user._id
    });

    const savedPost = await newPost.save();

    // Populate user info before sending
    const populatedPost = await savedPost.populate("user", "name email");

    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});

// Get all posts (latest first)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email"); // populate user info

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});

export default router;
