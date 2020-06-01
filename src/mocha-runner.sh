#!/bin/bash -e

if [ -z "$1" -o -n "$2" ]; then
    echo "Expected exactly one argument, which tells mocha what test or tests to run."
    echo "ex 1: foo/bar-test.js"
    echo "ex 2: **/*-test.js"
    echo "Expected js files, and will output stack traces in the original language via their included sourcemaps"
    exit 1
fi

this_dir=$(dirname $0)

exec time $this_dir/node_modules/.bin/mocha --enable-source-maps -r $this_dir/tsconfig-paths-bootstrap.js $1
