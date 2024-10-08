import { UnknownAction } from "redux";
import { SET_ADRESS_INFO, SET_PAYMENT } from "../actions";

const initialState = {
  adressInfo: {},
  payment: "",
};

export const purchaseCompletedReducer = (
  state = initialState,
  action: UnknownAction
) => {
  switch (action.type) {
    case SET_ADRESS_INFO:
      return {
        ...state,
        adressInfo: action.payload,
      };
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
};
