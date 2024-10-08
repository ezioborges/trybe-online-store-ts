import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { productsReducer } from "./productsReducer";
import { purchaseCompletedReducer } from "./purchaseCompletedReducer";

const rootReducer = combineReducers({ categoriesReducer, productsReducer, purchaseCompletedReducer });

export default rootReducer;
