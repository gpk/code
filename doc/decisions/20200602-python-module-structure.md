## Summary

The python module/import system is unfortunately somewhat complex and nuanced. To avoid
the risk of doing anything non-obvious / tricky, we'll just adopt a very simple, flat structure.

It's simple, but might be too simplistic, longer term.

## Details

* Use `pytest` for testing
  * In Intellij's Settings, Python Integrated Tools > Default Test Runner should be `pytest`
* Use a flat package structure which colocates test and lib files.
  * This means we need to exclude `test_**.py` when deploying python files


