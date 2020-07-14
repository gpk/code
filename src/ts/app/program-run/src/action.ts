import {Action} from "redux"
import {model} from "app/domain"

export namespace programRunAction {
    export enum Keys {
        INTERPRETER_STATUS_CHANGED = "programRun/INTERPRETER_STATUS_CHANGED",
        WRITE_TO_STDOUT = "programRun/WRITE_TO_STDOUT",
        WRITE_TO_STDERR = "programRun/WRITE_TO_STDERR",
        KICKOFF_RUN = "programRun/KICKOFF_RUN",
        RUN_FINISHED = "programRun/RUN_FINISHED",
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

    export interface KickoffRun extends Action<Keys> {
        type: Keys.KICKOFF_RUN
        pythonModule: model.PythonModule // TODO: array of modules, with name of the one to run
    }

    export interface RunFinished extends Action<Keys> {
        type: Keys.RUN_FINISHED
    }
}

export type DispatchedAction = programRunAction.InterpreterStatusChanged
