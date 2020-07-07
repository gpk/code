import {CssScope, ShadowRootContext} from "app/framework"
import {Subtree} from "./subtree"
import {renderCodeEditorInPlace} from "./render-code-editor-in-place"
import {html} from "lit-html"
import {renderRunButton} from "./render-run-button"
import {Dispatch} from "redux"
import {DispatchedAction} from "./action"

interface RenderInPlaceResult {
    codeEditorResult: any
    codeEditorShadowRootContext: ShadowRootContext
}


export function renderInPlace(subtree: Subtree,
                              dispatch: Dispatch<DispatchedAction>,
                              domContext: ShadowRootContext,
                              lastResult: RenderInPlaceResult): RenderInPlaceResult {

    let codeEditorShadowRootContext: ShadowRootContext

    if (lastResult.codeEditorShadowRootContext) {
        codeEditorShadowRootContext = lastResult.codeEditorShadowRootContext
    } else {
        domContext.render(
            html`
            <style>
            </style>
            <div>
                <div class="header"></div>
                <div class="code-editor"></div>
            </div>
            
        `)

        codeEditorShadowRootContext = domContext.initShadowRootContext(".code-editor", CssScope.CODE_EDITOR)
    }

    domContext.render(
        renderRunButton(subtree.userCanStartCodeRun, subtree.nextContent.document, dispatch),
        ".header")

    return {
        codeEditorResult:
            renderCodeEditorInPlace(
                subtree,
                codeEditorShadowRootContext,
                lastResult.codeEditorResult || {}),
        codeEditorShadowRootContext: codeEditorShadowRootContext
    }
}
