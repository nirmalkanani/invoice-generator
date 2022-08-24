import {
    ADD_ITEM,
    SEND_DATA
} from "../Actions/Constant";

const INITIAL_STATE = {
    invoiceData: []
}

const INITIAL_ITEM = {
    items:[]
}

export const invoiceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_DATA:
            return {
                ...state,
                invoiceData: [...state.invoiceData, action.data]
            }

            default:
                return state
    }

}

export const itemsReducer = ( state = INITIAL_ITEM, action) => {
    switch(action.type){
        case ADD_ITEM: 
        return{
            ...state,
            items: [ ...state.items, action.data]
        }
        default:
                return state
    }
}