import {Subtree} from "./subtree"
import * as stateTransition from "./state-transition"
import * as localAction from "./action/local"
import * as exportedAction from "./action/exported"
import {selectedConversationAction} from "../selected-conversation"
import {StandardReducer} from "../../framework/subscribe-and-render"
import {ImprovedLoop} from "../../framework/improved-loop"

type HandledAction =
    localAction.PostMessageRequest |
    exportedAction.PostMessageSuccess |
    selectedConversationAction.Select

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction>
    postMessageRpc: (conversationToken: string, messageText: string) => Promise<void>
}

export function createReducer(inputs: ReducerInputs): StandardReducer<Subtree, HandledAction> {
    return function reduce(previous: Subtree, action: HandledAction) {
        switch (action.type) {
            case selectedConversationAction.Keys.SELECT:
                return stateTransition.setLoadedConversationInfo(previous, action.conversationToken)

            case localAction.Keys.POST_MESSAGE_REQUEST:
                return inputs.improvedLoop.promiseFunc(
                    stateTransition.submittingMessage(previous),
                    inputs.postMessageRpc,
                    [
                        action.conversationToken,
                        action.messageText,
                    ],
                    () => {
                        return {
                            type: exportedAction.Keys.POST_MESSAGE_SUCCESS,
                        }
                    },
                )

            case exportedAction.Keys.POST_MESSAGE_SUCCESS:
                return stateTransition.doneSubmittingMessage(previous)

            default:
                return previous
        }
    }
}

