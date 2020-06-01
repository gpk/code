#!/bin/bash -ex

this_dir=$(dirname $0)

cd $this_dir/..

exec node src/custom-mocha/bin/_mocha --srcDir=src --tscOutDir=src/build/tsc --preRun=script/tsc_build.sh src/**/*-test.ts
