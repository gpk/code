import {Action, Store} from "redux"
import * as RootModule from "app/root"
import {installPyodideStdIoActionAdapters} from "./install-pyodide-std-io-action-adapters"
import {PROJECT_PYTHON_FILES} from "./managed-by-build"
import {programRunAction} from "app/program-run"
import {model} from "app/domain"
import {writeFile} from "./pyodide-util"
import {PyodidePythonExecutionEnvironment} from "./pyodide-python-execution-environment"

declare const languagePluginLoader: Promise<any>
declare const pyodide: any


export function pyodideInit(start: number,
                            store: Store<RootModule.RootState, Action>,
                            onReadyCallback: (pythonEnv: model.PythonExecutionEnvironment) => void) {

    // for more about languagePluginLoader, see https://github.com/iodide-project/pyodide/blob/master/src/pyodide.js
    languagePluginLoader.then(() => {

        installPyodideStdIoActionAdapters(window, pyodide, store.dispatch)

        for (let relativePath in PROJECT_PYTHON_FILES) {
            writeFile(pyodide._module.FS, "/.lib/" + relativePath, PROJECT_PYTHON_FILES[relativePath])
        }

        pyodide.runPython("print('hello world, from Python')")
        pyodide.runPython(`import sys; sys.stderr.write("stderr this time - hello world, from Python\\n")`)

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
        sys.path.append("/.lib/basic")
        from append import append
        print(append("appended hello ", "world"))
        
        `)

        // console.log(pyodide)
        // console.log(pyodide.steveTest())
        console.log("a")
        console.log(pyodide.emSleep(5))
        console.log("b")

        const python = new PyodidePythonExecutionEnvironment(pyodide)

        python.runModules([{
            name: "test_module",
            content: `print("from the test module")`,
        }], 0)

        console.log(new Date().getTime() - start)

        console.log("pyodide ready")

        onReadyCallback(python)

        store.dispatch({
            type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
            newStatus: model.PythonInterpreterStatus.READY_TO_RUN,
        })
    })
}
