import { ProductsType } from "../types";
import { getProducts } from "./localProducts";

export const getQuantity = () => {

  const quantityShopping: ProductsType[] = getProducts();

  if (quantityShopping.length > 0) {
    const resultQuantities = quantityShopping.map((quant) => quant.quantity);
    const quantity = resultQuantities.reduce(
      (acc, quantity) => acc + quantity,
      0
    );
    return quantity;
  }
};
