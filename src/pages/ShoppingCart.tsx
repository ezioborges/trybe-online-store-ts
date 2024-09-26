import { useEffect, useState } from "react";
import { getProducts } from "../utils/localProducts";

function ShoppingCart() {
  const [products, setProducts] = useState<ProductShoppingCart[]>([]);

  type ProductShoppingCart = {
    id: string;
    title: string;
    img: string;
    price: number;
  };

  useEffect(() => {
    const data = getProducts();
    setProducts(data);
  }, []);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <ul>
        {products ? (
          products.map((prod) => (
            <li key={prod.id}>
              <p>{prod.title}</p>
              <img src={prod.img} alt={` imagem de ${prod.title}`} />
              <p>{prod.price}</p>
            </li>
          ))
        ) : (
          <h2>Seu carrinho está vazio</h2>
        )}
      </ul>
    </div>
  );
}

export default ShoppingCart;
