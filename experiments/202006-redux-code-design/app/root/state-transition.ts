import {RootState} from "./root-state"

import * as ConversationSummaryModule from "../conversation-summary"
import * as SelectedConversationModule from "../selected-conversation"
import * as NewMessageEntryModule from "../new-message-entry"
import * as StoreModule from "../store"


export function init(): RootState {
    return {
        conversationSummarySubtree: ConversationSummaryModule.initState(),
        selectedConversationSubtree: SelectedConversationModule.initState(),
        newMessageEntrySubtree: NewMessageEntryModule.initState(),
        storeSubtree: StoreModule.initState()
    }
}
