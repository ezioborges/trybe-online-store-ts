import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { products } from "./productsReducer";

const rootReducer = combineReducers({ categoriesReducer, products });

export default rootReducer;
