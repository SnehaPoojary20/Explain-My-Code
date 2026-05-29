import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If already on home, just scroll. If on another page, go home first then scroll.
  const handleScrollLink = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Explain My Code
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Scrolls to #features on homepage */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="#features"
                onClick={(e) => handleScrollLink(e, "features")}
              >
                Features
              </a>
            </li>

            {/* Scrolls to #about on homepage */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="#about"
                onClick={(e) => handleScrollLink(e, "about")}
              >
                About
              </a>
            </li>

            {/* Goes to /try page */}
            <li className="nav-item">
              <Link className="btn btn-primary ms-3" to="/try">
                Try Now
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
