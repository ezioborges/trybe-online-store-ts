import { ThunkDispatch } from "redux-thunk";
import { UnknownAction } from "redux";

export type CategoriesType = {
  id: string;
  name: string;
};

export type ProductsType = {
  id?: string;
  title: string;
  img?: string | undefined;
  pictures: { url: string }[];
  thumbnail?: string;
  price: number;
  quantity: number;
};

export type PostReviewType = {
  email: string;
  review: string;
  rating: number;
};

export type RateBarType = {
  rating: number;
  handleRating?: (value: number) => void;
};

export type AdressInfo = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cep: string;
  adress: string;
  complemente: string;
  number: string;
  city: string;
  state: string;
};

export type CategoriesStateType = {
  categoriesReducer: CategoriesType[];
};

export type ProductsStateType = {
  products: ProductsType[];
};

export type RootState = CategoriesStateType & ProductsStateType;

export type Dispatch = ThunkDispatch<RootState, null, UnknownAction>;
