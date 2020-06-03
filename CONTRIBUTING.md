

# Development Workflows

## Local dev server

This is so you can make code edits and see the site quickly
rebuild and reload. Of note, this reuses build.sh, which
is what is also used by the Github Action build.

* `brew install fswatch`
* under `src/ts`, run `npm install`
* in separate terminal tabs, from the project root:
  * run `script/watch_and_build_macos.sh` - watches files
    in the `src` directory and automatically runs 
    `script/build.sh` when files are changed.
  * run `script/launch_local_server.sh` - serves up the 
    build's `upload` directory, and auto-reloads when
    any of these files change
