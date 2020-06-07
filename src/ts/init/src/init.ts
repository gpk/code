import {prepend} from "basic/prepend";
import {PROJECT_PYTHON_FILES} from "init/managed-by-build"

declare const languagePluginLoader: Promise<any>
declare const pyodide: any

const start = (<any>window).start
console.log(new Date().getTime() - start)

console.log(prepend("hello ", "world, from TypeScript"))
console.log(PROJECT_PYTHON_FILES)


document.addEventListener("DOMContentLoaded", function () {
    languagePluginLoader.then(() => {

        const pathsCreated: { [key: string]: boolean } = {}
        pyodide._module.FS.mkdir("/py")

        for (let relativePath in PROJECT_PYTHON_FILES) {
            const relativeDirectory = relativePath.substring(0, relativePath.lastIndexOf("/"))

            const parts = relativeDirectory.split("/")

            let dir = "/py"
            parts.forEach((part) => {
                dir = dir + "/" + part
                if (!pathsCreated[dir]) {
                    pyodide._module.FS.mkdir(dir)
                    pathsCreated[dir] = true
                }
            })

            pyodide._module.FS.writeFile("/py/" + relativePath, PROJECT_PYTHON_FILES[relativePath])
        }


        pyodide.runPython("print('hello world, from Python')");

        console.log(new Date().getTime() - start)

        pyodide.runPython(`
            import ast
            print(ast.parse("print('hello world, from Python AST')"))

            import sys
            print("Python version")
            print (sys.version)
            print("Version info.")
            print (sys.version_info)

            # make use of a function that comes from python code loaded is from the surrounding project
            sys.path.append("/py/basic")
            from append import append
            print(append("appended hello ", "world"))
            `);

        console.log(new Date().getTime() - start)
    })
})
