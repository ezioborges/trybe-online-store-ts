import { useEffect, useState } from "react";
import { getProducts } from "../utils/localProducts";

import "../styles/shopping-cart.css";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductShoppingCart[]>([]);
  console.log("🚀 ~ ShoppingCart ~ products:", products);

  type ProductShoppingCart = {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  };

  useEffect(() => {
    const data = getProducts();
    setProducts(data);
  }, []);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <button className="btn btn-primary" onClick={() => navigate("/")}>Voltar para tela inicial</button>
      </div>
      <div className="row overflow-y-scroll">
        <table className="table table-hover m-4" style={{ width: '90%', height: '50vh' }}>
          <thead className="table-dark">
            <tr>
              <th className="py-4 text-center" scope="col">
                #
              </th>
              <th className="py-4 text-center" scope="col">
                Produto
              </th>
              <th className="py-4 text-center" scope="col">
                Imagem
              </th>
              <th className="py-4 text-center" scope="col">
                Preço
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {products && products.length > 0 ? (
              products.map((prod, i) => (
                <tr key={prod.id}>
                  <td
                    className="text-center align-middle"
                    style={{ width: "3%", height: "15vh" }}
                  >
                    <p>{i + 1}</p>
                  </td>
                  <td
                    className="text-center align-middle"
                    style={{ width: "32%", height: "15vh" }}
                  >
                    <p>{prod.title}</p>
                  </td>
                  <td
                    className="text-center align-middle"
                    style={{ width: "32%", height: "15vh" }}
                  >
                    <img src={prod.thumbnail} alt={`imagem de ${prod.title}`} />
                  </td>
                  <td
                    className="text-center align-middle"
                    style={{ width: "6%", height: "15vh" }}
                  >
                    <p>R$ {prod.price.toFixed(2).replace(".", ",")}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h2>Seu carrinho está vazio</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingCart;
