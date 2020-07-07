import {model} from "app/domain"
import {checkState} from "lib/util"

export class SwappablePythonExecutionEnvironment implements model.PythonExecutionEnvironment {

    constructor(public actualPython?: model.PythonExecutionEnvironment) {
    }

    runSingleModule(pythonModule: model.PythonModule) {
        checkState(this.actualPython != null,
            "run called when python env not initialized")

        return this.actualPython!.runSingleModule(pythonModule)
    }

}
