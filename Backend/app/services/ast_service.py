import ast
from typing import List
from fastapi import HTTPException
from app.models.code_models import FunctionInfo

def extract_functions(code: str) -> List[FunctionInfo]:
  
    try:
        # ast.parse() converts code string into a tree
        # If the code has syntax errors, this raises SyntaxError
        tree = ast.parse(code)
    except SyntaxError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid Python syntax: {str(e)}"
        )

    functions = []

    # ast.walk() visits every node in the tree
    for node in ast.walk(tree):

        # Check if this node is a function definition
        if isinstance(node, ast.FunctionDef):

            # Extract argument names from the function signature
            args = [arg.arg for arg in node.args.args]

            # ast.get_docstring() extracts the docstring if present
            docstring = ast.get_docstring(node)

            functions.append(FunctionInfo(
                name=node.name,
                args=args,
                line_number=node.lineno,
                docstring=docstring
            ))

    return functions