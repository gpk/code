#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

time $this_dir/init_ts.sh
time $this_dir/init_py.sh
time $this_dir/build.sh

if [ ! -z "$GITHUB_REF" ]; then
    mkdir ~/secrets
    echo "$PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS" > ~/secrets/PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS
    export GOOGLE_APPLICATION_CREDENTIALS=~/secrets/PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS
    time $this_dir/deploy_to_gcs.sh offmaster/$GITHUB_REF
else
    echo "GITHUB_REF unset, will not deploy to gcs"
fi

time $this_dir/deploy_to_firebase.sh
