import { ProductsType } from "../types";

const PRODUCT_KEY = "products";

export const getProducts = () => {
  const products = localStorage.getItem(PRODUCT_KEY);
  return products ? JSON.parse(products) : [];
};

export const setProducts = (product: object) => {
  const products: object[] = getProducts();

  const updatedProduct = {
    ...product,
    quantity: 1,
  };

  localStorage.setItem(
    PRODUCT_KEY,
    JSON.stringify([...products, updatedProduct])
  );
};

export const addQuantity = (product: ProductsType) => {
  const products: ProductsType[] = getProducts();

  const updateProducts = products.map((prod) => {
    if (prod.id === product.id) {
      return {
        ...prod,
        quantity: prod.quantity + 1,
      };
    }
    return prod;
  });
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updateProducts));
};

export const decreaseQuantity = (product: ProductsType) => {
  const products: ProductsType[] = getProducts();

  const updateProducts = products.map((prod) => {
    if (prod.id === product.id) {
      return {
        ...prod,
        quantity: prod.quantity > 0 ? prod.quantity - 1 : 0,
      };
    }
    return prod;
  });
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updateProducts))
};
