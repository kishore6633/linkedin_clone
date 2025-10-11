import React, { useState } from "react";
import { getToken, getUser } from "../api";
import "../styles/PostForm.css";

const PostForm = ({ fetchPosts }) => {
  const [content, setContent] = useState("");
  const token = getToken();
  const user = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      setContent("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder={`What's on your mind, ${user?.name}?`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
