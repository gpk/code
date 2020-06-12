import {Action} from "redux"

export const enum Keys {
    SELECT = "selected-conversation/SELECT",
}

export interface Select extends Action {
    type: Keys.SELECT
    conversationToken: string
}

