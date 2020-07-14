import {html, TemplateResult} from "lit-html"
import {model} from "../domain"
import {selectedConversationAction} from "../selected-conversation"
import {DispatchForModule} from "./action/dispatch"

function renderConversationSummary(summary: model.ConversationSummary,
                                   dispatch: DispatchForModule): TemplateResult {

    // prefer defining a local function just before the template.
    // minimize the code that's inline in the template (as a rule, > 1 LoC in a template = bad)
    // source formatters don't do well with inline code.
    function dispatchConversationSelect() {
        dispatch({
            type: selectedConversationAction.Keys.SELECT,
            conversationToken: summary.conversationToken,
        })
    }

    return html`
        <div @click="${dispatchConversationSelect}" class="conversation-summary">
            Summary: ${summary.latestMessage ? summary.latestMessage!.text : ""}
        </div>`
}

export function render(summaries: model.ConversationSummary[],
                       dispatch: DispatchForModule): TemplateResult {

    return html`
    <style>
        div {
            background-color: lime; /* without shadow-dom isolation provided by shady-render, this style would leak out */
        }
        
        .conversation-summary {
            cursor: pointer;
        }
    </style>
    <div>Summaries: ${summaries.map((s) => renderConversationSummary(s, dispatch))}</div>
    `
}
