#!/bin/bash -e

this_dir=$(dirname $0)
dest_dir=$this_dir/build

mkdir -p $dest_dir
cp $this_dir/../src/static/index.html $dest_dir/index.html

