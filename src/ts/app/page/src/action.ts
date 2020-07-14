import {Action} from "redux"
import {model} from "app/domain"

export namespace pageAction {
    export enum Keys {
        INIT = "page/INIT",
        CTL_SHIFT_KEY_COMBO_PRESSED = "page/META_KEY_COMBO_PRESSED",
        ESCAPE_KEY_PRESSED = "page/ESCAPE_KEY_PRESSED",
        CHANGE_DEV_IN_LOCATION_HASH = "page/CHANGE_DEV_IN_LOCATION_HASH",
    }

    export interface Init extends Action<Keys> {
        type: Keys.INIT
        locationHash: model.LocationHash
    }

    export interface MetaKeyComboPressed extends Action<Keys> {
        type: Keys.CTL_SHIFT_KEY_COMBO_PRESSED
        letter: string
    }

    export interface EscapeKeyPressed extends Action<Keys> {
        type: Keys.ESCAPE_KEY_PRESSED
    }

    export interface ChangeDevInLocationHash extends Action<Keys> {
        type: Keys.CHANGE_DEV_IN_LOCATION_HASH
        dev: string[]
    }
}
