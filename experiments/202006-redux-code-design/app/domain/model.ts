// In a "classic" client/server application, these interfaces would be defined in proto IDL
// and shared between server and client (so, this file would be gen'd by protoc + a protoc typescript plugin)

export interface ConversationSummary {
    conversationToken: string
    name?: string,
    latestMessage?: Message
}

export interface Message {
    text: string
    from: string
    epochTimeMs: number
}

export enum RecordDerivedMapType {
    CONVERSATION_SUMMARY_MAP,
    MESSAGE_LIST_MAP
}
