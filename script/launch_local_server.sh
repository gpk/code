#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="$($this_dir/../bin/realpath $this_dir/../bin):/usr/bin:/bin:/usr/sbin:/sbin"

test -d $this_dir/../src/ts/build/upload
test -f $this_dir/../src/ts/node_modules/.bin/live-server

$this_dir/../src/ts/node_modules/.bin/live-server --mount=/pyodide-local:$HOME/.pyodide-local $this_dir/../src/ts/build/upload
