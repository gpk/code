import {assert} from "chai"
import {suite, test} from "mocha"
import {FileChangeType} from "../src/subtree"
import * as stateTransition from "../src/state-transition"

suite("storage state transition - applyNextFileChanges", () => {
    test("add a new python module", () => {
        const initialState = stateTransition.initSubtree()
        initialState.documentChanges.push({
            type: FileChangeType.ADD_PYTHON_MODULE,
            name: "foo",
            content: "print('hello')"
        })

        const nextState = stateTransition.applyNextFileChanges(initialState)

        assert.deepEqual(nextState.documentCollection, {
            documents: [
                {name: "foo", content: "print('hello')"}
            ],
            nameToDocument: {
                "foo": {name: "foo", content: "print('hello')"}
            }
        })
    })

    test("add the same module twice (same name/content) is effecively a no-op", () => {
        const initialState = stateTransition.initSubtree()
        initialState.documentChanges.push({
            type: FileChangeType.ADD_PYTHON_MODULE,
            name: "foo",
            content: "print('hello')"
        })
        initialState.documentChanges.push({
            type: FileChangeType.ADD_PYTHON_MODULE,
            name: "foo",
            content: "print('hello')"
        })

        const nextState = stateTransition.applyNextFileChanges(initialState)

        assert.deepEqual(nextState.documentCollection, {
            documents: [
                {name: "foo", content: "print('hello')"}
            ],
            nameToDocument: {
                "foo": {name: "foo", content: "print('hello')"}
            }
        })
    })

    test("add a new python module, but an existing module with the same name exists", () => {
        const initialState = stateTransition.initSubtree()
        initialState.documentChanges.push({
            type: FileChangeType.ADD_PYTHON_MODULE,
            name: "foo",
            content: "print('hello')"
        })
        initialState.documentChanges.push({
            type: FileChangeType.ADD_PYTHON_MODULE,
            name: "foo",
            content: "print('world')"
        })
        initialState.documentChanges.push({
            type: FileChangeType.ADD_PYTHON_MODULE,
            name: "foo",
            content: "print('zz')"
        })

        const nextState = stateTransition.applyNextFileChanges(initialState)

        assert.deepEqual(nextState.documentCollection, {
            documents: [
                {name: "foo", content: "print('hello')"},
                {name: "foo_2", content: "print('world')"},
                {name: "foo_3", content: "print('zz')"}
            ],
            nameToDocument: {
                "foo": {name: "foo", content: "print('hello')"},
                "foo_2": {name: "foo_2", content: "print('world')"},
                "foo_3": {name: "foo_3", content: "print('zz')"}
            }
        })
    })
})

