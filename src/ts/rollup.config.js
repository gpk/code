import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import replace from "rollup-plugin-replace"
import typescriptPaths from "rollup-plugin-typescript-paths"
import sourcemaps from "rollup-plugin-sourcemaps"

export default {
    input: "build/tsc/main/src/main.js",
    output: {
        format: "iife",
        name: "source",
        sourcemap: "inline",
        file: "build/rollup/bundle.js",
    },
    external: [],
    plugins: [
        replace({
            // redux access the process object, which is a nodejs thing, i.e. that browsers don't support.
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        resolve({
            preferBuiltins: false,
        }),
        commonjs(),
        typescriptPaths({
            tsConfigPath: "tsconfig-base.json",
        }),
        sourcemaps(),
    ],
}
