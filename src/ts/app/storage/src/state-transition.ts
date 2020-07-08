import {FileChangeType, Subtree} from "./subtree"
import produce from "immer"

export function initSubtree(): Subtree {
    return {
        documentCollection: {
            pythonModules: [],
            nameToPythonModule: {}
        },

        lastDocumentChangeIndexApplied: 0,
        documentChanges: []
    }
}


export function fileDropped(previous: Subtree, name: string, content: string): Subtree {
    return applyNextFileChanges(
        produce(previous, draft => {
            draft.documentChanges.push({
                type: FileChangeType.ADD_PYTHON_MODULE,
                name: name,
                content: content
            })
        }))
}

export function applyNextFileChanges(previous: Subtree) {
    return produce(previous, draft => {
        previous.documentChanges.slice(previous.lastDocumentChangeIndexApplied).forEach((fileChange) => {
            switch (fileChange.type) {
                case(FileChangeType.ADD_PYTHON_MODULE):

                    if (draft.documentCollection.nameToPythonModule[fileChange.name]?.content === fileChange.content) {
                        break
                    }

                    let assignedName = fileChange.name
                    if (draft.documentCollection.nameToPythonModule[assignedName]) {
                        let i = 1
                        while (draft.documentCollection.nameToPythonModule[assignedName]) {
                            i += 1
                            assignedName = `${fileChange.name}_${i}`
                        }
                    }

                    draft.documentCollection.pythonModules.push({
                        name: assignedName,
                        content: fileChange.content
                    })
            }

            draft.documentCollection.nameToPythonModule = {}
            draft.documentCollection.pythonModules
                .forEach((d) => draft.documentCollection.nameToPythonModule[d.name] = d)
        })
    })
}
