import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"
import {storageAction} from "app/storage"
import {Subtree} from "./subtree"
import * as stateTransition from "./state-transition"
import {checkExhaustiveAndReturn} from "lib/util"
import {programRunAction} from "app/program-run"
import {localAction} from "./action"


type HandledAction =
    storageAction.AddedPythonModule |
    programRunAction.InterpreterStatusChanged |
    localAction.ChangePythonModuleInEditor

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction, any>
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<Subtree, HandledAction, any> {
    return function reduce(_previous: Subtree, action: HandledAction): Subtree | [Subtree, any] {
        const previous = stateTransition.bumpUpdateCounter(_previous)

        switch (action.type) {

            case localAction.Keys.CHANGE_PYTHON_MODULE_IN_EDITOR:
                return stateTransition.setNextEditorContentToPythonModuleIndex(previous, action.pythonModuleIndex)

            case storageAction.Keys.ADDED_PYTHON_MODULE:
                return stateTransition.setNextEditorContent(previous, action.documentCollection)

            case programRunAction.Keys.INTERPRETER_STATUS_CHANGED:
                return stateTransition.updateForInterpreterStatusChange(previous, action.newStatus)
        }

        return checkExhaustiveAndReturn(action, previous)
    }
}


