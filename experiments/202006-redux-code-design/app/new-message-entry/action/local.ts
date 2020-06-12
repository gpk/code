import {Action} from "redux"

export const enum Keys {
    POST_MESSAGE_REQUEST = "new-message-entry/POST_MESSAGE_REQUEST",
}

export interface PostMessageRequest extends Action {
    type: Keys.POST_MESSAGE_REQUEST,
    conversationToken: string,
    messageText: string
}
