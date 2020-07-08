import {model} from "app/domain"
import {SynchronousPromise} from "synchronous-promise"

export class PythonExecutionEnvironmentForTesting implements model.PythonExecutionEnvironment {
    constructor(public didWrite: model.PythonModule[][] = [],
                public didRun: model.PythonModule[] = []) {
    }

    runModules(pythonModules: model.PythonModule[], indexOfModuleToRun: number): Promise<void> {
        this.didWrite.push(pythonModules)
        this.didRun.push(pythonModules[indexOfModuleToRun])

        return new SynchronousPromise((resolve) => {
            resolve()
        })
    }


}
