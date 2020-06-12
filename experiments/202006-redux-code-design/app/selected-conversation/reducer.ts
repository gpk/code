import {Subtree} from "./subtree"
import {StandardReducer} from "../../framework/subscribe-and-render"
import {selectedConversationAction} from "./index"
import * as stateTransition from "./state-transition"
import * as exportedAction from "./action/exported"
import {storeAction} from "../store"

type HandledAction = exportedAction.Select | storeAction.MessageListMapUpdated

export function createReducer(): StandardReducer<Subtree, HandledAction> {
    return function reduce(previous: Subtree, action: HandledAction) {
        switch (action.type) {
            case selectedConversationAction.Keys.SELECT:
                return stateTransition.conversationSelected(previous, action.conversationToken)

            // State is distributed from the "store" module to the user-interaction modules
            // by using redux as a pub-sub system.
            // We are very explicit about "exported" vs "local" actions, per module, in part
            // for this reason.
            // The virtue of this approach is it's very "redux-friendly" - it's easy to handle
            // module cross-communication using standard redux actions, unit tests for the emmission
            // and consumption of said actions, and so on. It's easy to read a reducer and see
            // what "external" actions it handles by looking at the action key namespace.
            // The risk here is that this results in a web of cross-module pub-sub calls that
            // are ultimately impossible to reason about. This must be tightly policed. There
            // should be general principles developed over time about what modules may publish
            // and what they may consume, and from/to where.
            case storeAction.Keys.MESSAGE_LIST_MAP_UPDATED:
                return stateTransition.messageListMapUpdated(previous, action.messageListMap)

            default:
                return previous
        }
    }
}

