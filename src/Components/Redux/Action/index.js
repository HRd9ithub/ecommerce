export const addItem = (product) => {
    return {
        type: "ADDITEM",
        payload: product

    }
}
export const delItem = (product) => {
    return {
        type: "DELITEM",
        payload: product

    }
}
export const Increment = (items) => {
    return {
        type: "INCNUM",
        payload: items

    }
}
export const empty = () => {
    return {
        type: "EMPTY"
    }
}
export const Decrement = (items) => {
    return {
        type: "DECNUM",
        payload: items

    }
}
