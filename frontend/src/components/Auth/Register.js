import { API_BASE_URL } from "../../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";  // instead of ../styles/Auth.css

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Something went wrong");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (<div>
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
      <h2>Welcome  Developer</h2>
    </form>
    {}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Kishore Bhukya | LinkedIn Clone</p>
      </footer></div>
  );
}
