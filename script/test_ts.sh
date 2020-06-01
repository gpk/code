#!/bin/bash -ex

this_dir=$(dirname $0)

cd $this_dir/..

export NODE_PATH=src/ts/node_modules
exec node src/custom-mocha/bin/_mocha --srcDir=src/ts --tscOutDir=src/ts/build/tsc --preRun=script/tsc_build.sh src/ts/**/*-test.ts
