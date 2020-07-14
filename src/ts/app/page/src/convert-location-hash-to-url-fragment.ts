import {model} from "app/domain"

export function convertLocationHashToUrlFragment(locationHash: model.LocationHash): string | undefined {
    const parts: { [key: string]: string } = {}

    if (locationHash.dev && locationHash.dev.length > 0) {
        parts["dev"] = locationHash.dev.join(",")
    }

    const keys = Object.keys(parts)
    if (keys.length > 0) {
        return "#" + keys.map((k) => `${k}=${parts[k]}`).join("&")
    } else {
        return undefined
    }
}
