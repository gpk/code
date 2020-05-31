#!/bin/bash -ex

this_dir=$(dirname $0)

if [ -n "$GITHUB_RUN_ID" -a -d "$this_dir/../src/node_modules" ]; then
    # we assume the proper node_modules dir has been restored from cache
    exit 0
fi

cd $this_dir/../src
time npm install
