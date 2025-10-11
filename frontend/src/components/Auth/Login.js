import { API_BASE_URL } from "../../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // ✅ Make sure this file exists in the same folder

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) return alert(data.message || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back Developer</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <span className="auth-footer">
        <p>👋 Welcome to <strong>Kishore Bhukya's LinkedIn</strong> — Connect & Share</p>
      </span>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Kishore Bhukya | LinkedIn Clone</p>
      </footer>
    </div>
  );
}
