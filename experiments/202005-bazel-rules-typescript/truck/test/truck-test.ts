import {assert} from "chai"
import {createTruck} from "../src/truck"

suite("truck", () => {
    test("makeTruck", () => {
        assert.deepEqual(createTruck(), {wheels: 18})
    })
})
