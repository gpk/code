import {Cmd, combineReducers, loop} from "redux-loop"
import {
    ImprovedCommand,
    ImprovedLoop,
    ImprovedLoopAction,
    ImprovedLoopCombineReducers,
    ImprovedLoopPromiseFunc
} from "./improved-loop"


export const reduxLoopBasedList: ImprovedLoopAction<any, any> = (state, ...commands: ImprovedCommand[]) => {
    return loop(state, Cmd.list(commands.map((c) => {
        if ((<any>c).type && (<any>c).type == "RUN") {
            return makeCmdRun.apply(c)
        } else {
            return makeAction(c)
        }
    })))
}

function makeAction(nextAction: any) {
    return Cmd.action(<any>nextAction);
}

export const reduxLoopBasedAction: ImprovedLoopAction<any, any> = (state, nextAction) => {
    return (<any>loop(state, makeAction(nextAction)))
}


function makeCmdRun<A, R, F extends (...args: any[]) => Promise<R>>(
    f: F,
    args: Parameters<F>,
    successAppActionCreator: (result: R) => A) {
    return Cmd.run(f, {
        args: args,
        successActionCreator: (<any>successAppActionCreator)
    });
}

export const reduxLoopBasedPromiseFunc: ImprovedLoopPromiseFunc =
    <S, A, R, F extends (...args: any[]) => Promise<R>>(
        state: S,
        f: F,
        args: Parameters<F>,
        successAppActionCreator: (result: R) => A): [S, A] => {
        return ((<any>loop(state,
            makeCmdRun(f, args, successAppActionCreator))))
    }

export const reduxLoopBasedCombineReducers: ImprovedLoopCombineReducers = (reducers: any) =>
    (<any>combineReducers(reducers))


export const reduxLoopBasedImprovedLoop: ImprovedLoop<any, any> = {
    list: reduxLoopBasedList,
    action: reduxLoopBasedAction,
    promiseFunc: reduxLoopBasedPromiseFunc,
    combineReducers: reduxLoopBasedCombineReducers
}
