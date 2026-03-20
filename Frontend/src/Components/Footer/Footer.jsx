import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section text-light">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-3">
            <h5>Explain My Code</h5>
            <p>
              Context-aware code analysis engine that helps developers
              understand code faster using AST & AI-powered summaries.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: support@explainmycode.dev</p>
            <p>Built with ❤️ using FastAPI & AI</p>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center mt-4 border-top pt-3">
          <p>© 2026 CodeInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
