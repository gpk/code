from append import append


def test_append() -> None:
    assert "hello world" == append("hello ", "world")
