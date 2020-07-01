import {Subtree} from "./subtree"
import {render} from "./render"
import {CssScope, ShadowRootContext, StoreSubscriptionCreator} from "../../framework/subscribe-and-render"
import {DispatchForModule} from "./action/dispatch"

export function subscribe(subscriptionCreator: StoreSubscriptionCreator<Subtree>,
                          rootContext: ShadowRootContext) {

    let lastMessageAreaResult = {}

    subscriptionCreator(
        (
            state: Subtree,
            dispatch: DispatchForModule,
            domContext: ShadowRootContext) => {
            lastMessageAreaResult = render(
                state.currentConversationInfo,
                state.messageSubmitStatus,
                dispatch,
                domContext,
                lastMessageAreaResult)
        },
        rootContext.initShadowRootContext(".new-message-entry", CssScope.NEW_MESSAGE_AREA))

}
