import {html, TemplateResult} from "lit-html"


export function renderRunButton(userCanStartCodeRun: boolean): TemplateResult {
    return html`<button class="run-button" ?disabled="${(!userCanStartCodeRun)}">Run</button>`
}
