import {Action} from "redux"
import {programRunAction} from "app/program-run"

export namespace localAction {
    export enum Keys {
        CHANGE_PYTHON_MODULE_IN_EDITOR = "editor/CHANGE_PYTHON_MODULE_IN_EDITOR"
    }

    export interface ChangePythonModuleInEditor extends Action<Keys> {
        type: Keys.CHANGE_PYTHON_MODULE_IN_EDITOR
        pythonModuleIndex: number
    }
}

export type DispatchedAction =
    programRunAction.KickoffRun |
    localAction.ChangePythonModuleInEditor
