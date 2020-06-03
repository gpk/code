from prepend import prepend


def test_prepend() -> None:
    assert "hello world" == prepend("hello ", "world")
