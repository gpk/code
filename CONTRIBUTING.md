

# Development Workflows

## Init Project Workspace

Run:
* script/init_py.sh
* script/init_ts.sh

## Intellij Ultimate Setup

<p>
<i>
Intellij has good+consistent refactoring and code traversal 
functionality that take full advantage of TypeScript's 
type system and Python type hinting. It also has good 
targeted test running+debugging. We consider these capabilities 
must-haves for any non-trivial "application" codebase.  
</i>
</p>

<p>
<i>
However we are 100% open to supporting the use of other 
editors/IDE's, such as VSCode, and will work with any 
contributor to help make that IDE experience work well.
</i>
</p>

Many intellij files are already committed to the project.

Some setup is needed in cases where Intellij makes it 
hard to straightforwardly bring settings under version
control.

Perform these changes in order.

### 1. Project Python Interpreter

Location:
* Open Module Settings
* Select "Project"
* Under "Project SDK", click the "New" button
* Select "Python SDK"
* Select "Virtualenv Environment"
* Select "Existing Environment"

Set the path to bin/python3, under this project root.

### 2. Project Node Interpreter

Location:
* Open IDE Settings
* Select "Languages and Frameworks"
* Select "Node.js and NPM"

Set "Node interpreter" to bin/node under this project root.

### Mocha Test Runner Template

Location:
* Open the Run Configuration dropdown
* Edit Configurations...
* Expand "Templates"
* Select "Mocha" from the list

Settings:
* Node interpreter: project
* Mocha package: Set this to src/ts/custom-mocha, under this project root
* User interface: tdd
* Extra mocha options: --srcDir=src/ts --tscOutDir=src/ts/build/tsc --preRun=script/tsc_build.sh


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
