import { SEND_DATA, ADD_ITEM, UPDATE_ITEMNAME , UPDATE_ITEMDESCRIPTION, UPDATE_ITEMQTY, UPDATE_ITEMRATE} from "./Constant";

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

export const UPDATEITEMNAME =(item) => {
    console.log(item)
    return{
        type:UPDATE_ITEMNAME,
        data:item
    }
}
export const UPDATEITEMDESCRIPTION =(item) => {
    console.log(item)
    return{
        type:UPDATE_ITEMDESCRIPTION,
        data:item
    }
}
export const UPDATEITEMQTY =(item) => {
    console.log(item)
    return{
        type:UPDATE_ITEMQTY,
        data:item
    }
}
export const UPDATEITEMRATE =(item) => {
    console.log(item)
    return{
        type:UPDATE_ITEMRATE,
        data:item
    }
}