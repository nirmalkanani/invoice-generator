 
import { configureStore} from "@reduxjs/toolkit";
import combineData from "./Redux/Reducers/CombineReducer";


export const store = configureStore({
    reducer : combineData
})