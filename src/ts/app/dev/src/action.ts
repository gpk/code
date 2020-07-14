import {storageAction} from "app/storage"
import {Action} from "redux"
import {pageAction} from "app/page"

export namespace localAction {
    export enum Keys {
        DROP_FILE_HELLO = "dev/DROP_FILE_HELLO",
        DROP_FILES_PREFIXING = "dev/DROP_FILES_PREFIXING",
    }

    export interface DropFileFooHello extends Action<Keys> {
        type: Keys.DROP_FILE_HELLO
    }

    export interface DropFilesPrefixing extends Action<Keys> {
        type: Keys.DROP_FILES_PREFIXING
    }
}


export type DispatchedAction =
    storageAction.ReceiveDroppedFile |
    localAction.DropFileFooHello |
    localAction.DropFilesPrefixing |
    pageAction.ChangeDevInLocationHash
