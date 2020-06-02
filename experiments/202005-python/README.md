mypy experiments

`pyenv/bin/mypy --disallow-untyped-calls --disallow-untyped-defs --disallow-incomplete-defs --check-untyped-defs test_echo.py`

```
test_echo.py:5: error: Argument 1 to "echo" has incompatible type "int"; expected "str"
Found 1 error in 1 file (checked 1 source file)
``` 

* Strongly consider turning on all type hint inspections in Intellij, making them error.
