import {prepend} from "basic/prepend"
import {PROJECT_PYTHON_FILES} from "./managed-by-build"
import {CssScope, reduxLoopBasedImprovedLoop, ShadowRootContext} from "app/framework"
import * as RootModule from "app/root"
import {InvokeSubscriptionFunction} from "../../app/framework/src/subscriber"
import {Action, createStore, Store} from "redux"
import {install, StoreCreator} from "redux-loop"
import {storageAction} from "app/storage"

declare const languagePluginLoader: Promise<any>
declare const pyodide: any

function main() {
    const start = (<any>window).start
    console.log(new Date().getTime() - start)

    console.log(prepend("hello ", "world, from TypeScript"))
    console.log(PROJECT_PYTHON_FILES)

    const enhancedCreateStore = createStore as StoreCreator
    const store: Store<RootModule.RootState, Action> =
        enhancedCreateStore(
            RootModule.createReducer({
                improvedLoop: reduxLoopBasedImprovedLoop,
            }),
            RootModule.initRootState(),
            install())


    document.addEventListener("DOMContentLoaded", function () {

        document.body.ondragover = (e) => {
            e.preventDefault()
            e.stopPropagation()
        }

        document.body.ondrop = (e) => {
            e.preventDefault()
            e.stopPropagation()

            //There's a lot that needs to be done to:
            // - handle only file types we actually support
            // - handle multiple files
            // - put in place other defensiveness like checking files sizes and such
            //
            // This functionality should be considered prototype/demonstration-quality for now.

            const fileList = e.dataTransfer!.files
            for (let i = 0; i < fileList.length; i++) {
                const reader = new FileReader()
                reader.addEventListener('load', (event) => {
                    store.dispatch({
                        type: storageAction.Keys.RECEIVE_DROPPED_FILE,
                        name: fileList[i].name,
                        content: (<string>event.target!.result)
                    })
                })
                reader.readAsText(fileList[i])
            }
        }


        const shadowRootContext = new ShadowRootContext(document.body.attachShadow({mode: "open"}), CssScope.ROOT)
        shadowRootContext.render(RootModule.render())

        RootModule.subscribe(
            (subscriberFunction: InvokeSubscriptionFunction<RootModule.RootState>,
             subscriberShadowContext: ShadowRootContext) => {
                store.subscribe(() => {
                    subscriberFunction(store.getState(), store.dispatch, shadowRootContext)
                })
            }, shadowRootContext)

        //TODO: dispatch init action

        // for more about languagePluginLoader, see https://github.com/iodide-project/pyodide/blob/master/src/pyodide.js
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


            pyodide.runPython("print('hello world, from Python')")

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
        })
    })
}

(<any>window).main = main
