declare namespace shippingContainer {
    const enum ContainerSize {
        HALF,
        FULL,
        SPECIAL
    }

    interface Container {
        company: string,
        weight: number,
        size: ContainerSize
    }
}



