import {RecordDerivedMap, Subtree} from "./subtree"
import {
    apply_ConversationSummaryRecord_to_ConversationSummary,
    apply_MessageRecord_to_ConversationSummary,
    apply_MessageRecord_to_MessageList,
    updateRecordDerviedMap,
} from "./record-to-domain"
import produce from "immer"
import {RecordDerivedMapType} from "../domain/model"
import * as exportedAction from "./action/exported"
import {model} from "../domain"
import {Action} from "redux"

// unit test this...
export function syncDomainFromRecords(previous: Subtree): [Subtree, Action[]] {
    const actionsToDispatch: (exportedAction.ConversationSummaryMapUpdated | exportedAction.MessageListMapUpdated)[] = []

    const newState = produce(previous, draft => {
        let conversationSummaryMap: RecordDerivedMap<model.ConversationSummary> =
            previous.recordDerivedMaps.get(RecordDerivedMapType.CONVERSATION_SUMMARY_MAP)!
        const previousSummaryMapVersion = conversationSummaryMap.version

        conversationSummaryMap =
            updateRecordDerviedMap(
                conversationSummaryMap,
                previous.conversationSummaryRecords,
                apply_ConversationSummaryRecord_to_ConversationSummary)

        conversationSummaryMap =
            updateRecordDerviedMap(
                conversationSummaryMap,
                previous.messageRecords,
                apply_MessageRecord_to_ConversationSummary)

        if (previousSummaryMapVersion != conversationSummaryMap.version) {
            draft.recordDerivedMaps.set(RecordDerivedMapType.CONVERSATION_SUMMARY_MAP, conversationSummaryMap)
            actionsToDispatch.push({
                type: exportedAction.Keys.CONVERSATION_SUMMARY_MAP_UPDATED,
                conversationSummaryMap: conversationSummaryMap.map,
            })
        }


        let messageListMap: RecordDerivedMap<model.Message[]>
            = previous.recordDerivedMaps.get(RecordDerivedMapType.MESSAGE_LIST_MAP)!
        const previousMessageListVersion = messageListMap.version

        messageListMap =
            updateRecordDerviedMap(
                messageListMap,
                previous.messageRecords,
                apply_MessageRecord_to_MessageList)

        if (previousMessageListVersion != messageListMap.version) {
            draft.recordDerivedMaps.set(RecordDerivedMapType.MESSAGE_LIST_MAP, messageListMap)
            actionsToDispatch.push({
                type: exportedAction.Keys.MESSAGE_LIST_MAP_UPDATED,
                messageListMap: messageListMap.map,
            })
        }
    })

    return [newState, actionsToDispatch]
}
