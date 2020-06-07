*custom-mocha is unusual and deserves explanation*

We want mocha test-running - including targeted test-running
and -debugging via IDE.

Intellij's mocha runner expects to find
* a `_mocha` file under a directory structure that looks like
  the mocha npm module
* a package.json in some ancestor directory

Please see code and comments in `_mocha` for more detail.

