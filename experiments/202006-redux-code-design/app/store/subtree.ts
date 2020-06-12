import {RecordDerivedMapType} from "../domain/model"

export interface ChangeConversationSummary {
    conversationToken: string
    lastUpdatedMs: number
    name: string
}

export interface AddMessage {
    conversationToken: string
    text: string
    from: string
    epochTimeMs: number
}

export enum RecordStoreType {
    CONVERSATION_SUMMARY = "CONVERSATION_SUMMARY",
    MESSAGE = "MESSAGE"
}

export interface RecordStore<R> {
    type: RecordStoreType
    records: R[]
}

export interface RecordDerivedMap<T> {
    _recordPositions: Map<string, number>
    version: string
    map: Map<string, T>
}

export interface Subtree {
    conversationSummaryRecords: RecordStore<ChangeConversationSummary>
    conversationSummaryFetchCount: number

    messageRecords: RecordStore<AddMessage>
    messageFetchCount: number

    recordDerivedMaps: Map<RecordDerivedMapType, RecordDerivedMap<any>>,
}

