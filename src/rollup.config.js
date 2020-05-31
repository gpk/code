import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import typescriptPaths from "rollup-plugin-typescript-paths"
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  input: 'build/tsc/init/src/init.js',
  output: {
    format: 'iife',
    name: 'source',
    sourcemap: "inline",
    file: "build/rollup/bundle.js"
  },
  external: [],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    typescriptPaths({
      tsConfigPath: "tsconfig-base.json",
    }),
    sourcemaps()
  ]
}
