import {Subtree} from "./subtree"
import {model} from "../domain"
import produce from "immer"


// extraction of logic from reducer.
// this is the simple code it takes to change a state, to incorporate incoming changes, etc

export function init(): Subtree {
    return {
        fetchAllRequestsMadeCounter: 0,
        summaries: [],
    }
}

export function conversationMapUpdated(previous: Subtree,
                                       conversationSummaryMap: Map<string, model.ConversationSummary>) {
    return produce(previous, draft => {
        draft.summaries = Array.from(conversationSummaryMap.values())
        draft.summaries.sort(
            (a, b) =>
                (b.latestMessage && b.latestMessage!.epochTimeMs || 0) -
                (a.latestMessage && a.latestMessage!.epochTimeMs || 0))
    })
}
