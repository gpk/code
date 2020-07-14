import {Dispatch} from "redux"
import {pageAction} from "app/page"

export function installEscapeKeyActionAdapter(
    document: HTMLDocument,
    dispatch: Dispatch<pageAction.EscapeKeyPressed>) {

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            dispatch({
                type: pageAction.Keys.ESCAPE_KEY_PRESSED
            })
        }
    })
}



