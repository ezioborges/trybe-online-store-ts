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