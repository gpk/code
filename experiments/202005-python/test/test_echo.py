import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))

from echo import echo


def test_echo():
    assert "echoing: foo" == echo("foo")
