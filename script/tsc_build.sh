#!/bin/bash -e

this_dir=$(dirname $0)
PATH="$($this_dir/../bin/realpath $this_dir/../bin):/usr/bin:/bin:/usr/sbin:/sbin"

cd $this_dir/../src/ts

time node_modules/.bin/tsc --build .
