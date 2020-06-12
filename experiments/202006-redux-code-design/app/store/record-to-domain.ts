import {AddMessage, ChangeConversationSummary, RecordDerivedMap, RecordStore} from "./subtree"
import {model} from "../domain"
import produce from "immer"
import {checkState} from "../../lib/util"


function convert_AddMessageRecord_to_Message(record: AddMessage): model.Message {
    return {
        text: record.text,
        from: record.from,
        epochTimeMs: record.epochTimeMs
    };
}

export function apply_MessageRecord_to_ConversationSummary(
    previous: Map<string, model.ConversationSummary>,
    record: AddMessage): Map<string, model.ConversationSummary> {
    return produce(previous, draft => {
        if (!draft.has(record.conversationToken)) {
            draft.set(record.conversationToken, {
                conversationToken: record.conversationToken,
                latestMessage: convert_AddMessageRecord_to_Message(record)
            })
        } else {
            draft.get(record.conversationToken)!.latestMessage = {
                text: record.text,
                from: record.from,
                epochTimeMs: record.epochTimeMs
            }
        }
    })
}

export function apply_ConversationSummaryRecord_to_ConversationSummary(
    previous: Map<string, model.ConversationSummary>,
    record: ChangeConversationSummary): Map<string, model.ConversationSummary> {
    return produce(previous, draft => {
        if (!draft.has(record.conversationToken)) {
            draft.set(record.conversationToken, {
                conversationToken: record.conversationToken,
                name: record.name,
                latestMessage: undefined
            })
        } else {
            const conversationSummary = draft.get(record.conversationToken)!
            conversationSummary.name = record.name
        }
    })
}

export function apply_MessageRecord_to_MessageList(
    previous: Map<string, model.Message[]>,
    record: AddMessage): Map<string, model.Message[]> {

    const message = convert_AddMessageRecord_to_Message(record)

    return produce(previous, draft => {
        if (!draft.has(record.conversationToken)) {
            draft.set(record.conversationToken, [message])
        } else {
            draft.get(record.conversationToken)!.push(message)
        }
    })
}

export function updateRecordDerviedMap<T, R>(
    previous: RecordDerivedMap<T>,
    store: RecordStore<R>,
    reducer: (map: Map<string, T>, record: R) => Map<string, T>): RecordDerivedMap<T> {

    const currentPosition = previous._recordPositions.get(store.type) || 0
    if (currentPosition == store.records.length) {
        return previous
    }

    checkState(previous.map.size == 0 ||
        previous.map.size > 0 && previous._recordPositions.size > 0,
        `_recordPositions should not be empty ${previous.map.size} ${previous._recordPositions.size}`)

    const result: RecordDerivedMap<T> = {
        map: new Map(),
        version: previous.version,
        _recordPositions: new Map()
    }

    previous.map.forEach((v, k) => result.map.set(k, v))
    store.records.slice(currentPosition).forEach((record) => result.map = reducer(result.map, record))

    previous._recordPositions.forEach((v, k) => result._recordPositions.set(k, v))
    result._recordPositions.set(store.type, store.records.length)

    const versionComponentKeys = Array.from(result._recordPositions.keys())
    versionComponentKeys.sort()

    result.version =
        versionComponentKeys
            .map((c) => `${c}-${result._recordPositions.get(c)!}`)
            .join("--")

    return result
}
