import {Subtree} from "./subtree"
import produce from "immer"
import {model} from "../domain"


export function init(): Subtree {
    return {
        messageListMap: new Map(),
        currentConversation: {
            messages: []
        }
    }
}

export function conversationSelected(previous: Subtree, conversationToken: string): Subtree {
    return produce(previous, draft => {
        draft.currentConversation = {
            conversationToken: conversationToken,
            messages: previous.messageListMap.get(conversationToken) || []
        }
    })
}

export function messageListMapUpdated(previous: Subtree, messageListMap: Map<string, model.Message[]>): Subtree {
    return conversationSelected(
        produce(previous, draft => {
            draft.messageListMap = messageListMap
        }), previous.currentConversation.conversationToken!)
}

