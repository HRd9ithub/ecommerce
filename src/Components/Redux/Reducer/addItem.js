const addItem = [];

const addItems = (state = addItem, action) => {
    switch (action.type) {
        case "ADDITEM":
            const itemIndex = state.findIndex((item) => {
                return item.id === action.payload.id
            })
            // console.log(itemIndex, "22217897289");
            if (itemIndex === -1) {
                return [
                    ...state,
                    action.payload,

                ]
            } else {
                return state = state.map(curElem =>

                    curElem.id === action.payload.id ? {
                        ...curElem,
                        quantity: curElem.quantity + 1
                    } :
                    curElem,
                    // console.log(action.payload, '2121212')
                )
            }


            break;
        case "DELITEM":
            return state = state.filter((x) => {
                return x.id !== action.payload.id
            })

            break;
        case "INCNUM":
            return state = state.map(curElem =>

                curElem.id === action.payload.id ? {
                    ...curElem,
                    quantity: curElem.quantity + 1
                } :
                curElem,
                // console.log(action.payload, '2121212')
            )

            break;

        case "DECNUM":
            return state = state.map(curElem =>
                curElem.id === action.payload.id && action.payload.quantity > 1 ? {
                    ...curElem,
                    quantity: curElem.quantity - 1
                } :
                curElem,
            )
        default:
            return state;
            break;
            case "EMPTY":
                return state = [];
                
    }
   

}

export default addItems;