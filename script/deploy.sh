#!/bin/bash -ex

this_dir=$(dirname $0)

file $this_dir/../src/ts/build/upload/index.html
file $this_dir/../src/ts/build/upload/bundle.js

cd $this_dir/../site
rm -rf upload
mv ../src/ts/build/upload ./

if [ "$1" == "prod" ]; then
    ../src/ts/node_modules/.bin/firebase deploy --project gpk-program-world --only hosting:prod
else
    ../src/ts/node_modules/.bin/firebase deploy --project gpk-program-world --only hosting:dev
fi
