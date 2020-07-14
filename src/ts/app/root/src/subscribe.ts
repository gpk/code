import {RootState} from "./root-state"
import * as EditorModule from "app/editor"
import * as DevModule from "app/dev"
import * as ConsoleModule from "app/console"
import * as PageModule from "app/page"
import {
    CreateSubscriptionFunction,
    CssScope,
    makeSubtreeCreateSubscriptionFunction,
    ShadowRootContext
} from "app/framework"

// registers the views local to this module with the store - using the relevant subtree as the model
// note that as of now, only one ShadowRoot gets passed in, but there's nothing preventing us from
// passing in multiple of them
export function subscribe(createRootStateSubscription: CreateSubscriptionFunction<RootState>,
                          shadowRootContext: ShadowRootContext,
                          setLocationHash: (newLocationHash: string | undefined) => void) {

    ConsoleModule.subscribe(
        makeSubtreeCreateSubscriptionFunction<RootState, ConsoleModule.Subtree>(
            createRootStateSubscription,
            (rootState) => rootState.consoleSubtree),
        shadowRootContext.initShadowRootContext(".right", CssScope.CONSOLE)
    )

    DevModule.subscribe(
        makeSubtreeCreateSubscriptionFunction<RootState, DevModule.Subtree>(
            createRootStateSubscription,
            (rootState) => rootState.devSubtree),
        shadowRootContext.initShadowRootContext(".dev", CssScope.DEV)
    )

    EditorModule.subscribe(
        makeSubtreeCreateSubscriptionFunction<RootState, EditorModule.Subtree>(
            createRootStateSubscription,
            (rootState) => rootState.editorSubtree),
        shadowRootContext.initShadowRootContext(".left", CssScope.EDITOR)
    )

    const pageModuleSubscriber = PageModule.subscribe(setLocationHash)
    createRootStateSubscription(
        (state) => {
            pageModuleSubscriber(state.pageSubtree)
        },
        shadowRootContext)

}
