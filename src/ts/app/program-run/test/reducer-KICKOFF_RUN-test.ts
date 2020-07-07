import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import * as stateTransition from "../src/state-transition"
import {Subtree} from "../src/subtree"
import {PythonExecutionEnvironmentForTesting} from "./python-execution-environment-for-testing"
import {programRunAction} from "app/program-run"
import {model} from "app/domain"

suite("program-run reducer - KICKOFF_RUN", () => {
    const testLoop = new ImprovedLoopForTesting()
    const testPython = new PythonExecutionEnvironmentForTesting()

    const simpleReducer = createReducer({
        improvedLoop: testLoop,
        python: testPython
    })

    test("run a python module", () => {
        const nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: programRunAction.Keys.KICKOFF_RUN,
                    pythonModule: {
                        name: "foo",
                        content: `print("hello")`
                    }
                }) as Subtree

        assert.deepEqual(testLoop.simulateRun(), [
            {
                type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                newStatus: model.PythonInterpreterStatus.RUNNING
            } as programRunAction.InterpreterStatusChanged,
            {
                type: programRunAction.Keys.RUN_FINISHED
            } as programRunAction.RunFinished
        ])

        assert.deepEqual(testPython.didRun, [{
            name: "foo",
            content: `print("hello")`
        }])
    })
})

