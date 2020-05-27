import "../../shipping-container-types/types"

const x = "hello world 2"

const y: shippingContainer.Container = {
    weight: 50000,
    company: "COSCO",
    size: shippingContainer.ContainerSize.FULL
}

export interface Truck {
    wheels: number,
    payload?: shippingContainer.Container
}

function loadTruck(truck: Truck, container: shippingContainer.Container): Truck {
    return {...truck, payload: container}
}
