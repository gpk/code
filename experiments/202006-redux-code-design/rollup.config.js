import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"
import sourcemaps from "rollup-plugin-sourcemaps"

export default {
    input: "build/app/main.js",
    output: {
        format: "iife",
        name: "source",
        sourcemap: "inline",
        file: "build/bundle.js",
    },
    external: [],
    plugins: [
        replace({
            // redux access the process object, which is a nodejs thing, i.e. that browsers don't support.
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        resolve({
            preferBuiltins: false,
        }),
        commonjs(),
        sourcemaps(),
    ],
}
