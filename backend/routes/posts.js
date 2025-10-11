import express from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const post = new Post({ content, user: req.user._id });
    await post.save();
    await post.populate("user", "name email");

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
