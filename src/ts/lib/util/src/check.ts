export function checkState(condition: boolean, errorMessage: string) {
    if (!condition) {
        throw new Error(errorMessage)
    }
}

// By using an "eval"-like to return the object fed in, this
// causes tsc to complain when we don't exhaustively handle a type of thing,
// but also return the value when (in reality, at runtime) the code is handling
// a more expansive set of possible states.
//
// (This is possibly some combo of evil, stupid, or too-clever-by-half. Alternative suggestions certainly welcome.)
export const checkExhaustiveAndReturn: (exhaustiveCheckBasis: never, thingToAlwaysReturn: any) => never =
    (<any>new Function("exhaustiveCheckBasis", "thingToAlwaysReturn", "return thingToAlwaysReturn"))
