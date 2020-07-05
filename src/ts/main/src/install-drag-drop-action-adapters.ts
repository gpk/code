import {storageAction} from "app/storage"
import {Dispatch} from "redux"

export function installDragDropActionAdapaters(document: HTMLDocument,
                                               dispatch: Dispatch<storageAction.ReceiveDroppedFile>) {
    document.body.ondragover = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    document.body.ondrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        //There's a lot that needs to be done to:
        // - handle only file types we actually support
        // - handle multiple files
        // - put in place other defensiveness like checking files sizes and such
        //
        // This functionality should be considered prototype/demonstration-quality for now.

        const fileList = e.dataTransfer!.files
        for (let i = 0; i < fileList.length; i++) {
            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                dispatch({
                    type: storageAction.Keys.RECEIVE_DROPPED_FILE,
                    name: fileList[i].name,
                    content: (<string>event.target!.result)
                })
            })
            reader.readAsText(fileList[i])
        }
    }


}
