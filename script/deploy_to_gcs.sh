#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"

file $this_dir/../src/ts/build/upload/index.html
file $this_dir/../src/ts/build/upload/bundle.js

if [ -w "$1" ]; then
    echo "Must specify subdir"
    exit 1
fi

if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo "Must specify google application credentials file env var"
    exit 1
fi

if [ ! -f "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo "Google application credentials file must be present on disk"
    exit 1
fi

mkdir -p ~/upload_to_gcs/$1
cp $this_dir/../src/ts/build/upload/* ~/upload_to_gcs/$1/

NODE_PATH=$this_dir/../src/ts/node_modules node $this_dir/upload-to-gcs.js ~/upload_to_gcs
