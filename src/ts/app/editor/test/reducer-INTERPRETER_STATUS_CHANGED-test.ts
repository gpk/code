import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import * as stateTransition from "../src/state-transition"
import {Subtree} from "../src/subtree"
import {programRunAction} from "app/program-run"
import {model} from "app/domain"
import {ImprovedLoopForTesting} from "app/framework/test-support"


suite("editor reducer - INTERPRETER_STATUS_CHANGED", () => {
    const testLoop = new ImprovedLoopForTesting()

    const simpleReducer =
        createReducer({
            improvedLoop: testLoop
        })

    test("interpreter status is initializaing, so disable the run button", () => {
        const nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                    newStatus: model.PythonInterpreterStatus.INITIALIZING
                }) as Subtree

        assert.equal(nextState.userCanStartCodeRun, false)
    })

    test("interpreter status is ready to run, so enable the run button", () => {
        const nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                    newStatus: model.PythonInterpreterStatus.READY_TO_RUN
                }) as Subtree

        assert.equal(nextState.userCanStartCodeRun, true)
    })

    test("interpreter status is running, so disable the run button", () => {
        const nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                    newStatus: model.PythonInterpreterStatus.RUNNING
                }) as Subtree

        assert.equal(nextState.userCanStartCodeRun, false)
    })
})

