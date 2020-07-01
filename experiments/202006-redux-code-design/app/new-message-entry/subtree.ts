export enum MessageSubmitStatus {
    NONE,
    SUBMITTING
}

export enum ConversationStatus {
    INIT,
    LOADED
}

export interface CurrentConversationInfo {
    status: ConversationStatus
    conversationToken?: string
}

export interface Subtree {
    currentConversationInfo: CurrentConversationInfo
    messageSubmitStatus: MessageSubmitStatus
}
