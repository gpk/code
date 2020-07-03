import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import {ConsoleFragmentType, Subtree} from "../src/subtree"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import * as stateTransition from "../src/state-transition"
import {programRunAction} from "app/program-run"

suite("console reducer - WRITE_TO_X", () => {
    const testLoop = new ImprovedLoopForTesting<any>()

    const simpleReducer =
        createReducer({
            improvedLoop: testLoop
        })

    test("simple stderr and stdout writes", () => {
        let nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: programRunAction.Keys.WRITE_TO_STDERR,
                    text: "stderr1"
                }) as Subtree

        assert.deepEqual(nextState.fragments, [
            {type: ConsoleFragmentType.STDERR, text: "stderr1"},
        ])

        nextState =
            simpleReducer(
                nextState, {
                    type: programRunAction.Keys.WRITE_TO_STDOUT,
                    text: "stdout1"
                }) as Subtree

        assert.deepEqual(nextState.fragments, [
            {type: ConsoleFragmentType.STDERR, text: "stderr1"},
            {type: ConsoleFragmentType.STDOUT, text: "stdout1"},
        ])

        nextState =
            simpleReducer(
                nextState, {
                    type: programRunAction.Keys.WRITE_TO_STDERR,
                    text: "stderr2"
                }) as Subtree

        assert.deepEqual(nextState.fragments, [
            {type: ConsoleFragmentType.STDERR, text: "stderr1"},
            {type: ConsoleFragmentType.STDOUT, text: "stdout1"},
            {type: ConsoleFragmentType.STDERR, text: "stderr2"},
        ])
    })
})

