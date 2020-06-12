export interface StateImportDefinition<M, S> {
    mapTypesToImport: M[]
    importer: (previous: S, recordBasedStateHasChanged: boolean, ...maps: Map<string, any>[]) => S
}
