import * as ConsoleModule from "app/console"
import * as DevModule from "app/dev"
import * as EditorModule from "app/editor"
import * as PageModule from "app/page"
import * as StorageModule from "app/storage"
import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"

interface ReducerInputs {
    improvedLoop: ImprovedLoop<any, any, any>,
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<any, any, any> {
    return inputs.improvedLoop.combineReducers({
        consoleSubtree: ConsoleModule.createReducer({
            improvedLoop: inputs.improvedLoop
        }),
        devSubtree: DevModule.createReducer({
            improvedLoop: inputs.improvedLoop
        }),
        editorSubtree: EditorModule.createReducer({
            improvedLoop: inputs.improvedLoop
        }),
        pageSubtree: PageModule.createReducer(),
        storageSubtree: StorageModule.createReducer({
            improvedLoop: inputs.improvedLoop
        }),
    })
}
