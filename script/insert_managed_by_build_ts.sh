#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin:$($this_dir/../bin/realpath $this_dir/../bin)"

codegen_main_dir=$this_dir/../src/ts/build/codegen/main
python3 $this_dir/compose_managed_by_build_ts_source_file.py $this_dir/../src/py > /tmp/managed-by-build.ts.new

should_compile=yes

if [ -f $codegen_main_dir/managed-by-build.ts -o !-f $this_dir/../src/ts/build/tsc/main/src/managed-by-build.js ]; then
    set +e
    diff $codegen_main_dir/managed-by-build.ts /tmp/managed-by-build.ts.new
    if [ "0" = "$?" ]; then
        echo "managed-by-build.ts matches, skip compile"
        should_compile=no
    fi
    set -e
fi

mkdir -p $codegen_main_dir
echo '{"extends": "../../../tsconfig-core.json"}' > $codegen_main_dir/tsconfig.json
mv /tmp/managed-by-build.ts.new $codegen_main_dir/managed-by-build.ts

if [ $should_compile = "yes" ]; then
    time $this_dir/../src/ts/node_modules/.bin/tsc --incremental -p $codegen_main_dir/tsconfig.json
    cp $codegen_main_dir/managed-by-build.* $this_dir/../src/ts/build/tsc/main/src/
fi
