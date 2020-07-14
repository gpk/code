import {Subtree} from "./subtree"
import {convertLocationHashToUrlFragment} from "./convert-location-hash-to-url-fragment"

export function subscribe(setLocationHash: (newLocationHash: string | undefined) => void): (subtree: Subtree) => void {
    let lastLocationHash: string | undefined

    return function (subtree: Subtree) {
        const newLocationHash = convertLocationHashToUrlFragment(subtree.locationHash)
        if (newLocationHash != lastLocationHash) {
            setLocationHash(newLocationHash)
            lastLocationHash = newLocationHash
        }
    }
}
