import {FileChangeType, Subtree} from "./subtree"
import produce from "immer"

export function initSubtree(): Subtree {
    return {
        documentCollection: {
            documents: [],
            nameToDocument: {}
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

                    if (draft.documentCollection.nameToDocument[fileChange.name] &&
                        draft.documentCollection.nameToDocument[fileChange.name].content == fileChange.content) {
                        break
                    }

                    let assignedName = fileChange.name
                    if (draft.documentCollection.nameToDocument[assignedName]) {
                        let i = 1
                        while (draft.documentCollection.nameToDocument[assignedName]) {
                            i += 1
                            assignedName = `${fileChange.name}_${i}`
                        }
                    }

                    draft.documentCollection.documents.push({
                        name: assignedName,
                        content: fileChange.content
                    })
            }

            draft.documentCollection.nameToDocument = {}
            draft.documentCollection.documents
                .forEach((d) => draft.documentCollection.nameToDocument[d.name] = d)
        })
    })
}
