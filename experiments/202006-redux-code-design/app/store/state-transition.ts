import {AddMessage, ChangeConversationSummary, RecordStoreType, Subtree} from "./subtree"
import produce from "immer"
import {RecordDerivedMapType} from "../domain/model"


export function init(): Subtree {
    return {
        conversationSummaryRecords: {
            type: RecordStoreType.CONVERSATION_SUMMARY,
            records: [],
        },
        conversationSummaryFetchCount: 0,

        messageRecords: {
            type: RecordStoreType.MESSAGE,
            records: [],
        },
        messageFetchCount: 0,
        recordDerivedMaps: new Map([
            [RecordDerivedMapType.CONVERSATION_SUMMARY_MAP, {
                _recordPositions: new Map(),
                version: "",
                map: new Map(),
            }],
            [RecordDerivedMapType.MESSAGE_LIST_MAP, {
                _recordPositions: new Map(),
                version: "",
                map: new Map(),
            }],
        ]),
    }
}

export function appendConversationSummaryRecords(previous: Subtree,
                                                 startIndex: number,
                                                 records: ChangeConversationSummary[]): Subtree {
    if (startIndex != previous.conversationSummaryRecords.records.length) {
        return previous
    }

    return produce(previous, draft => {
        // push one at a time or immer won't pick up the changes
        records.forEach((r) => draft.conversationSummaryRecords.records.push(r))
    })
}

export function appendMessageRecords(previous: Subtree,
                                     startIndex: number,
                                     records: AddMessage[]) {
    if (startIndex != previous.messageRecords.records.length) {
        return previous
    }

    return produce(previous, draft => {
        records.forEach((r) => draft.messageRecords.records.push(r))
    })
}

export function fetchingConversationSummaryRecords(previous: Subtree): Subtree {
    return produce(previous, draft => {
        draft.conversationSummaryFetchCount += 1
    })
}

export function fetchingMessageRecords(previous: Subtree): Subtree {
    return produce(previous, draft => {
        draft.messageFetchCount += 1
    })
}

