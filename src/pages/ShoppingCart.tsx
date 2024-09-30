import { useEffect, useState } from "react";
import {
  addQuantity,
  decreaseQuantity,
  getProducts,
} from "../utils/localProducts";
import { useNavigate } from "react-router-dom";
import { ProductsType } from "../types";

function ShoppingCart() {
  const navigate = useNavigate();
  const [products, setProductsState] = useState<ProductsType[]>([]);

  useEffect(() => {
    const data = getProducts();
    setProductsState(data); // Inicializa o estado com os produtos do localStorage
  }, []);

  const handleAddQuantity = (product: ProductsType) => {
    addQuantity(product);

    setProductsState((prevProducts) => {
      return prevProducts.map((prod) =>
        prod.id === product.id ? { ...prod, quantity: prod.quantity + 1 } : prod
      );
    });
  };

  const handleDecreaseQuantity = (product: ProductsType) => {
    setProductsState((prevProducts) => {
      const updateProducts = prevProducts
        .map((prod) =>
          prod.id === product.id
            ? { ...prod, quantity: Math.max(prod.quantity - 1, 0) }
            : prod
        )
        .filter((prod) => prod.quantity > 0);

      if (product.quantity > 0) {
        decreaseQuantity(product);
      }

      return updateProducts;
    });
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row w-75" style={{ height: "100vh" }}>
        <div
          className="col-12 d-flex justify-content-between align-items-center"
          style={{ padding: "0 100px 0 90px" }}
        >
          <button
            className="btn btn-secondary p-3 fw-bold"
            onClick={() => navigate("/")}
          >
            Voltar para tela inicial
          </button>
          <button
            onClick={() => navigate("/shopping-summary")}
            className="btn btn-success p-3 fw-bolder"
          >
            Finalizar Compra
          </button>
        </div>
        <div
          className="d-flex justify-content-center align-items-start overflow-y-scroll overflow-auto"
          style={{ height: "85%" }}
        >
          <table className="table table-hover m-4" style={{ width: "90%" }}>
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
                <th className="py-4 text-center" scope="col">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {products && products.length > 0 ? (
                products.map((prod, i) => (
                  <tr key={i}>
                    <td
                      className="text-center align-middle"
                      style={{ width: "3%", height: "15vh" }}
                    >
                      <p>{i + 1}</p>
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ width: "30%", height: "15vh" }}
                    >
                      <p>{prod.title}</p>
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ width: "30%", height: "15vh" }}
                    >
                      <img
                        src={prod.thumbnail}
                        alt={`imagem de ${prod.title}`}
                      />
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ width: "6%", height: "15vh" }}
                    >
                      <p>R$ {prod.price.toFixed(2).replace(".", ",")}</p>
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ width: "6%", height: "15vh" }}
                    >
                      <div className="d-flex">
                        <button
                          className="btn btn-secondary"
                          style={{ width: "40px", height: "40px" }}
                          onClick={() => handleDecreaseQuantity(prod)}
                        >
                          -
                        </button>
                        <div
                          style={{ width: "40px", height: "40px" }}
                          className="border rounded d-flex align-items-center justify-content-center"
                        >
                          <span className="text-center">{prod.quantity}</span>
                        </div>
                        <button
                          className="btn btn-danger"
                          style={{ width: "40px", height: "40px" }}
                          onClick={() => handleAddQuantity(prod)}
                        >
                          +
                        </button>
                      </div>
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
    </div>
  );
}

export default ShoppingCart;
