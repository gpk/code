import {Action} from "redux"

export namespace programRunAction {
    export const enum Keys {
        WRITE_TO_STDOUT = "program/WRITE_TO_STDOUT",
        WRITE_TO_STDERR = "program/WRITE_TO_STDERR",
    }

    export interface WriteToStdout extends Action<Keys> {
        type: Keys.WRITE_TO_STDOUT
        text: string
    }

    export interface WriteToStderr extends Action<Keys> {
        type: Keys.WRITE_TO_STDERR
        text: string
    }
}
