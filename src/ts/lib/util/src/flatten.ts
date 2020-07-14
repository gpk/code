export function flatten(arr: any[]): any[] {
    return arr.reduce(
        (acc, val) => (
            Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)
        ),
        [],
    )
}
