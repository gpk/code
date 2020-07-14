import {assert} from "chai"
import {suite, test} from "mocha"
import {createReducer} from "../src/reducer"
import * as stateTransition from "../src/state-transition"
import {Subtree} from "../src/subtree"
import {ImprovedLoopForTesting} from "app/framework/test-support"
import {localAction} from "../src/action"


suite("editor reducer - CHANGE_PYTHON_MODULE_IN_EDITOR", () => {
    const testLoop = new ImprovedLoopForTesting()

    const simpleReducer =
        createReducer({
            improvedLoop: testLoop
        })

    test("basics", () => {
        const nextState =
            simpleReducer(
                stateTransition.setNextEditorContent(
                    stateTransition.initSubtree(),
                    {
                        pythonModules: [{
                            name: "foo",
                            content: `print("hello")`
                        }, {
                            name: "bar",
                            content: `print("world")`
                        }],
                        nameToPythonModule: {}
                    }), {
                    type: localAction.Keys.CHANGE_PYTHON_MODULE_IN_EDITOR,
                    pythonModuleIndex: 1
                }) as Subtree

        assert.equal(nextState.nextContent.pythonModuleIndex, 1)
    })
})

