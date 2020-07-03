export enum ConsoleFragmentType {
    STDOUT = "stdout",
    STDERR = "stderr"
}

export interface ConsoleFragment {
    type: ConsoleFragmentType
    text: string
}

export interface Subtree {
    fragments: ConsoleFragment[]
}
