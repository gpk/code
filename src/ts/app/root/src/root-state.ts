import * as ConsoleModule from "app/console"
import * as DevModule from "app/dev"
import * as EditorModule from "app/editor"
import * as PageModule from "app/page"
import * as ProgramRunModule from "app/program-run"
import * as StorageModule from "app/storage"


export interface RootState {
    consoleSubtree: ConsoleModule.Subtree,
    devSubtree: DevModule.Subtree,
    editorSubtree: EditorModule.Subtree,
    pageSubtree: PageModule.Subtree,
    programRunSubtree: ProgramRunModule.Subtree,
    storageSubtree: StorageModule.Subtree
}
