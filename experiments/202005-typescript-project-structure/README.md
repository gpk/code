Following [this link](https://www.typescriptlang.org/docs/handbook/project-references.html),
put together a typescript project which promotes modularity.

The ultimate goal is a project that makes small-to-medium sized modules
easy to set up and work with - and (critically) for tools like tsc
and bazel to be able to take advantage of this structure and not do "too much work". 

We want incremental compilation and test execution. Small code changes in leaf 
modules should prompt build and test work only for those modules. Modules should
be buildable in parallel (by bazel).

ts convention references:
* [typescript-book](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)
* [ts contributors](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)

## Notes

* Bias toward flatter directory structure. Eventually, 
  all sourcecode available under top-level "/src"
* Keep "replaceable units of code" separate/extractable without 
  a massive amount of work.

### Possible conventions

* kebab-case ts filenaming


### Commands / Scratch

```
npm install
node_modules/.bin/tsc -p shipping-container-types/tsconfig.json 
node_modules/.bin/tsc -p boat/tsconfig.json 
```
