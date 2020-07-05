import {prepend} from "basic/prepend"
import {PROJECT_PYTHON_FILES} from "./managed-by-build"
import {CssScope, reduxLoopBasedImprovedLoop, ShadowRootContext} from "app/framework"
import * as RootModule from "app/root"
import {InvokeSubscriptionFunction} from "../../app/framework/src/subscriber"
import {Action, createStore, Store} from "redux"
import {install, StoreCreator} from "redux-loop"
import {programRunAction} from "app/program-run"
import {model} from "app/domain"
import {pageAction} from "app/page"
import {installPyodideStdoutputActionAdapters} from "./install-pyodide-stdoutput-action-adapters"
import {installCtlShiftKeyComboActionAdapter} from "./install-ctl-shift-key-combo-action-adapter"
import {installDragDropActionAdapaters} from "./install-drag-drop-action-adapters"
import {installEscapeKeyActionAdapter} from "./install-escape-key-action-adapter"
import {parseLocationHash} from "./parse-location-hash"
import {setLocationHash} from "./set-location-hash"

declare const languagePluginLoader: Promise<any>
declare const pyodide: any

function main() {
    const start = (<any>window).start
    console.log(new Date().getTime() - start)

    console.log(prepend("hello ", "world, from TypeScript"))
    console.log(PROJECT_PYTHON_FILES)

    document.addEventListener("DOMContentLoaded", function () {

        const enhancedCreateStore = createStore as StoreCreator
        const store: Store<RootModule.RootState, Action> =
            enhancedCreateStore(
                RootModule.createReducer({
                    improvedLoop: reduxLoopBasedImprovedLoop,
                }),
                RootModule.initRootState(),
                install())

        const shadowRootContext = new ShadowRootContext(document.body.attachShadow({mode: "open"}), CssScope.ROOT)
        shadowRootContext.render(RootModule.render())

        RootModule.subscribe(
            (subscriberFunction: InvokeSubscriptionFunction<RootModule.RootState>,
             subscriberShadowContext: ShadowRootContext) => {
                store.subscribe(() => {
                    subscriberFunction(store.getState(), store.dispatch, subscriberShadowContext)
                })
            }, shadowRootContext,
            setLocationHash)

        store.dispatch<pageAction.Init>({
            type: pageAction.Keys.INIT,
            locationHash: parseLocationHash(location.hash)
        })

        installCtlShiftKeyComboActionAdapter(document, store.dispatch)
        installEscapeKeyActionAdapter(document, store.dispatch)
        installDragDropActionAdapaters(document, store.dispatch)

        // for more about languagePluginLoader, see https://github.com/iodide-project/pyodide/blob/master/src/pyodide.js
        languagePluginLoader.then(() => {

            installPyodideStdoutputActionAdapters(window, pyodide, store.dispatch)

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
            sys.path.append("/py/basic")
            from append import append
            print(append("appended hello ", "world"))
            `)

            console.log(new Date().getTime() - start)

            store.dispatch({
                type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                newStatus: model.PythonInterpreterStatus.READY_TO_RUN
            })
        })
    })
}

(<any>window).main = main
