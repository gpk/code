import {model} from "app/domain"
import {writeFile} from "./pyodide-util"

export class PyodidePythonExecutionEnvironment implements model.PythonExecutionEnvironment {
    constructor(private pyodide: any,
                private runCounter: number = 0) {}

    runSingleModule(pythonModule: model.PythonModule) {
        this.runCounter += 1
        const runTimestamp = new Date().toISOString()

        const srcDirForRun = `/run/${this.runCounter}`
        const modulePath = `${srcDirForRun}/${pythonModule.name}.py`

        writeFile(this.pyodide._module.FS, modulePath, pythonModule.content)
        return this.pyodide.runPythonAsync(`
            import runpy
            runpy.run_path("${modulePath}")
        `)
    }
}
