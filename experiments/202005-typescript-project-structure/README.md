Following [this link](https://www.typescriptlang.org/docs/handbook/project-references.html),
put together a typescript project which promotes modularity.

The ultimate goal is a project that makes small-to-medium sized modules
easy to set up and work with - and (critically) for tools like tsc
and bazel to be able to take advantage of this structure and not do "too much work". 

We want incremental compilation and test execution. Small code changes in leaf 
modules should prompt build and test work only for those modules. Modules should
be buildable in parallel (by bazel).
