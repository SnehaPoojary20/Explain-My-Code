from pydantic import BaseModel, field_validator
from typing import List, Optional


class CodeInput(BaseModel):
    code: str

    @field_validator("code")
    @classmethod
    def sanitize_code(cls, v: str) -> str:
        if not isinstance(v, str):
            raise ValueError("Code must be a string")
        # Remove null bytes 
        v = v.replace("\x00", "")
        return v


class FunctionInfo(BaseModel):
    name: str
    args: List[str]
    line_number: int
    docstring: Optional[str] = None


class AnalysisResponse(BaseModel):
    functions_found: List[str]
    function_details: List[FunctionInfo]
    explanation: str
    total_lines: int
    total_functions: int