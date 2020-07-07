import {Subtree} from "./subtree"
import {renderInPlace} from "./render-in-place"
import {CreateSubscriptionFunction, ShadowRootContext} from "app/framework"
import {Dispatch} from "redux"

export function subscribe(createSubtreeSubscription: CreateSubscriptionFunction<Subtree>,
                          domContext: ShadowRootContext) {

    let lastResult: any = {}

    createSubtreeSubscription(
        (subtree: Subtree, dispatch: Dispatch, domContext: ShadowRootContext) => {
            lastResult = renderInPlace(subtree, dispatch, domContext, lastResult)
        },
        domContext)

}
