import { UnknownAction } from "redux";
import { ProductsType } from "../../types";
import {
  SET_PRODUCTS_BY_CATEGORIES,
  GET_PRODUCTS_BY_SEARCH,
  SET_PRODUCTS_BY_SEARCH,
  START_LOADING,
  UPDATE_QUANTITY,
  SET_PRODUCT_DETAIL,
} from "../actions";

const INITIAL_STATE = {
  searchProduct: "",
  isLoading: false,
  productsQuantity: 0,
  products: [] as ProductsType[],
  product: {},
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
        isLoading: action.payload,
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
    case UPDATE_QUANTITY:
      return {
        ...state,
        productsQuantity: action.payload,
      };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};
