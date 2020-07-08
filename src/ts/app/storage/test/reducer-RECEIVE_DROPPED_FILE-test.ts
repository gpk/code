import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import {DispatchedAction, storageAction} from "../src/action"
import {Subtree} from "../src/subtree"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import * as stateTransition from "../src/state-transition"
import {model} from "app/domain"

suite("storage reducer - RECEIVE_DROPPED_FILE", () => {
    const testLoop = new ImprovedLoopForTesting<DispatchedAction>()

    const simpleReducer =
        createReducer({
            improvedLoop: testLoop
        })

    test("new python file dropped", () => {
        const [nextState, _] =
            simpleReducer(
                stateTransition.initSubtree(), {
                    type: storageAction.Keys.RECEIVE_DROPPED_FILE,
                    name: "foo",
                    content: "print('hello')"
                }) as [Subtree, any]

        const expectedDocumentCollection: model.DocumentCollection = {
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

        assert.deepEqual(nextState.documentCollection, expectedDocumentCollection)

        assert.deepEqual(
            testLoop.simulateRun(),
            [
                {
                    type: storageAction.Keys.ADDED_PYTHON_MODULE,
                    documentCollection: expectedDocumentCollection
                }
            ])
    })
})

