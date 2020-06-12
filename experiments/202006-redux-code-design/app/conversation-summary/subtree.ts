import {model} from "../domain"

// all subtree state is kept here.
// domain model data definitions are always prefixed with "model"

export interface Subtree {
    fetchAllRequestsMadeCounter: number
    summaries: model.ConversationSummary[]
}

