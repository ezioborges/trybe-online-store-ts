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
