import * as ConsoleModule from "app/console"
import * as EditorModule from "app/editor"
import * as StorageModule from "app/storage"


export interface RootState {
    consoleSubtree: ConsoleModule.Subtree,
    editorSubtree: EditorModule.Subtree,
    storageSubtree: StorageModule.Subtree
}
