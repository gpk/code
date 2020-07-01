import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"
import {storageAction} from "app/storage"
import {Subtree} from "./subtree"
import * as stateTransition from "./state-transition"
import {checkExhaustiveAndReturn} from "lib/util"

type HandledAction = storageAction.AddedPythonModule

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction, any>
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<Subtree, HandledAction, any> {
    return function reduce(_previous: Subtree, action: HandledAction): Subtree | [Subtree, HandledAction] {
        const previous = stateTransition.bumpUpdateCounter(_previous)

        switch (action.type) {
            case storageAction.Keys.ADDED_PYTHON_MODULE:
                return stateTransition.setNextEditorContent(
                    previous,
                    action.documentCollection.documents[action.documentCollection.documents.length - 1])
        }

        return checkExhaustiveAndReturn(action.type, previous)
    }
}


