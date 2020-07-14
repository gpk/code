import {Subtree} from "./subtree"
import produce from "immer"

export function initSubtree(): Subtree {
    return {
        locationHash: {
            dev: []
        }
    }
}

export function locationHashDevChanged(previous: Subtree, dev: string[]): Subtree {
    return produce(previous, draft => {
        draft.locationHash.dev = dev
    })
}
