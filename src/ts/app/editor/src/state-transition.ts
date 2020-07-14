import {Subtree} from "./subtree"
import produce from "immer"
import {model} from "app/domain"

export function initSubtree(): Subtree {
    return {
        nextContent: {
            setOnCounter: 0,
            document: {
                name: "new",
                content: ""
            }
        },
        updateCounter: 0
    }
}

export function bumpUpdateCounter(previous: Subtree): Subtree {
    return produce(previous, draft => {
        draft.updateCounter += 1
    })
}

export function setNextEditorContent(previous: Subtree, document: model.PythonModule): Subtree {
    return produce(previous, draft => {
        draft.nextContent = {
            setOnCounter: previous.updateCounter,
            document: document
        }
    })
}
