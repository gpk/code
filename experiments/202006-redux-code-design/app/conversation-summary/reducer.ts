import {Subtree} from "./subtree"
import {StandardReducer} from "../../framework/subscribe-and-render"
import {storeAction} from "../store"
import * as stateTransition from "./state-transition"

type HandledAction = storeAction.ConversationSummaryMapUpdated

export function createReducer(): StandardReducer<Subtree, HandledAction> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, HandledAction] {
        switch (action.type) {
            case storeAction.Keys.CONVERSATION_SUMMARY_MAP_UPDATED:
                return stateTransition.conversationMapUpdated(previous, action.conversationSummaryMap)

            default:
                return previous
        }
    }
}


