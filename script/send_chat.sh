#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="$($this_dir/../bin/realpath $this_dir/../bin):/usr/bin:/bin:/usr/sbin:/sbin"

NODE_PATH=$this_dir/../src/ts/node_modules node $this_dir/send-slack-notification.js $this_dir/../slack.json $1 $2 $3
