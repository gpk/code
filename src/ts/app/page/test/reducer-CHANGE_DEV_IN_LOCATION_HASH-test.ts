import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import * as stateTransition from "../src/state-transition"
import {Subtree} from "../src/subtree"
import {pageAction} from "app/page"

suite("page reducer - CHANGE_DEV_IN_LOCATION_HASH", () => {
    const simpleReducer = createReducer()

    test("dev action list change", () => {
        const nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: pageAction.Keys.CHANGE_DEV_IN_LOCATION_HASH,
                    dev: ["FOO_ACTION", "BAR_ACTION"]
                }) as Subtree

        assert.deepEqual(nextState.locationHash.dev, ["FOO_ACTION", "BAR_ACTION"])
    })
})

