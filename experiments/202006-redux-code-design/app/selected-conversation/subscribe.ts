import {Subtree} from "./subtree"
import {render} from "./render"
import {Dispatch} from "redux"
import {CssScope, ShadowRootContext, StoreSubscriptionCreator} from "../../framework/subscribe-and-render"

export function subscribe(subscriptionCreator: StoreSubscriptionCreator<Subtree>,
                          rootContext: ShadowRootContext) {
    subscriptionCreator(
        (
            state: Subtree,
            dispatch: Dispatch,
            domContext: ShadowRootContext) =>
            domContext.render(render(state.currentConversation)),
        rootContext.initShadowRootContext(".selected-conversation", CssScope.SELECTED_CONVERSATION))
}
