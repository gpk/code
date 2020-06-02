#!/bin/bash -ex

this_dir=$(dirname $0)
src_dir=$this_dir/../src

cd $src_dir


mkdir -p build/upload

time npm install

time node_modules/.bin/tsc --build . --verbose
time node_modules/.bin/rollup --config

cp static/index.html build/upload
cp build/rollup/bundle.js build/upload

cd -
mv $src_dir/build/upload ./
