import {Cmd, combineReducers, loop} from "redux-loop"
import {
    ImprovedCommand,
    ImprovedLoop,
    ImprovedLoopAction,
    ImprovedLoopCombineReducers,
    ImprovedLoopPromiseFunc,
    PromiseFuncDefinition
} from "./improved-loop"
import {flatten} from "lib/util"


export const reduxLoopBasedList: ImprovedLoopAction<any, any> = (state, ...commands: (ImprovedCommand | ImprovedCommand[])[]) => {
    return loop(state, Cmd.list(flatten(commands).map((c) => {
        if (c.func) {
            return makeCmdRun2(c)
        } else if (c.type) {
            return makeAction(c)
        } else {
            throw new Error(`Don't know what to do with ${c}`)
        }
    })))
}

function makeAction(nextAction: any) {
    return Cmd.action(nextAction)
}

export const reduxLoopBasedAction: ImprovedLoopAction<any, any> = (state, nextAction) => {
    return (<any>loop(state, makeAction(nextAction)))
}


function makeCmdRun<A, R, F extends (...args: any[]) => Promise<R>>(
    f: F,
    args: Parameters<F>,
    successActionCreator: (result: R) => A) {
    return Cmd.run(f, {
        args: args,
        successActionCreator: (<any>successActionCreator)
    })
}

function makeCmdRun2<A, R, F extends (...args: any[]) => Promise<R>>(pf: PromiseFuncDefinition<A, R, F>) {
    return Cmd.run(pf.func, {
        args: pf.args,
        successActionCreator: (<any>pf.successActionCreator)
    })
}

export const reduxLoopBasedPromiseFunc: ImprovedLoopPromiseFunc =
    <S, A, R, F extends (...args: any[]) => Promise<R>>(
        state: S,
        pf: PromiseFuncDefinition<A, R, F>): [S, A] => {
        return ((<any>loop(state, makeCmdRun2(pf))))
    }

export const reduxLoopBasedCombineReducers: ImprovedLoopCombineReducers = (reducers: any) =>
    (<any>combineReducers(reducers))


export const reduxLoopBasedImprovedLoop: ImprovedLoop<any, any, any> = {
    list: reduxLoopBasedList,
    action: reduxLoopBasedAction,
    promiseFunc: reduxLoopBasedPromiseFunc,
    combineReducers: reduxLoopBasedCombineReducers
}
