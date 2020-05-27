exports_files(["tsconfig.json"], visibility = ["//visibility:public"])

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "bundle",
    deps = [
        "//init:js"
    ],
    entry_point = "//init:js",
#    tsconfig = ":tsconfig.json"
)
