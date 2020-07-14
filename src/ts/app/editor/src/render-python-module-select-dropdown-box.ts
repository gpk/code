import {html, TemplateResult} from "lit-html"
import {model} from "app/domain"
import {DispatchedAction, localAction} from "./action"
import {Dispatch} from "redux"

export function renderPythonModuleSelectDropdownBox(pythonModules: model.PythonModule[],
                                                    selectedModuleIndex: number,
                                                    dispatch: Dispatch<DispatchedAction>): TemplateResult {

    function dispatchChangeSelectedModule(event: any) {
        dispatch({
            type: localAction.Keys.CHANGE_PYTHON_MODULE_IN_EDITOR,
            pythonModuleIndex: parseInt(event.target.value)
        })
    }

    return html`
        <select @change="${dispatchChangeSelectedModule}">
            ${pythonModules.map((m, i) =>
        html`<option value="${i}" ?selected="${i == selectedModuleIndex}">${m.name}</option>`)}
        </select>
    `
}
