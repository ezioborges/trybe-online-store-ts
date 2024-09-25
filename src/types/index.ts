export type CategoriesType = {
  id: string;
  name: string;
};

export type ProcutsCardType = {
  id?: string;
  title: string;
  img: string | undefined;
  thumbnail?: string;
  price: number;
};

export type ProductDetailType = {
  title: string;
  price: number;
  pictures: { url: string }[];
  quantity: number;
};
