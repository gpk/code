#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"

codegen_init_dir=$this_dir/../src/ts/build/codegen/init
python3 $this_dir/compose_managed_by_build_ts_source_file.py $this_dir/../src/py > /tmp/managed-by-build.ts.new

should_compile=yes

if [ -f $codegen_init_dir/managed-by-build.ts ]; then
    set +e
    diff $codegen_init_dir/managed-by-build.ts /tmp/managed-by-build.ts.new
    if [ "0" = "$?" ]; then
        echo "managed-by-build.ts matches, skip compile"
        should_compile=no
    fi
    set -e
fi

mkdir -p $codegen_init_dir
echo '{"extends": "../../../tsconfig-core.json"}' > $codegen_init_dir/tsconfig.json
mv /tmp/managed-by-build.ts.new $codegen_init_dir/managed-by-build.ts

if [ $should_compile = "yes" ]; then
    time $this_dir/../src/ts/node_modules/.bin/tsc --incremental -p $codegen_init_dir/tsconfig.json
    cp $codegen_init_dir/managed-by-build.* $this_dir/../src/ts/build/tsc/init/src/
fi
