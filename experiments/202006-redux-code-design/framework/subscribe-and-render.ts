import {Action, Dispatch, Store} from "redux"

import {render as shadyRender, TemplateResult} from "lit-html/lib/shady-render"
import {checkState} from "../lib/util"

type StateTransform<S1, S2> = (state: S1) => S2
export type StandardReducer<S, A extends Action> = (previous: S, action: A) => S | [S, A]

export class ShadowRootContext {

    constructor(public root: ShadowRoot,
                private cssScope: CssScope) {
    }

    find<T extends HTMLElement>(selector: string): T {
        const result = this.root.querySelector(selector)
        checkState(result != null,
            `null result. expected to find a single element matching selector '${selector}' ` +
            `in html: \n${this.root.innerHTML}`)
        checkState(result!["tagName"] != null,
            `expected to find a single element matching selector ${selector} ` +
            `in html: \n${this.root.innerHTML}`)

        return (<T>result!)
    }

    initShadowRootContext(selector: string, cssScope: CssScope): ShadowRootContext {
        return new ShadowRootContext(this.find(selector).attachShadow({mode: "open"}), cssScope)
    }

    render(templateResult: TemplateResult) {
        shadyRender(
            templateResult,
            this.root,
            {scopeName: this.cssScope})
        // see https://lit-html.polymer-jp.org/api/modules/shady_render.html
        // "Adds a scopeName option which is used to scope element DOM and stylesheets when native ShadowDOM is unavailable.
        // The scopeName will be added to the class attribute of all rendered DOM."
    }
}

export type Subscriber<S> = (state: S, dispatch: Dispatch, domContext: ShadowRootContext) => void | any

export type StoreSubscriptionCreator<S> =
    (subscriberFunction: Subscriber<S>,
     subscriberShadowContext: ShadowRootContext) => void

export function makeSubscriptionCreator<S1, S2>(
    store: Store,
    stateTransform: StateTransform<S1, S2>): StoreSubscriptionCreator<S2> {

    return (subscriberFunction: Subscriber<S2>, subscriberShadowContext: ShadowRootContext) => {
        store.subscribe(() => {
            const subTreeState = stateTransform(store.getState())
            subscriberFunction(
                subTreeState,
                store.dispatch,
                subscriberShadowContext)
        })
    }
}

export enum CssScope {
    CONVERSATION_SUMMARY = "CONVERSATION_SUMMARY",
    NEW_MESSAGE_AREA = "NEW_MESSAGE_AREA",
    SELECTED_CONVERSATION = "SELECTED_CONVERSATION",
    ROOT = "ROOT",
}
