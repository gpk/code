import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"
import {Subtree} from "./subtree"
import * as stateTransition from "./state-transition"
import {programRunAction} from "app/program-run"

type HandledAction = programRunAction.WriteToStderr | programRunAction.WriteToStdout

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction, any>
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<Subtree, HandledAction, any> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, HandledAction] {
        switch (action.type) {

            case programRunAction.Keys.WRITE_TO_STDOUT:
                return stateTransition.appendToStdout(previous, action.text)

            case programRunAction.Keys.WRITE_TO_STDERR:
                return stateTransition.appendToStderr(previous, action.text)

            default:
                return previous
        }
    }
}


