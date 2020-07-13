import {html, TemplateResult} from "lit-html"
import {CurrentConversation} from "./subtree"
import {Message} from "../domain/model"

function renderMessage(message: Message): TemplateResult {
    return html`
    <li>From: ${message.from}
        <br/>
        ${message.text}
    </li>`
}

function renderConversationMessages(messages: Message[]): TemplateResult {
    return html`<ul>${messages.map((m) => renderMessage(m))}</ul>`
}

export function render(currentConversation: CurrentConversation): TemplateResult {
    if (currentConversation) {
        return html`<div>${renderConversationMessages(currentConversation.messages)}</div>`
    } else {
        return html`<div>(init)</div>`
    }
}
