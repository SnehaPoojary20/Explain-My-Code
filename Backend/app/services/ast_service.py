import ast
from typing import List
from fastapi import HTTPException
from app.models.code_models import FunctionInfo


def extract_functions(code: str) -> List[FunctionInfo]:
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        raise HTTPException(status_code=400, detail=f"Invalid Python syntax: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Code contains invalid characters: {str(e)}")

    functions = []

    
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            # Only include top-level and class-method functions, not closures
            pass  

    # Correct approach: iterate module body directly for top-level,
    # then optionally one level deep for class methods
    def collect(nodes):
        for node in nodes:
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                all_args = []
                for arg in node.args.args:
                    all_args.append(arg.arg)
                if node.args.vararg:
                    all_args.append(f"*{node.args.vararg.arg}")
                for arg in node.args.kwonlyargs:
                    all_args.append(arg.arg)
                if node.args.kwarg:
                    all_args.append(f"**{node.args.kwarg.arg}")

                display_args = [a for a in all_args if a not in ("self", "cls")]
                docstring = ast.get_docstring(node)
                fn_name = f"async {node.name}" if isinstance(node, ast.AsyncFunctionDef) else node.name

                functions.append(FunctionInfo(
                    name=fn_name,
                    args=display_args,
                    line_number=node.lineno,
                    docstring=docstring
                ))
            elif isinstance(node, ast.ClassDef):
                # pick up methods but not closures inside methods
                collect(node.body)

    collect(tree.body)
    return functions