import * as EditorModule from "app/editor"
import * as StorageModule from "app/storage"
import {RootState} from "app/root"

export function initRootState() : RootState {
    return {
        editorSubtree: EditorModule.initSubtree(),
        storageSubtree: StorageModule.initSubtree(),
    }
}
