#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

bin_dir=$(dirname $0)/../bin

test -d $bin_dir || mkdir $bin_dir


# not really ts-related...
if [ $(uname) = "Darwin" ]; then
    if [ ! -f /usr/local/bin/realpath ]; then
        brew install coreutils
    fi
    ln -sf /usr/local/bin/realpath $bin_dir/realpath
fi

if [ $(uname) = "Linux" ]; then
    ln -sf /usr/bin/realpath $bin_dir/realpath
fi



ln -sf /usr/local/bin/node $bin_dir/node
ln -sf /usr/local/bin/npm $bin_dir/npm

# in the build, the cache is keyed on a hash of package-lock.json
if [ ! -d "$this_dir/../src/ts/node_modules" -o $(uname) = "Darwin" ]; then
    PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"
    cd $this_dir/../src/ts
    time ../../bin/npm install
fi

