import {storageAction} from "app/storage"
import {Action} from "redux"
import {pageAction} from "app/page"

export namespace localAction {
    export enum Keys {
        DROP_FILE_HELLO = "dev/DROP_FILE_HELLO",
    }

    export interface DropFileFooHello extends Action<Keys> {
        type: Keys.DROP_FILE_HELLO
    }
}


export type DispatchedAction =
    storageAction.ReceiveDroppedFile |
    localAction.DropFileFooHello |
    pageAction.ChangeDevInLocationHash
