import {DocumentCollection} from "../../domain/src/model"


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

    documentCollection: DocumentCollection
}
