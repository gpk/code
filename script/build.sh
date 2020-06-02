#!/bin/bash -ex

this_dir=$(dirname $0)

cd $this_dir/../src

mkdir -p build/upload

time node_modules/.bin/tsc --build . --verbose
time node_modules/.bin/rollup --config

cp static/index.html build/upload
cp build/rollup/bundle.js build/upload

