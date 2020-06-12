import {Action} from "redux"
import {AddMessage, ChangeConversationSummary} from "../subtree"


export const enum Keys {
    FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST = "store/FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST",
    FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_SUCCESS = "store/FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_SUCCESS",
    DELAY_AND_FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_AGAIN =
        "store/DELAY_AND_FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_AGAIN",

    FETCH_NEXT_MESSAGE_RECORDS_REQUEST = "store/FETCH_NEXT_MESSAGE_RECORDS_REQUEST",
    FETCH_NEXT_MESSAGE_RECORDS_SUCCESS = "store/FETCH_NEXT_MESSAGE_RECORDS_SUCCESS",
    DELAY_AND_FETCH_NEXT_MESSAGE_RECORDS_AGAIN = "store/DELAY_AND_FETCH_NEXT_MESSAGE_RECORDS_AGAIN"
}


export interface FetchNextConversationSummaryRecordsRequest extends Action<Keys> {
    type: Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_REQUEST
    fetchCount: number
}

export interface FetchNextConversationSummaryRecordsSuccess extends Action<Keys> {
    type: Keys.FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_SUCCESS,
    startIndex: number,
    records: ChangeConversationSummary[]
}

export interface DelayAndFetchNextConversationSummaryRecordsAgain extends Action<Keys> {
    type: Keys.DELAY_AND_FETCH_NEXT_CONVERSATION_SUMMARY_RECORDS_AGAIN
}


export interface FetchNextMessageRecordsRequest extends Action<Keys> {
    type: Keys.FETCH_NEXT_MESSAGE_RECORDS_REQUEST
    fetchCount: number
}

export interface FetchNextMessageRecordsSuccess extends Action<Keys> {
    type: Keys.FETCH_NEXT_MESSAGE_RECORDS_SUCCESS,
    startIndex: number,
    records: AddMessage[]
}

export interface DelayAndFetchNextMessageRecordsAgain extends Action<Keys> {
    type: Keys.DELAY_AND_FETCH_NEXT_MESSAGE_RECORDS_AGAIN
}
