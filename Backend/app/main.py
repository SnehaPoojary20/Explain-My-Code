from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.routes import router

app = FastAPI(
    title="Explain My Code API",
    description="AST-powered code analysis with AI explanations",
    version="1.0.0"
)

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Explain My Code API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}