import {model} from "app/domain"

export interface PythonModule {
    name: string
    content: string
}

export interface DocumentCollection {
    pythonModules: model.PythonModule[]
    nameToPythonModule: { [key: string]: model.PythonModule }
}

export enum PythonInterpreterStatus {
    INITIALIZING,
    READY_TO_RUN,
    RUNNING
}

export interface LocationHash {
    dev: string[]
}

export interface PythonExecutionEnvironment {
    runModules: (pythonModules: PythonModule[], indexOfModuleToRun: number) => Promise<void>
}
