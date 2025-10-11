import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../api";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">LinkedIn Clone</Link>
      </div>
      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/home" className="nav-link">Home</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
