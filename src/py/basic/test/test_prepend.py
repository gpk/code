import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))

from prepend import prepend


def test_prepend():
    assert "hello world" == prepend("hello ", "world")
