import {model} from "app/domain"
import {writeFile} from "./pyodide-util"
import {checkState} from "lib/util"

export class PyodidePythonExecutionEnvironment implements model.PythonExecutionEnvironment {
    constructor(private pyodide: any,
                private runCounter: number = 0) {}

    runModules(pythonModules: model.PythonModule[], indexOfModuleToRun: number): Promise<void> {
        checkState(indexOfModuleToRun < pythonModules.length,
            `module index ${indexOfModuleToRun} out of range ${pythonModules.length}`)

        this.runCounter += 1

        const srcDirForRun = `/run/${this.runCounter}`

        for (let pythonModule of pythonModules) {
            const modulePath = `${srcDirForRun}/${pythonModule.name}.py`
            writeFile(this.pyodide._module.FS, modulePath, pythonModule.content)
        }

        const modulePathToRun = `${srcDirForRun}/${pythonModules[indexOfModuleToRun].name}.py`

        return this.pyodide.runPythonAsync(`
            import sys
            sys.path.insert(0, "${srcDirForRun}")
        
            import runpy
            runpy.run_path("${modulePathToRun}")
        `)
    }
}
