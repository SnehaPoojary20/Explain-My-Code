import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      {/*  Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="hero-title">
            Understand Code <span className="highlight">Instantly</span>
          </h1>

          <p className="hero-subtitle">
            Context-aware code analysis using AST & AI.
            Generate function-level summaries and call graphs in real-time.
          </p>

          <div className="mt-4">
            <a href="#try" className="btn btn-primary btn-lg me-3">
              Try Now
            </a>
            <a href="#features" className="btn btn-outline-light btn-lg">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/*  Features Section */}
      <section id="features" className="features-section">
        <div className="container text-center">
          <h2 className="section-title">Powerful Features</h2>

          <div className="row mt-5">

            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <h5>AST-Based Analysis</h5>
                <p>
                  Parse and understand code structure using Abstract Syntax Trees.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <h5>Function Summaries</h5>
                <p>
                  Generate precise, function-level explanations with AI.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <h5>Call Graphs</h5>
                <p>
                  Visualize relationships between functions using NetworkX.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/*  About Section */}
      <section id="about" className="about-section">
        <div className="container text-center">
          <h2 className="section-title">About the Project</h2>
          <p className="about-text">
                  Built using Python, FastAPI, AST parsing, and OpenAI.
                   Helps developers understand code faster by generating
                    structured, function-level explanations in real-time.
          </p>
        </div>
      </section>

      {/*  CTA Section */}
      <section id="try" className="cta-section text-center">
        <div className="container">
          <h2>Start Analyzing Your Code Today 🚀</h2>
          <p>Upload your code and get instant insights.</p>
          <a href="#upload" className="btn btn-primary btn-lg mt-3">
            Get Started
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
