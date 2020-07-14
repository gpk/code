import {ConsoleFragmentType, Subtree} from "./subtree"
import produce from "immer"


export function initSubtree(): Subtree {
    return {
        fragments: []
    }
}

export function appendToStdout(previous: Subtree, text: string) {
    return produce(previous, draft => {
        draft.fragments.push({
            type: ConsoleFragmentType.STDOUT,
            text: text
        })
    })
}

export function appendToStderr(previous: Subtree, text: string) {
    return produce(previous, draft => {
        draft.fragments.push({
            type: ConsoleFragmentType.STDERR,
            text: text
        })
    })
}

