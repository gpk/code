import {model} from "app/domain"
import {SynchronousPromise} from "synchronous-promise"

export class PythonExecutionEnvironmentForTesting implements model.PythonExecutionEnvironment {
    constructor(public didRun: model.PythonModule[] = []) {
    }

    runSingleModule(pythonModule: model.PythonModule): Promise<void> {
        this.didRun.push(pythonModule)

        return new SynchronousPromise((resolve) => {
            resolve()
        })
    }
}
