import {RootState} from "./root-state"
import * as EditorModule from "app/editor"
import * as ConsoleModule from "app/console"
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
                          shadowRootContext: ShadowRootContext) {
    EditorModule.subscribe(
        makeSubtreeCreateSubscriptionFunction<RootState, EditorModule.Subtree>(
            createRootStateSubscription,
            (rootState) => rootState.editorSubtree),
        shadowRootContext.initShadowRootContext(".left", CssScope.EDITOR)
    )

    ConsoleModule.subscribe(
        makeSubtreeCreateSubscriptionFunction<RootState, ConsoleModule.Subtree>(
            createRootStateSubscription,
            (rootState) => rootState.consoleSubtree),
        shadowRootContext.initShadowRootContext(".right", CssScope.CONSOLE)
    )
}
