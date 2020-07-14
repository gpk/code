import {Action} from "redux"
import {model} from "app/domain"

export namespace programRunAction {
    export const enum Keys {
        INTERPRETER_STATUS_CHANGED = "program/INTERPRETER_STATUS_CHANGED",
        WRITE_TO_STDOUT = "program/WRITE_TO_STDOUT",
        WRITE_TO_STDERR = "program/WRITE_TO_STDERR",
    }

    export interface InterpreterStatusChanged extends Action<Keys> {
        type: Keys.INTERPRETER_STATUS_CHANGED
        newStatus: model.PythonInterpreterStatus
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
