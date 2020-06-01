#!/bin/bash -ex

this_dir=$(dirname $0)

time $this_dir/init_ts.sh
time $this_dir/init_py.sh
time $this_dir/build.sh
time $this_dir/deploy.sh
