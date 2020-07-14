import {Subtree} from "./subtree"
import {render} from "./render"
import {CreateSubscriptionFunction, ShadowRootContext} from "app/framework"
import {Dispatch} from "redux"

export function subscribe(createEditorSubtreeSubscription: CreateSubscriptionFunction<Subtree>,
                          domContext: ShadowRootContext) {

    let lastResult = {}

    createEditorSubtreeSubscription(
        (subtree: Subtree, dispatch: Dispatch, domContext: ShadowRootContext) => {
            lastResult = render(subtree, domContext, lastResult)
        },
        domContext)

}
