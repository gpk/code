import {Subtree} from "./subtree"
import {render} from "./render"
import {CreateSubscriptionFunction, ShadowRootContext} from "app/framework"
import {Dispatch} from "redux"

export function subscribe(createSubtreeSubscription: CreateSubscriptionFunction<Subtree>,
                          domContext: ShadowRootContext) {

    createSubtreeSubscription(
        (subtree: Subtree, dispatch: Dispatch, domContext: ShadowRootContext) => {
            domContext.render(render(subtree.fragments))
        },
        domContext)

}
