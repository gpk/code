# The Build

## Values

We put a huge premium on a *very, very fast, perfectly consistent* build. 
  * A typical application code change to a "leaf" module should take no more
    than ~30 seconds to result a build status message that includes a link to a deployed version of the code.
  * Tests runs should be consistent, and tests should pass or fail consistently *by design*. 
    Tests should be pretty fast and cheap in terms of resources required to run.
  * We are not currently on bazel but will likely switch to it in the future   

"Ability to iterate" - critically - depends on the ability to see proposed changes in running product form. 
  * Every successful branch build results in a deployment of the product, under a url named after the branch. 
  * This makes changes easy to verify, review, and critique, by others.

## Details

* Builds execute via Github Actions
* Note there are different builds: master vs off-master
* Typechecking, linting, and test runs execute in the off-master build but 
  don't block deployment (whereas in the master build, such failures will block deployment)
* A successful master build will also replace what's served by [program.world](https://program.world/)
* An off-master build whose rollup step succeeds will replace the "branch deployment", under `http://dev.gpkpw.com/`.
* Every build results in a build status message posted to the 
[#dev slack channel](https://programworldworkspace.slack.com/archives/C014SN6AV9C). 
  The message contains links to the Github Action build, and to deployment site. 
  It will also @-mention the committer, based on the github-to-slack user mapping in `slack.json`. 

# Git Practices

## off-master

* Off-master work can be in whatever git style you want. WIP commits, branches off branches - whatever seems appropriate.
* A branch should have a clear goal and a tight focus. The branch name should reflect the goal/focus. 
* Small "unrelated" code changes in a branch are acceptable, as long
  as this doesn't seem to you or others on the project to be compromising on the branch's "tight focus".
* Significant changes, especially "orthogonal" significant changes, should be done in separate branches.
* If there are multiple orthogonal changes that should land close in succession on master, they should be
  branches off branches (off branches...etc)

## master

* Work that lands on master should go typically go through PR review.
* Every aspect of the build should be green prior to merge.
* Any significant product-related change should either come with a decision doc, or clearly be satisfying 
  work laid out in an existing decision doc. 
* Merging to master is in effect a "publish" step:
  * A merge should consist of a **single commit** rebased to **master:HEAD**. 
  * This typically means that, after getting PR approval, you perform and interactive manual rebase, e.g.
    `git rebase -i master`. Please ask around for assistance if you're not used to doing this, 
    others are happy to help.
  * Rebasing-with-the-intent-to-publish before a PR is final isn't usually a good idea - 
    it's not fun to be constantly rebasing.
  * Fully browse back through all the code that will be merged - do any final cleanup. Add useful comments
    where something non-obvious is happening.
  * The final, single commit message is important. Time and thought should go into it:
    * Audience: imagine other contributors, or even yourself in 6 months, running `git blame` on a file in the
      course of debugging something, and wondering about the context in which a given line in the file was changed.
      The git commit message in which the line was changed should be easy to understand and helpful to the reader.
    * If the change is anything but trivial, please use the description area of the commit to guide the reader
      through the major changes in the commit. Product changes, refactorings, corner-case callouts, robustness
      issues, etc should all be addressed. Your intent - when/where that matters - should be clear.
    * We recommend you organize the description as a simple set of bullet points
    * Please feel free to leave in even marginally helpful "original" commit messages in the final single commit,
      that might provide helpful context/information to a future reader.

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
