const PRODUCT_KEY = "products";

export const getProducts = () => {
  const products = localStorage.getItem(PRODUCT_KEY);
  return products ? JSON.parse(products) : [];
};

export const setProducts = (product: object) => {
  const products: object[] = getProducts();

  localStorage.setItem(PRODUCT_KEY, JSON.stringify([...products, product]));
};
