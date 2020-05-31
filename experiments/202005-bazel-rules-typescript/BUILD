exports_files(["tsconfig.json"], visibility = ["//visibility:public"])

load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")

rollup_bundle(
    name = "bundle",
    deps = [
        "//init:js"
    ],
    entry_point = "//init:js",
)

load("//rules:ts_build.bzl", "ts_build")

ts_build(
    name="ts_build",
    root_tsconfig=":tsconfig.json",
    srcs=[
        "//init:src/init.ts",
        "//boat:src/boat.ts",
        "//shipping-container:src/container.ts",
        "//truck:test/simple-test.ts",
        "//truck:test/truck-test.ts",
        "//truck:src/truck.ts",

        "//init:tsconfig.json",
        "//boat:tsconfig.json",
        "//shipping-container:tsconfig.json",
        "//truck:tsconfig.json"
    ]
)
