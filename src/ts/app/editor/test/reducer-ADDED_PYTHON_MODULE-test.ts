import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import * as stateTransition from "../src/state-transition"
import {storageAction} from "app/storage"
import {Subtree} from "../src/subtree"
import {model} from "app/domain"

suite("editor reducer - ADDED_PYTHON_MODULE", () => {
    const testLoop = new ImprovedLoopForTesting()

    const simpleReducer =
        createReducer({
            improvedLoop: testLoop
        })

    test("python module added", () => {
        const incomingDocumentCollection: model.DocumentCollection = {
            pythonModules: [
                {
                    name: "foo",
                    content: "print('hello')"
                }
            ],
            nameToPythonModule: {
                "foo": {
                    name: "foo",
                    content: "print('hello')"
                }
            }
        }

        const nextState =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: storageAction.Keys.ADDED_PYTHON_MODULE,
                    documentCollection: incomingDocumentCollection
                }) as Subtree

        assert.equal(nextState.updateCounter, 1)
        assert.deepEqual(nextState.nextContent, {
            setOnCounter: 1,
            pythonModuleIndex: 0
        })
    })
})

