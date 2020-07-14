import {assert} from "chai"
import {suite, test} from "mocha"
import {prepend} from "basic/prepend"

interface Foo {
    x: number
    y: number
}

suite("simple", () => {
    test("foo test", () => {
        assert.deepEqual({x: 2}, {x: 2})
    })

    test("bar test", () => {
        assert.deepEqual(prepend("pre", " school"), "pre school")
    })
})

