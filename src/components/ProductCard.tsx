import { ProcutsCardType } from "../types";

import "../styles/product-card.css";

function ProductCard({ title, img, price }: ProcutsCardType) {
  const productPrice = price.toFixed(2).replace(".", ",");
  return (
    <div className="border p-3 rounded product-card ms-3">
      <p className="text-center">{title}</p>
      <img src={img} alt={`foto do produto ${title}`} className="mt-1" />
      <p className="mt-1">R$ {productPrice}</p>
    </div>
  );
}

export default ProductCard;
