import { UnknownAction } from "redux";
import { ProductsType } from "../../types";
import {
  SET_PRODUCTS_BY_CATEGORIES,
  GET_PRODUCTS_BY_SEARCH,
  SET_PRODUCTS_BY_SEARCH,
  START_LOADING,
} from "../actions";

const INITIAL_STATE = {
  searchProduct: "",
  isLoading: false,
  products: [] as ProductsType[],
};

export const productsReducer = (
  state = INITIAL_STATE,
  action: UnknownAction
) => {
  switch (action.type) {
    case SET_PRODUCTS_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_BY_SEARCH:
      return {
        ...state,
        searchProduct: action.payload,
      };
    case SET_PRODUCTS_BY_SEARCH:
      return {
        ...state,
        products: action.payload,
        searchProduct: "",
        isLoading: false,
      };
    default:
      return state;
  }
};
