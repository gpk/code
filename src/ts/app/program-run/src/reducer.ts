import {ImprovedLoop, ImprovedLoopReducer} from "app/framework"
import {Subtree} from "./subtree"
import {checkExhaustiveAndReturn} from "lib/util"
import {model} from "app/domain"
import {DispatchedAction, programRunAction} from "./action"

type HandledAction =
    programRunAction.KickoffRun |
    programRunAction.RunFinished

export interface ReducerInputs {
    improvedLoop: ImprovedLoop<Subtree, HandledAction, any>,
    python: model.PythonExecutionEnvironment
}

export function createReducer(inputs: ReducerInputs): ImprovedLoopReducer<Subtree, HandledAction, DispatchedAction> {
    return function reduce(previous: Subtree, action: HandledAction): Subtree | [Subtree, DispatchedAction] {
        switch (action.type) {
            case programRunAction.Keys.KICKOFF_RUN:
                return inputs.improvedLoop.list(
                    previous,
                    {
                        type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                        newStatus: model.PythonInterpreterStatus.RUNNING
                    } as programRunAction.InterpreterStatusChanged,
                    {
                        func: inputs.python.runSingleModule.bind(inputs.python),
                        args: [action.pythonModule],
                        successActionCreator: () => {
                            return {
                                type: programRunAction.Keys.RUN_FINISHED
                            }
                        }
                    }
                )

            case programRunAction.Keys.RUN_FINISHED:
                return inputs.improvedLoop.action(previous, {
                    type: programRunAction.Keys.INTERPRETER_STATUS_CHANGED,
                    newStatus: model.PythonInterpreterStatus.READY_TO_RUN
                })
        }

        return checkExhaustiveAndReturn(action, previous)
    }
}


