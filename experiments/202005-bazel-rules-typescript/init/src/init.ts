import {createTruck} from "../../truck/src/truck"
import {putContainerOnBoat} from "../../boat/src/boat"

createTruck()
putContainerOnBoat({
    weight: 30000,
    company: "Maersk",
    size: ContainerSize.HALF
})
