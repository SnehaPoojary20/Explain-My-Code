from pydantic import BaseModel
from typing import List, Optional

 
class CodeInput(BaseModel):
    code: str  

class FunctionInfo(BaseModel):
    name: str               
    args: List[str]         
    line_number: int       
    docstring: Optional[str] = None  

# response we send back to frontend
class AnalysisResponse(BaseModel):
    functions_found: List[str]          
    function_details: List[FunctionInfo] 
    explanation: str                     
    total_lines: int                    
    total_functions: int                