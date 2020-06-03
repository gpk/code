#!/bin/bash -ex

this_dir=$(dirname $0)

cd $this_dir/../src/py

find . -name '*.py' | xargs /home/runner/.local/bin/mypy --strict
