import CodeMirror from "codemirror"
import {html} from "lit-html"
import {ConversationStatus, CurrentConversationInfo, MessageSubmitStatus} from "./subtree"
import {ShadowRootContext} from "../../framework/subscribe-and-render"
import * as localAction from "./action/local"
import {DispatchForModule} from "./action/dispatch"

interface NewMessageEntryResult {
    editor?: CodeMirror.Editor
}

// This is an interesting challenge for view definition, because
// a CodeMirror editor will not properly render unless the element
// fed to the constructor is already attached into the dom (and visible).
//
// So, the call to construct the codemirror element must come *after* the
// element is created/rendered and is in the dom.

export function render(
    currentConversationInfo: CurrentConversationInfo,
    messageSubmitStatus: MessageSubmitStatus,
    dispatch: DispatchForModule,
    domContext: ShadowRootContext,
    lastResult: NewMessageEntryResult): NewMessageEntryResult {


    const submitFunction =
        currentConversationInfo.status == ConversationStatus.LOADED ?
            () => dispatch({
                type: localAction.Keys.POST_MESSAGE_REQUEST,
                conversationToken: currentConversationInfo.conversationToken!,
                messageText: lastResult.editor!.getValue(),
            }) :
            () => {
            }

    if (lastResult.editor) {
        const submitButton = domContext.find<HTMLButtonElement>("button")
        if (messageSubmitStatus == MessageSubmitStatus.SUBMITTING) {
            submitButton.disabled = true
            submitButton.onclick = () => {
            }
        } else {
            submitButton.disabled = false
            submitButton.onclick = submitFunction
        }

        return {editor: lastResult.editor}
    } else {
        // 1) render html, so that there's an editor element to select
        domContext.render(
            html`
                <link rel="stylesheet" href="node_modules/codemirror/lib/codemirror.css"/>
                <style>                
                    :host {
                        background-color: blue;
                        
                        display: flex;
                        flex-direction: row;
                    }
                    
                    .editor {
                        width: 100%;
                        overflow: hidden;
                    }
                </style>
                <div class="editor">
                
                </div>
                <button class="submit-button">Submit</button>
            `)

        // 2) init codemirror using the edirot element
        const editor = CodeMirror(domContext.find(".editor"))

        // 3) attach an onclick on to the button element, which references codemirror editor content
        domContext.find("button").onclick = submitFunction

        return {editor: editor}
    }
}
