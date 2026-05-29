import httpx
import os
from typing import List
from app.models.code_models import FunctionInfo

async def get_explanation(code: str, functions: List[FunctionInfo]) -> str:

    # Build a readable summary of functions found
    if functions:
        fn_lines = []
        for fn in functions:
            args_str = ", ".join(fn.args) if fn.args else "no arguments"
            fn_lines.append(f"- {fn.name}({args_str}) at line {fn.line_number}")
        functions_summary = "\n".join(fn_lines)
    else:
        functions_summary = "No functions found — this may be a script."

    # Construct the prompt
    prompt = f"""You are a helpful code explanation assistant.

A developer has submitted the following Python code for analysis.
The AST parser found these functions:
{functions_summary}

Here is the full code:
```python
{code}
```

Please provide:
1. A clear, concise explanation of what this code does (2-3 sentences)
2. What each function does in one line
3. Any important patterns or techniques used

Keep the explanation beginner-friendly but technically accurate. Max 200 words."""

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Fallback if no API key — useful for testing
        return f"AST Analysis complete. Found {len(functions)} function(s): {', '.join([f.name for f in functions])}. Add OPENAI_API_KEY to get AI explanations."

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {"role": "user", "content": prompt}
                    ],
                    "max_tokens": 300,
                    "temperature": 0.3  # Lower = more consistent, factual output
                }
            )
            data = response.json()
            return data["choices"][0]["message"]["content"]

    except Exception as e:
        # Don't crash the whole app if OpenAI is down
        return f"AI explanation unavailable: {str(e)}. AST parsing still worked — found {len(functions)} function(s)."