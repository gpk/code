import {render} from "./render"
import {Subtree} from "./subtree"
import {CssScope, ShadowRootContext, StoreSubscriptionCreator} from "../../framework/subscribe-and-render"
import {DispatchForModule} from "./action/dispatch"

// registers the views local to this module with the store - using the relevant subtree as the model
// note that as of now, only one ShadowRoot gets passed in, but there's nothing preventing us from
// passing in multiple of them
export function subscribe(subscriptionCreator: StoreSubscriptionCreator<Subtree>,
                          rootContext: ShadowRootContext) {

    subscriptionCreator(
        (
            state: Subtree,
            dispatch: DispatchForModule,
            domContext: ShadowRootContext) =>
            domContext.render(render(state.summaries, dispatch)),
        rootContext.initShadowRootContext(".conversation-list", CssScope.CONVERSATION_SUMMARY))
}
import {model} from "../domain"

// all subtree state is kept here.
// domain model data definitions are always prefixed with "model"

export interface Subtree {
    fetchAllRequestsMadeCounter: number
    summaries: model.ConversationSummary[]
}

