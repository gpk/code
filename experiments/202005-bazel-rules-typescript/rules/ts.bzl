load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@npm//mocha:index.bzl", "mocha_test")

def ts_types(name=None, srcs=None, deps=[]):
    if name == None:
        name = "ts_types"

    if srcs == None:
        srcs = native.glob(["**/*.d.ts"])

    ts_library(
        name = name,
        srcs = srcs,
        deps=deps
    )

def ts_lib(name=None, srcs=None, deps=[]):
    if name == None:
        name = "ts_lib"

    if srcs == None:
        srcs = native.glob(["src/**/*.ts"])

    ts_library(
        name = name,
        srcs = srcs,
        deps=deps
    )

def ts_test(name=None, data=[]):
    if name == None:
        name = "ts_test"

    data = [":ts_lib"] + native.glob(["test/**/*-test.ts"]) + data

    mocha_test(
        name = name,
        args = [native.package_name() + "/test/**/*-test.ts"],
        data = data,
    )
