import {model} from "../domain"

export interface CurrentConversation {
    conversationToken?: string
    messages: model.Message[]
}

export interface Subtree {
    messageListMap: Map<string, model.Message[]>,
    currentConversation: CurrentConversation
}
