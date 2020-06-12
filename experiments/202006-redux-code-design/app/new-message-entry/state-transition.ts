import {ConversationStatus, MessageSubmitStatus, Subtree} from "./subtree"
import produce from "immer"


export function init(): Subtree {
    return {
        messageSubmitStatus: MessageSubmitStatus.NONE,
        currentConversationInfo: {
            status: ConversationStatus.INIT
        }
    }
}

export function submittingMessage(previous: Subtree): Subtree {
    return produce(previous, draft => {
        draft.messageSubmitStatus = MessageSubmitStatus.SUBMITTING
    })
}

export function doneSubmittingMessage(previous: Subtree): Subtree {
    return produce(previous, draft => {
        draft.messageSubmitStatus = MessageSubmitStatus.NONE
    })
}

export function setLoadedConversationInfo(previous: Subtree, conversationToken: string): Subtree {
    return produce(previous, draft => {
        draft.currentConversationInfo = {
            status: ConversationStatus.LOADED,
            conversationToken: conversationToken
        }
    })
}
