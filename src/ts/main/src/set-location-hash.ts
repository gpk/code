export function setLocationHash(newLocationHash: string | undefined) {
    if (newLocationHash) {
        history.pushState(document.title, "", newLocationHash)
    } else {
        history.pushState("", document.title, window.location.pathname + window.location.search)
    }

}
