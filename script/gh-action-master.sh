#!/bin/bash -ex

this_dir=$(dirname $0)

time $this_dir/init.sh
time $this_dir/build.sh
time $this_dir/test.sh
time $this_dir/deploy.sh prod
