import * as ConversationSummaryModule from "../conversation-summary"
import * as SelectedConversationModule from "../selected-conversation"
import * as NewMessageEntryModule from "../new-message-entry"
import * as StoreModule from "../store"
import {StandardReducer} from "../../framework/subscribe-and-render"
import {ImprovedLoop} from "../../framework/improved-loop"
import {FetchNextConversationSummariesRpc, FetchNextMessagesRpc} from "../store/rpc"

interface ReducerInputs {
    improvedLoop: ImprovedLoop<any, any>,
    postMessageRpc: (conversationToken: string, message: string) => Promise<void>,
    fetchNextMessagesRpc: FetchNextMessagesRpc
    fetchNextConversationSummariesRpc: FetchNextConversationSummariesRpc
}

export function createReducer(inputs: ReducerInputs): StandardReducer<any, any> {
    return inputs.improvedLoop.combineReducers({
        conversationSummarySubtree: ConversationSummaryModule.createReducer(),
        selectedConversationSubtree: SelectedConversationModule.createReducer(),
        newMessageEntrySubtree: NewMessageEntryModule.createReducer({
            improvedLoop: inputs.improvedLoop,
            postMessageRpc: inputs.postMessageRpc,
        }),
        storeSubtree: StoreModule.createReducer({
            improvedLoop: inputs.improvedLoop,
            fetchNextConversationSummariesRpc: inputs.fetchNextConversationSummariesRpc,
            fetchNextMessagesRpc: inputs.fetchNextMessagesRpc,
        }),
    })
}
