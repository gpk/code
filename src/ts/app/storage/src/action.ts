import {Action} from "redux"
import {model} from "app/domain"

export namespace storageAction {
    export enum Keys {
        RECEIVE_DROPPED_FILE = "storage/RECEIVE_DROPPED_FILE",
        ADDED_PYTHON_MODULE = "storage/ADDED_PYTHON_MODULE",
    }

    export interface ReceiveDroppedFile extends Action<Keys> {
        type: Keys.RECEIVE_DROPPED_FILE
        name: string
        content: string
    }

    export interface AddedPythonModule extends Action<Keys> {
        type: Keys.ADDED_PYTHON_MODULE
        documentCollection: model.DocumentCollection
    }
}

export type DispatchedAction = storageAction.AddedPythonModule
