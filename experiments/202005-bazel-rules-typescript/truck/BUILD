package(default_visibility = ["//:__subpackages__"])

load("//rules:ts.bzl", "ts_lib", "ts_test")

ts_lib(deps = ["//shipping-container:ts_lib"])
ts_test(deps = [":ts_lib"])
