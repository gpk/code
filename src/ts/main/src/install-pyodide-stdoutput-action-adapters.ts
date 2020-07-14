import {programRunAction} from "app/program-run"
import {Dispatch} from "redux"

export function installPyodideStdoutputActionAdapters(
    window: any,
    pyodide: any,
    dispatch: Dispatch<programRunAction.WriteToStdout | programRunAction.WriteToStderr>) {

    //TODO: this needs to be a more complete python IO implementation,
    // see https://github.com/python/typeshed/blob/5d553c9584eb86793cfa61019ddee5c7b62bc286/stdlib/2/typing.pyi#L320

    window.fakeStdout = {
        write(str: string) {
            dispatch({
                type: programRunAction.Keys.WRITE_TO_STDOUT,
                text: str
            })
        }
    }

    window.fakeStderr = {
        write(str: string) {
            dispatch({
                type: programRunAction.Keys.WRITE_TO_STDERR,
                text: str
            })
        }
    }

    pyodide.runPython(`
        from js import fakeStdout, fakeStderr
        import sys
        sys.stdout = fakeStdout
        sys.stderr = fakeStderr
    `)
}



