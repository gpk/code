import {AddMessage, ChangeConversationSummary, Subtree} from "./subtree"
import {StandardReducer} from "../../framework/subscribe-and-render"
import * as localAction from "./action/local"
import {newMessageEntryAction} from "../new-message-entry"
import {pageAction} from "../page"
import {ImprovedLoop} from "../../framework/improved-loop"
import {FetchNextConversationSummariesRpc, FetchNextMessagesRpc} from "./rpc"
import * as stateTransition from "./state-transition"
import {delay} from "../../lib/delay"
import {syncDomainFromRecords} from "./sync-domain-from-records"

type HandledAction =

    localAction.DelayAndFetchNextConversationSummaryRecordsAgain |
    localAction.FetchNextConversationSummaryRecordsRequest |
    localAction.FetchNextConversationSummaryRecordsSuccess |

    localAction.DelayAndFetchNextMessageRecordsAgain |
    localAction.FetchNextMessageRecordsRequest |
    localAction.FetchNextMessageRecordsSuccess |

    newMessageEntryAction.PostMessageSuccess |
    pageAction.Init


export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction>
    fetchNextMessagesRpc: FetchNextMessagesRpc
    fetchNextConversationSummariesRpc: FetchNextConversationSummariesRpc
}

export function createReducer(inputs: ReducerInputs): StandardReducer<Subtree, HandledAction> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, HandledAction] {
        switch (action.type) {

            case pageAction.Keys.INIT:
                return inputs.improvedLoop.list(previous,
                    {type: localAction.Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST},
                    {type: localAction.Keys.FETCH_NEXT_MESSAGE_RECORDS_REQUEST})

            case newMessageEntryAction.Keys.POST_MESSAGE_SUCCESS:
                return inputs.improvedLoop.list(previous,
                    {type: localAction.Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST},
                    {type: localAction.Keys.FETCH_NEXT_MESSAGE_RECORDS_REQUEST})

            case localAction.Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST:
                if (!action.fetchCount ||
                    action.fetchCount == previous.conversationSummaryFetchCount) {
                    return inputs.improvedLoop.promiseFunc(
                        stateTransition.fetchingConversationSummaryRecords(previous),
                        inputs.fetchNextConversationSummariesRpc,
                        [previous.conversationSummaryRecords.records.length],
                        (records: ChangeConversationSummary[]): localAction.FetchNextConversationSummaryRecordsSuccess => {
                            return {
                                type: localAction.Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_SUCCESS,
                                records: records,
                                startIndex: previous.conversationSummaryRecords.records.length
                            }
                        })
                } else {
                    return previous
                }


            case localAction.Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_SUCCESS:

                // Every "write" needs to be accompanied by a "syncDomainFromRecords"
                // then dispatch the actions that result from syncDomainFromRecords.
                // Then do whatever follow-up action needs to be done, specific to this reducer code.
                // The code and logic here is a little unfortunate.

                const [cs_newState, cs_actions] =
                    syncDomainFromRecords(
                        stateTransition.appendConversationSummaryRecords(previous, action.startIndex, action.records))

                return inputs.improvedLoop.list.apply(null,
                    (<any[]>[cs_newState])
                        .concat(cs_actions)
                        .concat([{type: localAction.Keys.DELAY_AND_FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_AGAIN}]))

            case localAction.Keys.DELAY_AND_FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_AGAIN:
                return inputs.improvedLoop.promiseFunc(
                    previous,
                    delay,
                    [3000],
                    () => {
                        return {
                            type: localAction.Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST,
                            fetchCount: previous.conversationSummaryFetchCount
                        }
                    }
                )

            case localAction.Keys.FETCH_NEXT_MESSAGE_RECORDS_REQUEST:
                if (!action.fetchCount ||
                    action.fetchCount == previous.messageFetchCount) {
                    return inputs.improvedLoop.promiseFunc(
                        stateTransition.fetchingMessageRecords(previous),
                        inputs.fetchNextMessagesRpc,
                        [previous.messageRecords.records.length],
                        (messages: AddMessage[]) => {
                            return {
                                type: localAction.Keys.FETCH_NEXT_MESSAGE_RECORDS_SUCCESS,
                                records: messages,
                                startIndex: previous.messageRecords.records.length
                            }
                        }
                    )
                } else {
                    return previous
                }

            case localAction.Keys.FETCH_NEXT_MESSAGE_RECORDS_SUCCESS:
                const [m_newState, m_actions] =
                    syncDomainFromRecords(
                        stateTransition.appendMessageRecords(previous, action.startIndex, action.records))

                return inputs.improvedLoop.list.apply(null,
                    (<any[]>[m_newState])
                        .concat(m_actions)
                        .concat([{type: localAction.Keys.DELAY_AND_FETCH_NEXT_MESSAGE_RECORDS_AGAIN}]))

            case localAction.Keys.DELAY_AND_FETCH_NEXT_MESSAGE_RECORDS_AGAIN:
                return inputs.improvedLoop.promiseFunc(
                    previous,
                    delay,
                    [3000],
                    () => {
                        return {
                            type: localAction.Keys.FETCH_NEXT_MESSAGE_RECORDS_REQUEST,
                            fetchCount: previous.messageFetchCount
                        }
                    }
                )


            default:
                return previous
        }
    }
}


