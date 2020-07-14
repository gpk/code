#!/bin/bash -ex

mkdir -p ~/.pyodide-local
cd ~/.pyodide-local
curl -O https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js
curl -O https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.asm.wasm
curl -O https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.asm.data.js
curl -O https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.asm.data
curl -O https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.asm.js
curl -O https://pyodide-cdn2.iodide.io/v0.15.0/full/packages.json
