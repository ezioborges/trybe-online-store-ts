/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategories } from "../../services/api";
import {
  AdressInfo,
  CategoriesType,
  Dispatch,
  ProductsType,
} from "../../types";

export const SET_CATEGOIRES = "SET_CATEGOIRES";
export const SET_PRODUCTS_BY_CATEGORIES = "SET_PRODUCTS_BY_CATEGORIES";
export const REQUEST_CATEGORIES_START = "REQUEST_CATEGORIES_START";
export const REQUEST_CATEGORIES_SUCCESSFULL = "REQUEST_CATEGORIES_SUCCESSFULL";
export const REQUEST_CATEGORIES_FAILED = "REQUEST_CATEGORIES_FAILED";
export const GET_PRODUCTS_BY_SEARCH = "GET_PRODUCTS_BY_SEARCH";
export const SET_PRODUCTS_BY_SEARCH = "SET_PRODUCTS_BY_SEARCH";
export const START_LOADING = "START_LOADING";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const SET_PRODUCT_DETAIL = "SET_PRODUCT_DETAIL";
export const SET_ADRESS_INFO = "SET_ADRESS_INFO";
export const SET_PAYMENT = "SET_PAYMENT";

export const actionSetCategories = (categories: CategoriesType[]) => ({
  type: SET_CATEGOIRES,
  payload: categories,
});

export const actionSetProductsByCategories = (products: ProductsType[]) => ({
  type: SET_PRODUCTS_BY_CATEGORIES,
  payload: products,
});

export const actionRequestCategoriesStarted = () => ({
  type: REQUEST_CATEGORIES_START,
});

export const actionResquestCategoriesSuccessful = (
  categories: CategoriesType[]
) => ({
  type: REQUEST_CATEGORIES_SUCCESSFULL,
  payload: categories,
});

export const actionRequestCategoriesFailed = (error: string[]) => ({
  type: REQUEST_CATEGORIES_FAILED,
  payload: error,
});

export const actionRequestProductsBySearch = (search: string) => ({
  type: GET_PRODUCTS_BY_SEARCH,
  payload: search,
});

export const actionSetProductsBySearch = (products: ProductsType[]) => ({
  type: SET_PRODUCTS_BY_SEARCH,
  payload: products,
});

export const actionSetLoading = (bool: boolean) => ({
  type: START_LOADING,
  payload: bool,
});

export const actionUpdateQauntity = (quantity: number) => ({
  type: UPDATE_QUANTITY,
  payload: quantity,
});

export const actionProductDetails = (product: ProductsType) => ({
  type: SET_PRODUCT_DETAIL,
  payload: product,
});

export const actionPurchaseCompleted = (adressInfo: AdressInfo) => ({
  type: SET_ADRESS_INFO,
  payload: adressInfo,
});

export const actionPayment = (payment: string | null) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionRequestCategoriesStarted());
    try {
      const response = await getCategories();
      dispatch(actionResquestCategoriesSuccessful(response));
    } catch (error: any) {
      dispatch(actionRequestCategoriesFailed(error));
    }
  };
};
