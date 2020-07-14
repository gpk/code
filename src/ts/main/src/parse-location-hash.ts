import {model} from "app/domain"

//TODO: move this and test it
export function parseLocationHash(rawHash: string): model.LocationHash {
    const result: model.LocationHash = {
        dev: []
    }

    if (!rawHash || rawHash.length == 0) {
        return result
    }

    const parsed = rawHash.replace(/^#/, "")
        .split("&")
        .reduce((h, entry) => {
            const [key, value] = entry.split("=", 2)
            h[key] = value.split(",")
            return h
        }, {} as { [key: string]: string[] })


    if (parsed.dev) {
        result.dev = parsed.dev
    }

    return result
}
