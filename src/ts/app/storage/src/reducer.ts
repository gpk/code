import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"
import {DispatchedAction, storageAction} from "./action"
import {Subtree} from "./subtree"
import * as stateTransition from "./state-transition"
import {checkExhaustiveAndReturn} from "lib/util"

type HandledAction =
    storageAction.ReceiveDroppedFile

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction, DispatchedAction>
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<Subtree, HandledAction, DispatchedAction> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, DispatchedAction] {
        switch (action.type) {

            case storageAction.Keys.RECEIVE_DROPPED_FILE:
                const nextState = stateTransition.fileDropped(previous, action.name, action.content)

                return inputs.improvedLoop.action(
                    nextState,
                    {
                        type: storageAction.Keys.ADDED_PYTHON_MODULE,
                        documentCollection: nextState.documentCollection
                    }
                )

        }

        return checkExhaustiveAndReturn(action.type, previous)
    }
}


