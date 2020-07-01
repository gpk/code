import {model} from "app/domain"

export interface PythonModule {
    name: string
    content: string
}

export interface DocumentCollection {
    documents: model.PythonModule[]
    nameToDocument: { [key: string]: model.PythonModule }
}
