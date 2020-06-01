#!/bin/bash -ex

this_dir=$(dirname $0)

cd $this_dir/../src

time node_modules/.bin/tsc --build . --verbose

