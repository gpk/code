#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"

echo "BUILD START $(date)"

$this_dir/tsc_build.sh

$this_dir/insert_managed_by_build_ts.sh

cd $this_dir/../src/ts

mkdir -p build/upload

time node_modules/.bin/rollup --config

cp ../static/index.html build/upload
cp build/rollup/bundle.js build/upload


