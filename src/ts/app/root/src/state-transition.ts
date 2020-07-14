import * as ConsoleModule from "app/console"
import * as DevModule from "app/dev"
import * as EditorModule from "app/editor"
import * as PageModule from "app/page"
import * as ProgramRunModule from "app/program-run"
import * as StorageModule from "app/storage"
import {RootState} from "app/root"

export function initRootState(): RootState {
    return {
        consoleSubtree: ConsoleModule.initSubtree(),
        devSubtree: DevModule.initSubtree(),
        editorSubtree: EditorModule.initSubtree(),
        pageSubtree: PageModule.initSubtree(),
        programRunSubtree: ProgramRunModule.initSubtree(),
        storageSubtree: StorageModule.initSubtree(),
    }
}
