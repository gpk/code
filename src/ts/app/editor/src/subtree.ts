import {model} from "app/domain"

interface NextContent {
    setOnCounter: number
    document: model.PythonModule
}

export interface Subtree {
    updateCounter: number
    nextContent: NextContent
}
