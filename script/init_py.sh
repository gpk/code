#!/bin/bash -ex

this_dir=$(dirname $0)
PATH="/usr/bin:/bin:/usr/sbin:/sbin"

bin_dir=$(dirname $0)/../bin

test -d $bin_dir || mkdir $bin_dir





if [ ! -f "$bin_dir/python3" -a $(uname) = "Darwin" ]; then
    brew install pyenv || true
    pyenv install -s 3.7.4

    pyenv_python_path=$(realpath ~/.pyenv/versions/3.7.4)
    ln -sf $pyenv_python_path/bin/python3 $bin_dir/python3
    ln -sf $pyenv_python_path/bin/pip3 $bin_dir/pip3
fi

if [ $(uname) = "Linux" ]; then
    # pyodide is py 3.7.4, but 3.6 is available on gh actions ubuntu.
    # This works out ok - at the moment there's no need to tightly manage
    # this interpreter.
    ln -sf /home/runner/.local/lib/python3.6/bin/python3 $bin_dir/python3
    ln -sf /home/runner/.local/lib/python3.6/bin/pip3 $bin_dir/pip3
fi

# in the build, the cache is keyed on a hash of requirements.txt
if [ ! -d "/home/runner/.local/lib/python3.6/site-packages/pytest" -o $(uname) = "Darwin" ]; then
    $bin_dir/pip3 install -r $this_dir/../src/py/requirements.txt
fi

if [ $(uname) = "Darwin" ]; then
    pyenv_python_path=$(realpath ~/.pyenv/versions/3.7.4)
    ln -sf $pyenv_python_path/bin/mypy $bin_dir/mypy
fi

if [ $(uname) = "Linux" ]; then
    ln -sf /home/runner/.local/bin/mypy $bin_dir/mypy
fi
