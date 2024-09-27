export type CategoriesType = {
  id: string;
  name: string;
};

export type ProductsType = {
  id?: string;
  title: string;
  img: string | undefined;
  thumbnail?: string;
  price: number;
  quantity: number;
};
