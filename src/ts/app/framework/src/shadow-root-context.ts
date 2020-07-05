import {checkState} from "lib/util"
import {CssScope} from "./css-scope"
import {TemplateResult} from "lit-html"

declare function require(name: string): any

const cssScopesUsed: CssScope[] = []

export class ShadowRootContext {

    constructor(public root: ShadowRoot,
                private cssScope: CssScope,
                // required instead of imported, in order to allow
                // ShadowRootContext to be imported, without evaluating
                // lit-html js except when running in the browser.
                // lit-html assumes the presence of "window", assumes
                // ES module loading capability, which are both special
                // issues to deal with when running in a plain nodejs environment,
                // which is how our tests execute.
                //
                // As a rule, no dom-related code is unit-tested this way -
                // instead such code is lightly flexed via in-browser end-to-end tests
                private shadyRender = require("lit-html/lib/shady-render")) {
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
        checkState(cssScopesUsed.indexOf(cssScope) < 0,
            `May not use css scope to create a shadow root more than once: ${cssScope}`)
        cssScopesUsed.push(cssScope)
        return new ShadowRootContext(this.find(selector).attachShadow({mode: "open"}), cssScope)
    }

    render(templateResult: TemplateResult, selector: string | undefined = undefined) {
        const elementTarget = selector ? this.find(selector!) : this.root

        this.shadyRender.render(
            templateResult,
            elementTarget,
            {scopeName: this.cssScope})
        // see https://lit-html.polymer-jp.org/api/modules/shady_render.html
        // "Adds a scopeName option which is used to scope element DOM and stylesheets when native ShadowDOM is unavailable.
        // The scopeName will be added to the class attribute of all rendered DOM."
    }
}
