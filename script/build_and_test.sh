#!/bin/bash -x

this_dir=$(dirname $0)

set -e
$this_dir/build.sh

set +e
$this_dir/typecheck_py.sh
$this_dir/test_ts.sh
$this_dir/test_py.sh

