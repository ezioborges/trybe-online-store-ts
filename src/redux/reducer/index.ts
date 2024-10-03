import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { productsReducer } from "./productsReducer";

const rootReducer = combineReducers({ categoriesReducer, productsReducer });

export default rootReducer;
