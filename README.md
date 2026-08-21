## Explain My Code

An AI-powered Python code analysis tool. Paste any Python code — get back a structured breakdown of every function and a plain-English explanation of what the code actually does.

Live: https://explain-my-code-two.vercel.app/

### Why AST before LLM?

Most "explain this code" tools just dump raw code into a prompt. This project does something different: it parses the code into an AST first, extracts structured function metadata (names, arguments, line numbers, docstrings), and sends both the structured data and the raw code to an LLM.

Giving the LLM pre-extracted structure is intended to produce more accurate, function-level explanations than a generic summary would. The AST analysis itself is deterministic — it will always correctly identify every function, regardless of what the LLM does with it. If the LLM call fails or the API key isn't configured, the endpoint still returns the AST results with a fallback message instead of erroring out — the core feature works even when the AI layer doesn't.

### How It Works

```
User pastes Python code (React frontend)
        │
        ▼
POST /analyze  (FastAPI)
        │
        ├── ast_service.py
        │     └── ast.parse() → walk module body → collect ast.FunctionDef /
        │           ast.AsyncFunctionDef nodes (including class methods)
        │           → extract name, args, line number, docstring
        │
        └── llm_service.py
              └── structured AST data + raw code → Google Gemini
                    (via Gemini's OpenAI-compatible chat completions endpoint)
                    → function-level natural language explanation,
                      with a deterministic fallback if the call fails
        │
        ▼
JSON response → React frontend renders results
```

### API

```
POST /analyze
```
```json
// Request
{
  "code": "def add(a, b):\n    \"\"\"Returns the sum of a and b.\"\"\"\n    return a + b"
}
```
```json
// Response
{
  "functions_found": ["add"],
  "function_details": [
    {
      "name": "add",
      "args": ["a", "b"],
      "line_number": 1,
      "docstring": "Returns the sum of a and b."
    }
  ],
  "explanation": "This code defines a simple addition function that accepts two numeric arguments and returns their sum.",
  "total_lines": 3,
  "total_functions": 1
}
```
```
GET /health
```
Returns `{"status": "ok"}`.

### Project Structure

```
explain-my-code/
├── Backend/
│   └── app/
│       ├── main.py              # FastAPI app, CORS, router
│       ├── models/
│       │   └── code_models.py   # Pydantic v2: CodeInput, FunctionInfo, AnalysisResponse
│       ├── routes/
│       │   └── routes.py        # POST /analyze endpoint
│       ├── services/
│       │   ├── ast_service.py   # AST parsing — extracts function metadata
│       │   └── llm_service.py   # Gemini API call — generates explanation
│       └── utils/
│           └── helpers.py       # Line counter, empty check utilities
└── Frontend/
    └── src/
        ├── Components/
        │   ├── Navbar/
        │   ├── Footer/
        │   ├── Home/
        │   └── Explanation/      # Code editor + results display
```

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, plain CSS, native `fetch` |
| Backend | Python, FastAPI |
| Static analysis | Python `ast` module (stdlib) |
| LLM | Google Gemini, called directly via `httpx` against Gemini's OpenAI-compatible endpoint (no SDK) |
| Validation | Pydantic v2 |
| Deployment | Vercel (frontend), Render (backend) |

### Local Setup

```bash
git clone https://github.com/SnehaPoojary20/Explain-My-Code.git

# Backend
cd Explain-My-Code/Backend
python -m venv venv
venv\Scripts\activate         # Windows
# source venv/bin/activate    # Mac/Linux
pip install -r requirements.txt
# create a .env with: GEMINI_API_KEY
uvicorn app.main:app --reload
# Runs at http://localhost:8000 — Swagger docs at /docs

# Frontend
cd ../Frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
# Runs at http://localhost:5173
```

### What I Learned Building This

- How Python's `ast` module converts source code into a traversable node tree, and how to walk it selectively (top-level + class methods, but not nested closures) instead of blindly using `ast.walk()` on everything
- How prompt structure affects LLM output quality — passing structured context alongside raw code appears to outperform raw code alone, though this hasn't been formally evaluated (see below)
- FastAPI's async request handling with `httpx` for non-blocking LLM API calls
- Designing a graceful-degradation path so a third-party API outage doesn't take down the whole feature — the fallback response is not an error state, it's a genuinely useful reduced result

### What I'd Improve Next

- **Formally evaluate output quality** — compare AST-augmented explanations against raw-code-prompting explanations on a fixed test set, instead of relying on informal impression.
- **Measure actual response latency** across a range of function sizes and concurrent load.
- Support more languages — extend beyond Python using tree-sitter for multi-language AST parsing.
- Streaming responses — stream model output token-by-token to the frontend instead of waiting for full completion.
- Caching — hash the input code and cache results to avoid redundant API calls for identical submissions.
- Complexity scoring — surface cyclomatic complexity per function alongside the explanation.


