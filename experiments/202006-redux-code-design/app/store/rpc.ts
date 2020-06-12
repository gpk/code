import {AddMessage, ChangeConversationSummary} from "./subtree"

export type FetchNextConversationSummariesRpc = (startIndex: number) => Promise<ChangeConversationSummary[]>
export type FetchNextMessagesRpc = (startIndex: number) => Promise<AddMessage[]>
