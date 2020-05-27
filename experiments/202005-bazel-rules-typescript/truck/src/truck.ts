import "../../shipping-container/src/container"

const x = "hello world 2"

const y: Container = {
    weight: 50000,
    company: "COSCO",
    size: ContainerSize.FULL
}

export interface Truck {
    wheels: number,
    payload?: Container
}

export function createTruck(): Truck {
    return {
        wheels: 18
    }
}

export function loadTruck(truck: Truck, container: Container): Truck {
    return {...truck, payload: container}
}
