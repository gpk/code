import {Action} from "redux"

export const enum Keys {
    POST_MESSAGE_SUCCESS = "new-message-entry/POST_MESSAGE_SUCCESS"
}

export interface PostMessageSuccess extends Action {
    type: Keys.POST_MESSAGE_SUCCESS,
}
