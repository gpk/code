#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="$($this_dir/../bin/realpath $this_dir/../bin):/usr/bin:/bin:/usr/sbin:/sbin"

cd $this_dir/..

export NODE_PATH=src/ts/node_modules
exec node src/ts/custom-mocha/bin/_mocha --srcDir=src/ts --tscOutDir=src/ts/build/tsc --preRun=script/tsc_build.sh src/ts/**/*-test.ts
