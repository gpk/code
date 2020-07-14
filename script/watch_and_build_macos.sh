#!/bin/bash -ex

which fswatch

this_dir=$(dirname $0)

cd $this_dir/..
script/build.sh
fswatch src --batch-marker=EOF --one-per-batch --exclude='/build/' --exclude='mypy_cache' --exclude='pytest_cache' | xargs -n1 -I{} script/build.sh
