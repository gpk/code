export function delay<T>(delayMs: number, f?: () => Promise<T>): Promise<T> {
    return new Promise<T>(function (resolve) {
        setTimeout(function () {
            if (f) {
                resolve(f!())
            } else {
                resolve()
            }

        }, delayMs)
    })
}
