import {html, TemplateResult} from "lit-html"
import {Dispatch} from "redux"
import {DispatchedAction} from "./action"
import {programRunAction} from "app/program-run"
import {model} from "app/domain"


export function renderRunButton(userCanStartCodeRun: boolean,
                                currentPythonModule: model.PythonModule,
                                dispatch: Dispatch<DispatchedAction>): TemplateResult {

    function dispatchKickoffRun() {
        if (userCanStartCodeRun) {
            dispatch({
                type: programRunAction.Keys.KICKOFF_RUN,
                pythonModule: currentPythonModule
            })
        }
    }

    return html`
        <button 
            class="run-button" 
            ?disabled="${(!userCanStartCodeRun)}"
            @click="${dispatchKickoffRun}">Run</button>`
}
