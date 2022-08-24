import { UPDATEITEMDESCRIPTION, UPDATEITEMNAME, UPDATEITEMQTY, UPDATEITEMRATE } from "../Actions/Action";
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
        case UPDATEITEMNAME: 
        const updateName = state.items.map((element) => element.id === action.data.id ? action.data : element)
        return{
            ...state,
            items: updateName
        }
        case UPDATEITEMDESCRIPTION: 
        const updateDescription = state.items.map((element) => element.id === action.data.id ? action.data : element)
        return{
            ...state,
            items: updateDescription
        }
        case UPDATEITEMQTY: 
        const updateQty = state.items.map((element) => element.id === action.data.id ? action.data : element)
        return{
            ...state,
            items: updateQty
        }
        case UPDATEITEMRATE: 
        const updateRate = state.items.map((element) => element.id === action.data.id ? action.data : element)
        return{
            ...state,
            items: updateRate
        }
        default:
                return state
    }
}