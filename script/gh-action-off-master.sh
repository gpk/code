#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

start_time_s=$(date +%s)
build_outcome=inprogress
deploy_outcome=nodeploy

function send_chat() {
    time_to_execute=$(expr $(date +%s) - $start_time_s)

    DEV_URL=http://dev.gpkpw.com/offmaster/$GITHUB_REF \
        GITHUB_ACTION_URL=https://github.com/gpk/program-world/actions/runs/$GITHUB_RUN_ID \
        BUILD_SERIES=offmaster \
        time $this_dir/send_chat.sh $time_to_execute $build_outcome $deploy_outcome
}
trap send_chat EXIT

time $this_dir/init_ts.sh
time $this_dir/init_py.sh
time $this_dir/build.sh

if [ ! -z "$GITHUB_REF" ]; then
    mkdir ~/secrets
    echo "$PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS" >~/secrets/PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS
    export GOOGLE_APPLICATION_CREDENTIALS=~/secrets/PW_DEV_UPLOAD_GOOGLE_APPLICATION_CREDENTIALS
    time $this_dir/deploy_to_gcs.sh offmaster/$GITHUB_REF
else
    echo "GITHUB_REF unset, will not deploy to gcs"
fi

time $this_dir/deploy_to_firebase.sh
deploy_outcome=deployed

# we run tests and typecheck independently
# because these things are not prerequisites for dev deployment, off-master.

set +e

$this_dir/test_ts.sh
ts_test_exit_code=$?

$this_dir/test_py.sh
py_test_exit_code=$?

$this_dir/typecheck_py.sh
py_typecheck_exit_code=$?

set -e

if [ $ts_test_exit_code -eq 0 -a $py_test_exit_code -eq 0 -a $py_typecheck_exit_code -eq 0 ]; then
    build_outcome=ok
else
    build_outcome=fail
fi
