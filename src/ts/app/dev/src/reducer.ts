import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"
import {Subtree} from "./subtree"
import {pageAction} from "app/page"
import * as stateTransition from "./state-transition"
import {DispatchedAction, localAction} from "./action"
import {storageAction} from "app/storage"
import {Action} from "redux"

type HandledAction =
    pageAction.Init |
    pageAction.MetaKeyComboPressed |
    pageAction.EscapeKeyPressed |
    localAction.DropFileFooHello

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction, DispatchedAction>
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<Subtree, HandledAction, DispatchedAction> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, DispatchedAction] {
        switch (action.type) {

            case pageAction.Keys.INIT:
                if (action.locationHash.dev.length > 0) {

                    const devActionStrings = (<string[]>Object.values(localAction.Keys))

                    const devActionKeys: localAction.Keys[] = []
                    action.locationHash.dev
                        .map((str) => "dev/" + str.toUpperCase())
                        .forEach((actionKeyString) => {
                            if (devActionStrings.indexOf(actionKeyString) >= 0) {
                                devActionKeys.push((<localAction.Keys>actionKeyString))
                            } else {
                                console.warn(`'${actionKeyString}' is not a valid dev action, skipping.`)
                            }
                        })

                    const actions: Action[] = devActionKeys.map((k) => {
                        return {type: k}
                    })

                    if (actions.length > 0) {
                        return inputs.improvedLoop.list(previous, actions)
                    }
                }

                return previous

            case pageAction.Keys.CTL_SHIFT_KEY_COMBO_PRESSED:
                if (action.letter == "D") {
                    return stateTransition.opened(previous)
                } else {
                    return previous
                }

            case pageAction.Keys.ESCAPE_KEY_PRESSED:
                return stateTransition.closed(previous)

            case localAction.Keys.DROP_FILE_HELLO:
                const nextState = stateTransition.withAccumulatedDevAction(previous, action)

                return inputs.improvedLoop.list(
                    nextState,
                    {
                        type: storageAction.Keys.RECEIVE_DROPPED_FILE,
                        name: "hello.py",
                        content: `print("hello ${new Date().toISOString()}")`
                    } as storageAction.ReceiveDroppedFile,
                    {
                        type: pageAction.Keys.CHANGE_DEV_IN_LOCATION_HASH,
                        dev: nextState.accumulatedActions
                    } as pageAction.ChangeDevInLocationHash)

            default:
                return previous
        }
    }
}


