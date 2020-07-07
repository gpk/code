import {Action} from "redux"

export type ImprovedLoopReducer<S, HandledA extends Action, DispatchedA extends Action> = (previous: S, action: HandledA) => S | [S, DispatchedA]

export interface PromiseFuncDefinition<A, R, F extends (...args: any[]) => Promise<R>> {
    func: F,
    args: Parameters<F>,
    successActionCreator: (result: R) => A
}

export type ImprovedCommand = Action | PromiseFuncDefinition<any, any, any>

/**
 * Given a next-state and an action,
 * create a redux-loop-compatible tuple with next-action.
 */
export type ImprovedLoopAction<S, A extends Action> = (state: S, nextAction: A) => [S, A]


// note: because this type forces usage of generics at the callsite,
// the compiler won't narrow the action type (which is always a union),
// because of this TS limitation.
// That means that when composing the actions returned by the successActionCreator,
// you can't rely on the compiler to do excess parameter checking, etc.
/**
 * Given
 *   a next-state,
 *   a function to execute that returns a result via a promise,
 *   args for that function,
 *   and a function that creates an action, on success, based on the promise result,
 * create a redux-loop-compatible tuple with the promise function.
 */
export type ImprovedLoopPromiseFunc = <S, A extends Action, R, F extends (...args: any[]) => Promise<R>>(
    state: S,
    funcDef: PromiseFuncDefinition<A, R, F>) => [S, A]

export type ImprovedLoopList = <S, A extends Action>(
    state: S,
    ...commands: (ImprovedCommand | ImprovedCommand[])[]) => [S, A] // flattens

type ImprovedLoopReducerMapObject<S, HandledA extends Action, DispatchedA extends Action> = {
    [K in keyof S]: ImprovedLoopReducer<S[K], HandledA, DispatchedA>
}


/**
 * improved-loop-compatible type, that's really implemented as redux-loop combineReducers
 */
export type ImprovedLoopCombineReducers = <S, HandledA extends Action, DispatchedA extends Action>(
    reducers: ImprovedLoopReducerMapObject<S, HandledA, DispatchedA>) => ImprovedLoopReducer<S, HandledA, DispatchedA>


export interface ImprovedLoop<S, HandledA extends Action, DispatchedA extends Action> {
    list: ImprovedLoopList
    action: ImprovedLoopAction<S, DispatchedA>
    promiseFunc: ImprovedLoopPromiseFunc
    combineReducers: ImprovedLoopCombineReducers
}
