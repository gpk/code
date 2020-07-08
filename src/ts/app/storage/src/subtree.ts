import {model} from "app/domain"

export enum FileChangeType {
    ADD_PYTHON_MODULE = "ADD_PYTHON_MODULE"
}

interface AddPythonModule {
    type: FileChangeType.ADD_PYTHON_MODULE
    name: string
    content: string
}

export interface Subtree {
    documentChanges: (AddPythonModule)[]
    lastDocumentChangeIndexApplied: number

    documentCollection: model.DocumentCollection
}
