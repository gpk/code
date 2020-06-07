#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"

cd $this_dir/../src/ts

time node_modules/.bin/tsc --build . --verbose

