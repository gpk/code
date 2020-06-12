import {Action} from "redux"

export const enum Keys {
    INIT = "page/INIT",
}

export interface Init extends Action<Keys> {
    type: Keys.INIT
}

