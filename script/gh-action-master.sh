#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

start_time_s=$(date +%s)
build_outcome=fail
deploy_outcome=nodeploy

function send_chat() {
    time_to_execute=$(expr $(date +%s) - $start_time_s)

    DEV_URL=http://dev.gpkpw.com/offmaster/$GITHUB_REF \
        GITHUB_ACTION_URL=https://github.com/gpk/program-world/actions/runs/$GITHUB_RUN_ID \
        BUILD_SERIES=master \
        time $this_dir/send_chat.sh $time_to_execute $build_outcome $deploy_outcome
}
trap send_chat EXIT

time $this_dir/init_ts.sh
time $this_dir/init_py.sh
time $this_dir/build.sh
time $this_dir/test_py.sh
time $this_dir/test_ts.sh
time $this_dir/typecheck_py.sh
build_outcome=ok

if [ ! -z "$GITHUB_REF" ]; then
    mkdir ~/secrets
    echo "$PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS" >~/secrets/PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS
    export GOOGLE_APPLICATION_CREDENTIALS=~/secrets/PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS
    time $this_dir/deploy_to_gcs.sh master/$GITHUB_REF
else
    echo "GITHUB_REF unset, will not deploy to gcs"
fi

time $this_dir/deploy_to_firebase.sh prod
deploy_outcome=deployed
