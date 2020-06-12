import * as localAction from "./local"
import {Dispatch} from "redux"

export type DispatchForModule = Dispatch<localAction.PostMessageRequest>
