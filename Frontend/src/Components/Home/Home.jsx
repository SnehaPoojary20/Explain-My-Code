import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="hero-title">
            Understand Code <span className="highlight">Instantly</span>
          </h1>

          <p className="hero-subtitle">
            Context-aware code analysis using AST & AI.
            Get function-level summaries of any Python codebase in real-time.
          </p>

          <div className="mt-4">
            <Link to="/try" className="btn btn-primary btn-lg me-3">
              Try Now
            </Link>
            <a href="#features" className="btn btn-outline-light btn-lg">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container text-center">
          <h2 className="section-title">Powerful Features</h2>

          <div className="row mt-5">

            {/* Feature 1 — real */}
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">⟨/⟩</div>
                <h5>AST-Based Parsing</h5>
                <p>
                  Uses Python's built-in Abstract Syntax Tree module to extract
                  function names, arguments, line numbers, and docstrings —
                  without executing your code.
                </p>
              </div>
            </div>

            {/* Feature 2 — real */}
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">✦</div>
                <h5>AI-Powered Explanations</h5>
                <p>
                  Sends structured AST data alongside your code to OpenAI,
                  producing precise, function-level explanations that are
                  more accurate than raw code prompting.
                </p>
              </div>
            </div>

            {/* Feature 3 — real */}
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h5>Instant Results</h5>
                <p>
                  Async FastAPI backend processes requests without blocking.
                  Get structured breakdowns of functions, parameters,
                  and code logic in seconds.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container text-center">
          <h2 className="section-title">About the Project</h2>
          <p className="about-text">
            Built using Python, FastAPI, AST parsing, and OpenAI GPT-3.5.
            Explain My Code helps developers understand unfamiliar Python codebases
            faster by combining structural code analysis with AI-generated summaries —
            no manual reading required.
          </p>

          <div className="tech-stack">
            <span className="tech-tag">Python</span>
            <span className="tech-tag">FastAPI</span>
            <span className="tech-tag">AST</span>
            <span className="tech-tag">OpenAI API</span>
            <span className="tech-tag">React.js</span>
            <span className="tech-tag">Railway</span>
            <span className="tech-tag">Vercel</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="try" className="cta-section text-center">
        <div className="container">
          <h2>Start Analyzing Your Code Today 🚀</h2>
          <p>Paste your Python code and get an instant explanation.</p>
          <Link to="/try" className="btn btn-primary btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
