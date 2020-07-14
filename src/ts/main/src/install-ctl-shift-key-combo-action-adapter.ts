import {Dispatch} from "redux"
import {pageAction} from "app/page"

export function installCtlShiftKeyComboActionAdapter(
    document: HTMLDocument,
    dispatch: Dispatch<pageAction.MetaKeyComboPressed>) {

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.shiftKey && event.keyCode >= 65 && event.keyCode <= 90) {
            dispatch({
                type: pageAction.Keys.CTL_SHIFT_KEY_COMBO_PRESSED,
                letter: String.fromCharCode(event.keyCode)
            })
        }
    })
}



