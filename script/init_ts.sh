#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

bin_dir=$(dirname $0)/../bin

test -d $bin_dir || mkdir $bin_dir
ln -sf /usr/local/bin/node $bin_dir/node
ln -sf /usr/local/bin/npm $bin_dir/npm

# in the build, the cache is keyed on a hash of package-lock.json
if [ ! -d "$this_dir/../src/ts/node_modules" -o $(uname) = "Darwin" ]; then
    cd $this_dir/../src/ts
    time ../../bin/npm install
fi

