import {html, TemplateResult} from "lit-html"
import {ConsoleFragment} from "./subtree"



export function render(fragments: ConsoleFragment[]): TemplateResult {
    return html`
        <style>
        
        div {
            width: 100%;
            overflow: hidden;
            white-space: pre;
            font-family: monospace;
        }
        
        .stdout {
            color: green
        }

        .stderr {
            color: orange
        }
        </style>
        
        <div>${fragments.map((f) => html`<span class="${f.type}">${f.text}</span>`)}</div>
    `
}
