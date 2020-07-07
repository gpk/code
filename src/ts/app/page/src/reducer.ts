import {ImprovedLoopReducer} from "app/framework"
import {Subtree} from "./subtree"
import * as stateTransition from "./state-transition"
import {checkExhaustiveAndReturn} from "lib/util"
import {pageAction} from "./action"

type HandledAction =
    pageAction.Init |
    pageAction.ChangeDevInLocationHash

export function createReducer(): ImprovedLoopReducer<Subtree, HandledAction, any> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, any] {
        switch (action.type) {

            case pageAction.Keys.INIT:
                console.log(action.type)
                return previous

            case pageAction.Keys.CHANGE_DEV_IN_LOCATION_HASH:
                return stateTransition.locationHashDevChanged(previous, action.dev)

        }

        return checkExhaustiveAndReturn(action, previous)
    }
}


