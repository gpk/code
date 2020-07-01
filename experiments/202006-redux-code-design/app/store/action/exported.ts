import {Action} from "redux"
import {model} from "../../domain"

export const enum Keys {
    CONVERSATION_SUMMARY_MAP_UPDATED = "store/CONVERSATION_SUMMARY_MAP_UPDATED",
    MESSAGE_LIST_MAP_UPDATED = "store/MESSAGE_LIST_MAP_UPDATED"
}

export interface ConversationSummaryMapUpdated extends Action<Keys> {
    type: Keys.CONVERSATION_SUMMARY_MAP_UPDATED,
    conversationSummaryMap: Map<string, model.ConversationSummary>
}

export interface MessageListMapUpdated extends Action<Keys> {
    type: Keys.MESSAGE_LIST_MAP_UPDATED,
    messageListMap: Map<string, model.Message[]>
}
