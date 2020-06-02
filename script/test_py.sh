#!/bin/bash -ex

this_dir=$(dirname $0)

cd $this_dir/../src/py

exec python3 -m pytest */test_*.py
