import React, { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");

  // Load user and posts on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    fetchPosts();
  }, []);

  // Fetch all posts from backend
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Handle posting new content
  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Please write something!");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      const newPost = await res.json();
      if (!res.ok) return alert(newPost.message || "Error posting");

      // Add the new post at the top
      setPosts([newPost, ...posts]);
      setContent(""); // clear textarea
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="home-container">
      {/* Profile Section */}
      {user && (
        <div className="profile-card">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=0077B5&color=fff`}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p className="profile-bio">"Keep connecting and learning!"</p>
        </div>
      )}

      {/* Post Form */}
      <div className="feed-container">
        <form onSubmit={handlePost} className="post-form">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>

        <h2 className="feed-title">Recent Posts</h2>
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to share something!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h3>{post.user?.name || "Anonymous"}</h3>
                <span className="post-date">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Kishore Bhukya | LinkedIn Clone</p>
      </footer>
    </div>
  );
}
