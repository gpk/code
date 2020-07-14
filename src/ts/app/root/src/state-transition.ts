import * as ConsoleModule from "app/console"
import * as EditorModule from "app/editor"
import * as StorageModule from "app/storage"
import {RootState} from "app/root"

export function initRootState(): RootState {
    return {
        consoleSubtree: ConsoleModule.initSubtree(),
        editorSubtree: EditorModule.initSubtree(),
        storageSubtree: StorageModule.initSubtree(),
    }
}
