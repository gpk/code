import {Action} from "redux"

export namespace pageAction {
    export const enum Keys {
        INIT = "page/INIT",
    }

    export interface Init extends Action<Keys> {
        type: Keys.INIT
    }
}
