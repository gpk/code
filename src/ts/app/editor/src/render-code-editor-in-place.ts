import {html} from "lit-html"
import CodeMirror from "codemirror"
import {ShadowRootContext} from "app/framework"
import {codeMirrorCss} from "./codemirror-css"
import {Subtree} from "./subtree"

interface RenderCodeEditorInPlaceResult {
    editor?: CodeMirror.Editor
}

export function renderCodeEditorInPlace(subtree: Subtree,
                                        domContext: ShadowRootContext,
                                        lastResult: RenderCodeEditorInPlaceResult): RenderCodeEditorInPlaceResult {

    let result: RenderCodeEditorInPlaceResult = lastResult

    if (!lastResult.editor) {
        domContext.render(
            html`
                <style>
                
                ${codeMirrorCss}
                                
                .editor {
                    width: 100%;
                    overflow: hidden;
                }
                </style>
                <div class="editor"></div>
            `)

        const editor = CodeMirror(domContext.find(".editor"))

        result = {editor: editor}
    }

    if (subtree.nextContent.setOnCounter == subtree.updateCounter) {
        result.editor!.getDoc()
            .setValue(subtree.documentCollection.pythonModules[subtree.nextContent.pythonModuleIndex].content)
    }

    return result
}
