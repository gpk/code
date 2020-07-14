#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="$($this_dir/../bin/realpath $this_dir/../bin):/usr/bin:/bin:/usr/sbin:/sbin"

cd $this_dir/../src/py

find . -name '*.py' | xargs mypy --strict
