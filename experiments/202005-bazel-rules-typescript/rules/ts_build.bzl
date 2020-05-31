def ts_build(name=None, root_tsconfig=None, srcs=[]):
    native.genrule(
        name=name,
        cmd=" ".join([
            "$(location @npm//typescript/bin:tsc)",
            "--build",
            "$(location %s)" % root_tsconfig,
            "--dry"
#            "outdir=$$(dirname $@);",
#            "$(location @com_google_protobuf//:protoc)",
#            "--plugin=protoc-gen-ts_interfaces=$(location @node_modules_archive//:node_modules/protoc-ts-interfaces/bin/protoc-gen-ts_interfaces.js)",
#            "-I . $(SRCS)",
#            "--ts_interfaces_out=$$outdir",
        ]),
        outs=["foo.ts"],
        srcs=srcs,
        tools=[
            "@npm//typescript/bin:tsc",
            root_tsconfig
#            "@com_google_protobuf//:protoc",
#            "@node_modules_archive//:node_modules/protoc-ts-interfaces/bin/protoc-gen-ts_interfaces.js",
#            "//:project_node_executable",
        ],
    )
