import {ImprovedLoop} from "app/framework"
import {Action} from "redux"
import {ImprovedLoopAction, ImprovedLoopPromiseFunc, PromiseFuncDefinition} from "../src/improved-loop"
import {flatten} from "lib/util"

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
        flatten(commands).forEach((c) => {
            if (c.type) {
                this.action(state, c)
            } else if (c.func) {
                this.promiseFunc(state, c)
            } else {
                throw new Error("implement me")
            }
        })

        return [state, (<any>{})]
    }

    promiseFunc: ImprovedLoopPromiseFunc = <S, A, R, F extends (...args: any[]) => Promise<R>>(
        state: S,
        funcDef: PromiseFuncDefinition<A, R, F>): [S, A] => {

        this.toProcess.push(() => {
            funcDef.func(...funcDef.args)
                .then((result) => this.nextActions.push(funcDef.successActionCreator(result)))
        })

        return [state, (<any>{})]
    }


    simulateRun(): DispatchedA[] {
        for (let p of this.toProcess) {
            p()
        }
        const results = this.nextActions
        this.nextActions = []
        return results
    }
}
