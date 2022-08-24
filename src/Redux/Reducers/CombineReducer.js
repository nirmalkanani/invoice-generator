import { combineReducers } from "redux";
import { invoiceReducer, itemsReducer } from "./Reducer";

const combineData = combineReducers({
    invoiceReducer,
    itemsReducer
})

export default combineData