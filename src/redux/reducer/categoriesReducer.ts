import {
  REQUEST_CATEGORIES_FAILED,
  REQUEST_CATEGORIES_START,
  REQUEST_CATEGORIES_SUCCESSFULL,
} from "../actions";
import { CategoriesType } from "../../types";

type CategoriesAction = {
  type: string;
  payload: CategoriesType[];
};

const INITIAL_STATE = {
  isLoading: false,
  errorMessages: [],
  categories: [] as CategoriesType[],
};

export const categoriesReducer = (state = INITIAL_STATE, action: CategoriesAction) => {
  switch (action.type) {
    case REQUEST_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_CATEGORIES_SUCCESSFULL:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };
    case REQUEST_CATEGORIES_FAILED:
      return {
        ...state,
        errorMessages: action.payload,
        categories: [],
        isLoading: false,
      };
    default:
      return state;
  }
};
