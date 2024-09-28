export type CategoriesType = {
  id: string;
  name: string;
};

export type ProductsType = {
  id?: string;
  title: string;
  img: string | undefined;
  pictures?: [];
  thumbnail?: string;
  price: number;
  quantity: number;
};

export type ProductDetailType = {
  title: string;
  price: number;
  pictures: { url: string }[];
  quantity: 0;
};

export type PostReviewType = {
  email: string;
  review: string;
  rating: number;
};
