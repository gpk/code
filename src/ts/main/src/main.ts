import {prepend} from "basic/prepend"
import {PROJECT_PYTHON_FILES} from "./managed-by-build"
import {CssScope, reduxLoopBasedImprovedLoop, ShadowRootContext} from "app/framework"
import * as RootModule from "app/root"
import {InvokeSubscriptionFunction} from "../../app/framework/src/subscriber"
import {Action, createStore, Store} from "redux"
import {install, StoreCreator} from "redux-loop"
import {pageAction} from "app/page"
import {installCtlShiftKeyComboActionAdapter} from "./install-ctl-shift-key-combo-action-adapter"
import {installDragDropActionAdapaters} from "./install-drag-drop-action-adapters"
import {installEscapeKeyActionAdapter} from "./install-escape-key-action-adapter"
import {parseLocationHash} from "./parse-location-hash"
import {setLocationHash} from "./set-location-hash"
import {pyodideInit} from "./pyodide-init"
import {SwappablePythonExecutionEnvironment} from "./swappable-python-execution-environment"

function main() {
    const start = (<any>window).start
    console.log(new Date().getTime() - start)

    console.log(prepend("hello ", "world, from TypeScript"))
    console.log(PROJECT_PYTHON_FILES)

    document.addEventListener("DOMContentLoaded", function () {

        const swappablePython = new SwappablePythonExecutionEnvironment(undefined)

        const enhancedCreateStore = createStore as StoreCreator
        const store: Store<RootModule.RootState, Action> =
            enhancedCreateStore(
                RootModule.createReducer({
                    improvedLoop: reduxLoopBasedImprovedLoop,
                    python: swappablePython
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

        pyodideInit(start, store, (python => {
            swappablePython.actualPython = python
        }))
    })
}

(<any>window).main = main
