# Explain My Code

An AI-powered Python code analysis tool. Paste any Python code — get back a structured breakdown of every function and a plain-English explanation of what the code actually does.

**Live:** [explain-my-code-two.vercel.app](https://explain-my-code-two.vercel.app) · **API Docs:** `[backend-url]/docs`

---

## Why AST before LLM?

Most "explain this code" tools just dump raw code into a prompt. This project does something different: it **parses the code into an AST first**, extracts structured function metadata (names, arguments, line numbers, docstrings), and sends *both* the structured data and the raw code to GPT-3.5-turbo.

Giving the LLM pre-extracted structure produces more accurate, function-level explanations instead of generic summaries. The AST analysis is also deterministic — it will always correctly identify every function, regardless of what the LLM does with it.

---

## How It Works

```
User pastes Python code (React frontend)
        │
        ▼
POST /analyze  (FastAPI)
        │
        ├── ast_service.py
        │     └── ast.parse() → ast.walk() → filter ast.FunctionDef nodes
        │           → extract name, args, lineno, docstring
        │
        └── llm_service.py
              └── structured AST data + raw code → OpenAI GPT-3.5-turbo
                    → function-level natural language explanation
        │
        ▼
JSON response → React frontend renders results
```

---

## API

### `POST /analyze`

```json
// Request
{
  "code": "def add(a, b):\n    \"\"\"Returns the sum of a and b.\"\"\"\n    return a + b"
}

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
  "explanation": "This code defines a simple addition function that accepts two numeric arguments and returns their sum. The docstring accurately describes its behavior.",
  "total_lines": 3,
  "total_functions": 1
}
```

### `GET /health`
Returns `{"status": "ok"}`.

---

## Project Structure

```
explain-my-code/
├── Backend/
│   └── app/
│       ├── main.py              # FastAPI app, CORS, router
│       ├── models/
│       │   └── code_models.py   # Pydantic: CodeInput, FunctionInfo, AnalysisResponse
│       ├── routes/
│       │   └── routes.py        # POST /analyze endpoint
│       ├── services/
│       │   ├── ast_service.py   # AST parsing — extracts function metadata
│       │   └── llm_service.py   # OpenAI API call — generates explanation
│       └── utils/
│           └── helpers.py       # Line counter, empty check utilities
└── Frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        └── pages/
            └── Home.jsx         # Live code editor + results display
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Bootstrap 5, Axios |
| Backend | Python, FastAPI |
| Static analysis | Python `ast` module (stdlib — no install needed) |
| LLM | OpenAI GPT-3.5-turbo via async `httpx` |
| Validation | Pydantic v2 |
| Deployment | Vercel (frontend), Railway (backend) |

---

## Local Setup

```bash
git clone https://github.com/SnehaPoojary20/Explain-My-Code.git

# Backend
cd Backend
python -m venv venv
venv\Scripts\activate         # Windows
# source venv/bin/activate    # Mac/Linux
pip install -r requirements.txt
cp .env.example .env
# Add OPENAI_API_KEY to .env
uvicorn app.main:app --reload
# Runs at http://localhost:8000
# Swagger docs at http://localhost:8000/docs

# Frontend
cd ../Frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
# Runs at http://localhost:5173
```

---

## What I learned building this

- How Python's `ast` module converts source code into a traversable node tree
- How `ast.walk()` traverses every node depth-first — and how to filter by type (`ast.FunctionDef`, `ast.AsyncFunctionDef`)
- How prompt structure affects LLM output quality: passing structured context alongside raw code significantly outperforms raw code alone
- FastAPI's async request handling with `httpx` for non-blocking OpenAI API calls
- Pydantic v2 for request validation and typed response serialization

---

## What I'd improve next

- **Support more languages** — extend beyond Python using tree-sitter for multi-language AST parsing
- **Streaming responses** — stream GPT output token-by-token to the frontend instead of waiting for full completion
- **Caching** — hash the input code and cache results to avoid redundant API calls for identical submissions
- **Complexity scoring** — surface cyclomatic complexity per function alongside the explanation


