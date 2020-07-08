import {model} from "app/domain"
import {checkState} from "lib/util"

export class SwappablePythonExecutionEnvironment implements model.PythonExecutionEnvironment {

    constructor(public actualPython?: model.PythonExecutionEnvironment) {
    }

    runModules(pythonModules: model.PythonModule[], indexOfModuleToRun: number): Promise<void> {
        checkState(this.actualPython != null,
            "run called when python env not initialized")

        return this.actualPython!.runModules(pythonModules, indexOfModuleToRun)
    }
}
