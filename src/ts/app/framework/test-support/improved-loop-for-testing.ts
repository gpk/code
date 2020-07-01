import {ImprovedLoop} from "app/framework"
import {Action} from "redux"
import {ImprovedLoopAction, ImprovedLoopPromiseFunc} from "../src/improved-loop"

export class ImprovedLoopForTesting<DispatchedA extends Action> implements ImprovedLoop<any, any, DispatchedA> {

    constructor(private toProcess: any[] = [],
                private nextActions: any[] = []) {
    }

    action(state: any, nextAction: any): [any, any] {
        this.toProcess.push(() => {
            this.nextActions.push(nextAction)
        })

        return [state, nextAction]
    }

    combineReducers(reducers: any) {
        throw new Error("unsupported")
        return (<any>{})
    }

    list: ImprovedLoopAction<any, any> = (state, ...commands: any[]) => {
        return [state, (<any>{})]
    }

    promiseFunc: ImprovedLoopPromiseFunc =
        <S, A, R, F extends (...args: any[]) => Promise<R>>(
            state: S,
            f: F,
            args: Parameters<F>,
            successAppActionCreator: (result: R) => A): [S, A] => {

            this.toProcess.push(() => {
                f(...args).then((result) => this.nextActions.push(successAppActionCreator(result)))
            })

            return [state, (<any>{})]
        }

    simulateRun(): DispatchedA[] {
        this.toProcess.forEach((r) => r())
        const results = this.nextActions
        this.nextActions = []
        return results
    }
}
