import {model} from "app/domain"

interface NextContent {
    setOnCounter: number
    pythonModuleIndex: number
}

export interface Subtree {
    updateCounter: number
    nextContent: NextContent
    userCanStartCodeRun: boolean

    documentCollection: model.DocumentCollection
}
