import React, { useState } from "react";
import "./Explanation.css";

const SAMPLE_CODE = `def calculate_factorial(n):
    """Calculate factorial of a number recursively."""
    if n == 0 or n == 1:
        return 1
    return n * calculate_factorial(n - 1)

def is_palindrome(text):
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

def find_max(numbers):
    if not numbers:
        return None
    max_val = numbers[0]
    for num in numbers:
        if num > max_val:
            max_val = num
    return max_val`;

const Explanation = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setCharCount(e.target.value.length);
    if (error) setError("");
  };

  const handleLoadSample = () => {
    setCode(SAMPLE_CODE);
    setCharCount(SAMPLE_CODE.length);
    setError("");
    setResult(null);
  };

  const handleClear = () => {
    setCode("");
    setCharCount(0);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please paste some Python code first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Analysis failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="try-page">

      {/* Page Header */}
      <div className="try-header">
        <div className="try-header-inner">
          <span className="try-tag">AST + AI Analysis</span>
          <h1 className="try-title">Analyze Your Code</h1>
          <p className="try-subtitle">
            Paste any Python code below. We parse it with AST to extract structure,
            then send that context to AI for a precise explanation.
          </p>
        </div>
      </div>

      <div className="try-body container">
        <div className="try-grid">

          {/* LEFT — Input Panel */}
          <div className="panel input-panel">
            <div className="panel-header">
              <div className="panel-title">
                <span className="panel-dot dot-blue"></span>
                Python Code Input
              </div>
              <div className="panel-actions">
                <button className="action-btn" onClick={handleLoadSample}>
                  Load Sample
                </button>
                <button className="action-btn" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>

            <div className="editor-wrapper">
              <div className="line-numbers">
                {(code || " ").split("\n").map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <textarea
                className="code-editor"
                value={code}
                onChange={handleCodeChange}
                placeholder="# Paste your Python code here...
# Example:
def greet(name):
    return f'Hello, {name}!'
"
                spellCheck={false}
              />
            </div>

            <div className="editor-footer">
              <span className="char-count">{charCount} characters · {code.split("\n").length} lines</span>
              <button
                className={`analyze-btn ${loading ? "analyzing" : ""}`}
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">⚡</span>
                    Analyze Code
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="error-box">
                <span className="error-icon">⚠</span>
                {error}
              </div>
            )}
          </div>

          {/* RIGHT — Output Panel */}
          <div className="panel output-panel">
            <div className="panel-header">
              <div className="panel-title">
                <span className="panel-dot dot-green"></span>
                Analysis Results
              </div>
              {result && (
                <span className="result-badge">
                  {result.functions_found.length} function{result.functions_found.length !== 1 ? "s" : ""} found
                </span>
              )}
            </div>

            {!result && !loading && (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"/>
                    <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                  </svg>
                </div>
                <p className="empty-title">Ready to analyze</p>
                <p className="empty-sub">Paste your Python code and click Analyze Code to get started. Or load the sample to see how it works.</p>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="loading-steps">
                  <div className="loading-step active">
                    <span className="step-dot"></span>
                    Parsing code with AST...
                  </div>
                  <div className="loading-step">
                    <span className="step-dot"></span>
                    Extracting function structure...
                  </div>
                  <div className="loading-step">
                    <span className="step-dot"></span>
                    Generating AI explanation...
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="result-content">

                {/* Stats Row */}
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-num">{result.functions_found.length}</div>
                    <div className="stat-label">Functions</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">{result.total_lines}</div>
                    <div className="stat-label">Lines</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">
                      {result.function_details.reduce((acc, fn) => acc + fn.args.length, 0)}
                    </div>
                    <div className="stat-label">Parameters</div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="result-section">
                  <div className="section-label">
                    <span className="label-icon">✦</span>
                    AI Explanation
                  </div>
                  <div className="explanation-text">
                    {result.explanation}
                  </div>
                </div>

                {/* Functions Found */}
                {result.function_details.length > 0 && (
                  <div className="result-section">
                    <div className="section-label">
                      <span className="label-icon">⬡</span>
                      Functions Extracted by AST
                    </div>
                    <div className="functions-list">
                      {result.function_details.map((fn, i) => (
                        <div className="fn-card" key={i}>
                          <div className="fn-header">
                            <span className="fn-keyword">def</span>
                            <span className="fn-name">{fn.name}</span>
                            <span className="fn-args">
                              ({fn.args.length > 0 ? fn.args.join(", ") : ""})
                            </span>
                            <span className="fn-line">line {fn.line_number}</span>
                          </div>
                          {fn.docstring && (
                            <div className="fn-docstring">"{fn.docstring}"</div>
                          )}
                          {fn.args.length > 0 && (
                            <div className="fn-params">
                              {fn.args.map((arg, j) => (
                                <span className="param-tag" key={j}>{arg}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Explanation;