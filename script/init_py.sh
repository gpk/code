#!/bin/bash -ex

this_dir=$(dirname $0)

if [ -n "$GITHUB_RUN_ID" -a -d "/home/runner/.local/lib/python3.6/site-packages/pytest" ]; then
    # we assume the proper pip dir has been restored from cache
    exit 0
fi

cd $this_dir/../src/py
pip3 install -r requirements.txt

