import * as ConversationSummaryModule from "../conversation-summary"
import * as SelectedConversationModule from "../selected-conversation"
import * as NewMessageEntryModule from "../new-message-entry"
import * as StoreModule from "../store"


export interface RootState {
    conversationSummarySubtree: ConversationSummaryModule.Subtree,
    selectedConversationSubtree: SelectedConversationModule.Subtree,
    newMessageEntrySubtree: NewMessageEntryModule.Subtree,
    storeSubtree: StoreModule.Subtree
}
