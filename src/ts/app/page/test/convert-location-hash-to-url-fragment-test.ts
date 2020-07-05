import {assert} from "chai"
import {suite, test} from "mocha"
import {convertLocationHashToUrlFragment} from "../src/convert-location-hash-to-url-fragment"

suite("convertLocationHashToUrlFragment", () => {
    test("basics", () => {
        assert.equal(
            convertLocationHashToUrlFragment({
                dev: []
            }),
            undefined)

        assert.equal(
            convertLocationHashToUrlFragment({
                dev: ["FOO_ACTION", "BAR_ACTION"]
            }),
            "#dev=FOO_ACTION,BAR_ACTION")
    })
})

