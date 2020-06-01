#!/bin/bash -ex

this_dir=$(dirname $0)

$this_dir/tsc_build.sh

cd $this_dir/../src/ts

mkdir -p build/upload

time node_modules/.bin/rollup --config

cp ../static/index.html build/upload
cp build/rollup/bundle.js build/upload

