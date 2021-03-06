#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="$($this_dir/../bin/realpath $this_dir/../bin):/usr/bin:/bin:/usr/sbin:/sbin"

cd $this_dir/../src/py
which python3
echo $PATH
exec python3 -m pytest */test_*.py
