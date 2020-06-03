from echo import echo


def test_echo() -> None:
    assert "echoing: foo" == echo("foo")
    assert "echoing: 4" == echo("4")
