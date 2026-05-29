from fastapi import APIRouter, HTTPException
from app.models.code_models import CodeInput, AnalysisResponse
from app.services.ast_service import extract_functions
from app.services.llm_service import get_explanation
from app.utils.helpers import count_lines, is_empty

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(input: CodeInput):
  
    # Step 1: Validate
    if is_empty(input.code):
        raise HTTPException(status_code=400, detail="Code cannot be empty")

    if len(input.code) > 10000:
        raise HTTPException(status_code=400, detail="Code too long. Max 10,000 characters.")

    # Step 2: AST parsing — extract all functions
    functions = extract_functions(input.code)

    # Step 3: Get AI explanation
    explanation = await get_explanation(input.code, functions)

    # Step 4: Build and return response
    return AnalysisResponse(
        functions_found=[f.name for f in functions],
        function_details=functions,
        explanation=explanation,
        total_lines=count_lines(input.code),
        total_functions=len(functions)
    )