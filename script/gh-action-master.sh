#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

time $this_dir/init_ts.sh
time $this_dir/init_py.sh
time $this_dir/build.sh
time $this_dir/test_py.sh
time $this_dir/test_ts.sh
time $this_dir/typecheck_py.sh
time $this_dir/deploy.sh prod
