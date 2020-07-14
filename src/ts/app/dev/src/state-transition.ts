import {Subtree} from "app/dev"
import produce from "immer"
import {Action} from "redux"


export function initSubtree(): Subtree {
    return {
        open: false,
        accumulatedActions: []
    }
}

export function opened(previous: Subtree) {
    return produce(previous, draft => {
        draft.open = true
    })
}

export function closed(previous: Subtree) {
    return produce(previous, draft => {
        draft.open = false
    })
}

export function withAccumulatedDevAction(previous: Subtree, action: Action) {
    return produce(previous, draft => {
        draft.accumulatedActions.push(action.type.toString().split("/")[1])
    })
}

