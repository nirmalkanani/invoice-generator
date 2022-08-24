import { SEND_DATA, ADD_ITEM } from "./Constant";

export const SENDDATA = (item) => {
    return{
        type:SEND_DATA,
        data:item
    }
}

export const ADDITEM =(item) => {
    console.log(item)
    return{
        type:ADD_ITEM,
        data:item
    }
}