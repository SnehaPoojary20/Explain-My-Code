# Explain My Code

A full-stack web application that analyzes Python code using Abstract Syntax Tree (AST) parsing and generates plain-English explanations using the OpenAI API.

**Live Demo:** [Frontend URL] | **API Docs:** [Backend URL]/docs

---

## What It Does

Paste any Python code → get back:
- Every function found (name, arguments, line number, docstring)
- An AI-generated plain-English explanation of what the code does
- Total line count and function count

---

## How It Works

```
User pastes Python code in React frontend
        ↓
POST /analyze — FastAPI backend receives the code
        ↓
ast_service.py — Python's built-in AST module parses the code
                 into a syntax tree and extracts all function definitions
        ↓
llm_service.py — Structured function data + raw code sent to OpenAI GPT-3.5
                 with a prompt engineered for precise code explanation
        ↓
JSON response returned to frontend with functions + explanation
```

### Why AST first, then LLM?

Sending structured AST output (function names, arguments, line numbers) alongside raw code gives the LLM better context than raw code alone. This produces more accurate, function-level explanations rather than generic summaries.

---

## Tech Stack

**Frontend**
- React.js
- React Router
- Bootstrap 5
- Axios

**Backend**
- Python
- FastAPI (async REST API)
- Python `ast` module (built-in, no install needed)
- OpenAI API (GPT-3.5-turbo)
- Pydantic v2 (request/response validation)
- httpx (async HTTP client)

**Deployment**
- Frontend: Vercel
- Backend: Railway

---

## Project Structure

```
explain-my-code/
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app, CORS, router registration
│   │   ├── models/
│   │   │   └── code_models.py   # Pydantic models: CodeInput, FunctionInfo, AnalysisResponse
│   │   ├── routes/
│   │   │   └── routes.py        # POST /analyze endpoint
│   │   ├── services/
│   │   │   ├── ast_service.py   # AST parsing — extracts functions from code
│   │   │   └── llm_service.py   # OpenAI API call — generates explanation
│   │   └── utils/
│   │       └── helpers.py       # Line counter, empty check utilities
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
└── Frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        └── pages/
            └── Home.jsx
```

---

## API Reference

### POST `/analyze`

Accepts Python code and returns AST analysis + AI explanation.

**Request**
```json
{
  "code": "def add(a, b):\n    return a + b"
}
```

**Response**
```json
{
  "functions_found": ["add"],
  "function_details": [
    {
      "name": "add",
      "args": ["a", "b"],
      "line_number": 1,
      "docstring": null
    }
  ],
  "explanation": "This code defines a simple addition function that takes two parameters and returns their sum.",
  "total_lines": 2,
  "total_functions": 1
}
```

### GET `/health`
Returns `{"status": "ok"}` — used to verify the backend is running.

---

## Local Setup

### Backend

```bash
cd Backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Run the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`  
Swagger docs at `http://localhost:8000/docs`

### Frontend

```bash
cd Frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Deployment

### Backend → Railway

1. Push Backend folder to GitHub
2. Create account at railway.app
3. New Project → Deploy from GitHub → select this repo
4. Set root directory to `Backend`
5. Add environment variable: `OPENAI_API_KEY=your_key`
6. Railway auto-detects FastAPI and deploys

### Frontend → Vercel

1. Push Frontend folder to GitHub
2. Import project at vercel.com
3. Add environment variable: `VITE_API_URL=https://your-app.railway.app`
4. Deploy

---

## What I Learned Building This

- How Python's `ast` module converts source code into a traversable tree structure
- How to use `ast.walk()` to visit every node and filter by type (`ast.FunctionDef`)
- How to design prompts that give LLMs structured context for better output quality
- How to structure a FastAPI backend with separation of concerns (routes / services / models / utils)
- Async HTTP calls with `httpx` inside FastAPI async endpoints
- Pydantic v2 for request validation and response serialization

---

## Author

**Sneha Poojary** — [LinkedIn](https://linkedin.com/in/snehapoojary) | [GitHub](https://github.com/SnehaPoojary20)


