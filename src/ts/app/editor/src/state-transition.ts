import {Subtree} from "./subtree"
import produce from "immer"
import {model} from "app/domain"
import {PythonInterpreterStatus} from "../../domain/src/model"

export function initSubtree(): Subtree {
    return {
        nextContent: {
            setOnCounter: 0,
            pythonModuleIndex: -1
        },
        documentCollection: {
            pythonModules: [],
            nameToPythonModule: {}
        },
        updateCounter: 0,
        userCanStartCodeRun: false
    }
}

export function bumpUpdateCounter(previous: Subtree): Subtree {
    return produce(previous, draft => {
        draft.updateCounter += 1
    })
}

export function setNextEditorContent(previous: Subtree, documentCollection: model.DocumentCollection): Subtree {
    return produce(previous, draft => {
        draft.nextContent = {
            setOnCounter: previous.updateCounter,
            pythonModuleIndex: documentCollection.pythonModules.length - 1
        }
        draft.documentCollection = documentCollection
    })
}

export function setNextEditorContentToPythonModuleIndex(previous: Subtree, i: number): Subtree {
    return produce(previous, draft => {
        draft.nextContent = {
            setOnCounter: previous.updateCounter,
            pythonModuleIndex: i
        }
    })
}

export function updateForInterpreterStatusChange(previous: Subtree, newStatus: model.PythonInterpreterStatus) {
    return produce(previous, draft => {
        draft.userCanStartCodeRun = newStatus == PythonInterpreterStatus.READY_TO_RUN
    })
}

