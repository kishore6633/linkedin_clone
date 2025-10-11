import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await User.deleteMany();
    await Post.deleteMany();

    const user = await User.create({ name: "Kishore", email: "hello234@gmail.com", password: "123456" });
    await Post.create({ content: "Hello World", author: user._id });

    console.log("Seed data created");
    process.exit();
  })
  .catch(err => console.error(err));
