import * as EditorModule from "app/editor"
import * as StorageModule from "app/storage"
import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"

interface ReducerInputs {
    improvedLoop: ImprovedLoop<any, any, any>,
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<any, any, any> {
    return inputs.improvedLoop.combineReducers({
        editorSubtree: EditorModule.createReducer({
            improvedLoop: inputs.improvedLoop
        }),
        storageSubtree: StorageModule.createReducer({
            improvedLoop: inputs.improvedLoop
        }),
    })
}
