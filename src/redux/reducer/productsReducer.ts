import { ProductsType } from "../../types";
import { SET_PRODUCTS } from "../actions";

const INITIAL_STATE = {
  products: [] as ProductsType[],
};

type ProductAction = {
  type: string;
  payload: ProductsType[];
};

export const products = (state = INITIAL_STATE, action: ProductAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};
