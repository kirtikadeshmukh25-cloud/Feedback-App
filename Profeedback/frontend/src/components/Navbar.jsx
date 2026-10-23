import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-icon">💬</span>
          <span className="brand-text">FeedPulse</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/submit" className="nav-link">Give Feedback</NavLink>
          <NavLink to="/list" className="nav-link">All Reviews</NavLink>
        </div>

        <NavLink to="/submit" className="nav-cta">
          Write Review →
        </NavLink>
      </nav>
    </header>
  );
}