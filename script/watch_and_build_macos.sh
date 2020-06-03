#!/bin/bash -ex

which fswatch

this_dir=$(dirname $0)

cd $this_dir/..
script/build.sh
fswatch src --one-per-batch --exclude='/build/' | xargs -n1 -I{} script/build.sh
