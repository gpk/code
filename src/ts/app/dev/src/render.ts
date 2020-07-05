import {html, TemplateResult} from "lit-html"
import {Dispatch} from "redux"
import {DispatchedAction, localAction} from "./action"

export function render(open: boolean, dispatch: Dispatch<DispatchedAction>): TemplateResult {
    if (open) {
        return html`
            <style>
                .frame {
                    width: calc(100% - 6px - 20px);
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: yellow;
                    border: 3px solid red;
                    padding: 10px;
                    z-index: 99;
                }
            </style>
            
            <div class="frame">
                <button @click="${() => dispatch({type: localAction.Keys.DROP_FILE_HELLO})}">
                    file drop: foo.py/hello
                </button>
            </div>
        `
    } else {
        return html`
            <div></div>
        `
    }
}
