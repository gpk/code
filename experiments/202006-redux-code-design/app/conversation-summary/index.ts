// explicitly export "public" data and functionality via index.ts
// no not directly import anything other than from index.ts, from outside of a module

export {init as initState} from "./state-transition"
export {createReducer} from "./reducer"
export {subscribe} from "./subscribe"
export {Subtree} from "./subtree"
