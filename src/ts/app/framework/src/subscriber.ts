import {Dispatch} from "redux"
import {ShadowRootContext} from "./shadow-root-context"

type StateTransform<S1, S2> = (state: S1) => S2

export type InvokeSubscriptionFunction<S> = (state: S, dispatch: Dispatch, domContext: ShadowRootContext) => void | any

export type CreateSubscriptionFunction<S> =
    (subscriberFunction: InvokeSubscriptionFunction<S>,
     subscriberShadowContext: ShadowRootContext) => void

export function makeSubtreeCreateSubscriptionFunction<S1, S2>(
    parentCreateSubscription: CreateSubscriptionFunction<S1>,
    stateTransform: StateTransform<S1, S2>): CreateSubscriptionFunction<S2> {

    return (invokeSubscription: InvokeSubscriptionFunction<S2>, subtreeSubscriberShadowContext: ShadowRootContext) => {
        parentCreateSubscription((
            parentState: S1,
            dispatch: Dispatch,
            domContext: ShadowRootContext) => {
                const subTreeState = stateTransform(parentState)
                invokeSubscription(subTreeState, dispatch, domContext)
            },
            subtreeSubscriberShadowContext)
    }
}
