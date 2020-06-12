export function checkState(condition: boolean, errorMessage: string) {
    if (!condition) {
        throw new Error(errorMessage)
    }
}

export function loadMetaTagContentAsString(name: string): string {
    const element: any = document.head.querySelector(`[name=${name}]`)
    return element.content
}
