import { SEND_DATA, ADD_ITEM, DELETE_ITEM} from "./Constant";

export const SENDDATA = (item) => {
    return{
        type:SEND_DATA,
        data:item
    }
}

export const ADDITEM =(item) => {
    return{
        type:ADD_ITEM,
        data:item
    }
}

export const DELETEITEM = (id) => {
    return {
        type:DELETE_ITEM,
        data:id
    }
}