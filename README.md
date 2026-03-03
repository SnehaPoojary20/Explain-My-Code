#  Explain My Code

Explain My Code is a full-stack web application that analyzes Python source code, extracts structural information using Abstract Syntax Tree (AST) parsing, and generates clear, human-readable explanations using the OpenAI API.

The project is built with a **React frontend** and a **FastAPI backend**, following a clean, modular architecture suitable for scalable development.

---

##  What It Does

- Accepts Python code input from the user
- Parses the code using Python AST
- Extracts function-level structure
- Sends code to OpenAI for contextual explanation
- Returns structured JSON response
- Displays explanation in a clean React UI

---

##  Architecture Overview

```

React Frontend
↓
FastAPI Backend
↓
AST Parser (Structure Extraction)
↓
OpenAI API (Natural Language Explanation)
↓
JSON Response → Frontend Display


---

##  Tech Stack

### Frontend
- React
- Axios (API calls)
- CSS / Tailwind (optional styling)

### Backend
- Python
- FastAPI
- AST (Abstract Syntax Tree)
- OpenAI API
- Uvicorn
- Pydantic
- Docker (optional)
---

## ⚙️ Backend Setup

### 1️ Navigate to backend

```bash
cd backend
````

### 2️ Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate     # Windows
# source venv/bin/activate  # Mac/Linux
```

### 3️ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️ Configure environment variables

Create a `.env` file inside `/backend`:

```
OPENAI_API_KEY=your_api_key_here
```

---

###  Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger documentation:

```
http://127.0.0.1:8000/docs
```

##  Frontend Setup

### 1️ Navigate to frontend

```bash
cd frontend
```

### 2️ Install dependencies

```bash
npm install
```

### 3️ Start development server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173   (if using Vite)
```

---

##  API Endpoint

### POST `/analyze`

### Request Body

```json
{
  "code": "def add(a, b): return a + b"
}
```

### Response

```json
{
  "functions_found": ["add"],
  "summary": "This function takes two parameters and returns their sum."
}
```

---

##  How It Works Internally

1. User submits code via React interface.
2. Axios sends request to FastAPI backend.
3. AST parses the code and extracts function definitions.
4. Code is sent to OpenAI for explanation.
5. Backend returns structured response.
6. Frontend displays formatted explanation.

---

##  Future Improvements

* Function-level explanation instead of full-code summary
* Call graph visualization using NetworkX
* Code complexity metrics
* Multi-language support
* Authentication & rate limiting
* Deployment with Docker
* CI/CD pipeline

---

##  Use Cases

* Understanding unfamiliar repositories
* Learning Python code structure
* Educational tool for beginners
* AI-powered code documentation assistant

---

##  Deployment 

### Backend

* Railway

### Frontend

* Vercel
  
---

##  Author

Built as a full-stack learning project to explore:

* API development
* Code parsing techniques
* AI integration
* React + FastAPI architecture


