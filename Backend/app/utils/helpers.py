def is_empty(code: str) -> bool:
    return not code or not code.strip()


def count_lines(code: str) -> int:
    if not code:
        return 0
    return len(code.splitlines())