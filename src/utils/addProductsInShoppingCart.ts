import { setProducts } from "./localProducts";

export const addProductsInShoppingCart = (product: object) => {
  return setProducts(product);
};
