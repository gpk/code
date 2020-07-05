import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import * as stateTransition from "../src/state-transition"
import {Subtree} from "../src/subtree"
import {pageAction} from "app/page"
import {localAction} from "../src/action"

suite("dev reducer - INIT", () => {
    const testLoop = new ImprovedLoopForTesting()

    const simpleReducer =
        createReducer({
            improvedLoop: testLoop
        })

    test("load and run dev actions from location hash", () => {
        const [nextState, _] =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: pageAction.Keys.INIT,

                    locationHash: {
                        dev: ["DROP_FILE_HELLO"]
                    }
                }) as [Subtree, any]

        assert.deepEqual(testLoop.simulateRun(), [{type: localAction.Keys.DROP_FILE_HELLO}])
    })
})

