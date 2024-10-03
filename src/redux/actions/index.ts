/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategories } from "../../services/api";
import { CategoriesType, Dispatch, ProductsType } from "../../types";

export const SET_CATEGOIRES = "SET_CATEGOIRES";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const REQUEST_CATEGORIES_START = "REQUEST_CATEGORIES_START";
export const REQUEST_CATEGORIES_SUCCESSFULL = "REQUEST_CATEGORIES_SUCCESSFULL";
export const REQUEST_CATEGORIES_FAILED = "REQUEST_CATEGORIES_FAILED";

export const actionSetCategories = (categories: CategoriesType[]) => ({
  type: SET_CATEGOIRES,
  payload: categories,
});

export const actionSetProductsByCategories = (products: ProductsType[]) => ({
  type: SET_PRODUCTS,
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

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionRequestCategoriesStarted());
    try {
      const response = await getCategories();
      dispatch(actionResquestCategoriesSuccessful(response))
    } catch (error: any) {
      dispatch(actionRequestCategoriesFailed(error));
    }
  };
};
