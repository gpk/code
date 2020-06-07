#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"

test -d $this_dir/../src/ts/build/upload
test -f $this_dir/../src/ts/node_modules/.bin/live-server

$this_dir/../src/ts/node_modules/.bin/live-server $this_dir/../src/ts/build/upload
