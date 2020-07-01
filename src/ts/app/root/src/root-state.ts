import * as EditorModule from "app/editor"
import * as StorageModule from "app/storage"


export interface RootState {
    editorSubtree: EditorModule.Subtree,
    storageSubtree: StorageModule.Subtree
}
