import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsById } from "../services/api";

import "../styles/product-details.css";
import { addProductsInShoppingCart } from "../utils/addProductsInShoppingCart";
import { ProductDetailType } from "../types";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetailType>({
    title: "",
    price: 0,
    pictures: [],
    quantity: 0,
  });
  const [isLoad, setIsLoad] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setIsLoad(true);
    const local = location.pathname.slice(17);

    const getInfosByLocation = async () => {
      const productDetails = await getProductsById(local);
      console.log("🚀 ~ getInfosByLocation ~ productDetails:", productDetails);
      setProduct(productDetails);
      setIsLoad(false);
    };

    getInfosByLocation();
  }, []);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const arrayRating = [1, 2, 3, 4, 5];

  const productPrice = product.price.toFixed(2).replace(".", ",");

  const firstPicture =
    product.pictures.length > 0 ? product.pictures[0].url : "";

  if (isLoad) return <h1>Carregando...</h1>;

  return (
    <div
      className="container-fluid overflow-y-scroll overflow-auto"
      style={{ height: "100vh" }}
    >
      <div className="row d-flex">
        <div className="col-sm-8 col d-flex flex-column">
          <div className="d-flex justify-content-between p-2 details col">
            <button
              onClick={() => navigate("/")}
              className="btn btn-success btn-lg ms-5"
            >
              voltar
            </button>
            <button
              className="btn btn-primary btn-lg me-5"
              onClick={() => navigate("/shopping-cart")}
            >
              carrinho de compras
            </button>
          </div>
          <div className="d-flex justify-content-center pt-4 col">
            {!isLoad && (
              <div className="d-flex flex-column align-items-center justify-content-around p-3 border rounded w-25 details">
                <div className="d-flex flex-column align-items-center">
                  <h3 className="text-center mb-3">{product.title}</h3>

                  <img
                    className="img-fluid mx-auto"
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                    src={firstPicture}
                    alt={`Imagem do produto ${product.title}`}
                  />
                  <h3 className="text-center mt-3">R$ {productPrice}</h3>
                </div>
                <div>
                  <button
                    onClick={() => addProductsInShoppingCart(product)}
                    className="btn btn-danger"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 d-flex flex-column align-items-center" style={{ border: "1px solid black" }}>
            <h3 className="mt-2">Quantidade</h3>
            <div
              className="d-flex flex-row align-items-between justify-content-between py-2"
              style={{ border: "1px solid red"}}
            >
              <div className="d-flex flex-row justify-content-around align-items-center">
                <button
                  className="btn btn-secondary"
                  style={{ width: "40px", height: "40px" }}
                >
                  -
                </button>
                <div
                  style={{ width: "40px", height: "40px" }}
                  className="border rounded"
                >
                  <p className="text-center align-middle">0</p>
                </div>
                <button
                  className="btn btn-danger"
                  style={{ width: "40px", height: "40px" }}
                >
                  +
                </button>
              </div>
                <button className="btn btn-success" style={{ marginRight: '110px' }}>
                  Adicionar ao Carrinho
                </button>
            </div>
          </div>
          <div className="pt-3">
            <h3>Avaliações</h3>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center p-2">
                <input type="email" placeholder="Email..." />
                <div className="ps-4 d-flex">
                  {arrayRating.map((rat) => (
                    <div
                      key={rat}
                      className="rating-area ms-2"
                      style={{
                        backgroundColor: rat <= rating ? "gold" : "gray",
                      }}
                      onClick={() => handleRating(rat)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <textarea
                  className="w-25 m-2"
                  rows={5}
                  placeholder="Mensagem(opcional)"
                />
              </div>
              <div>
                <button className="btn btn-primary m-2">Avaliar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <h1>Aqui vai ficar os comentérios</h1>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
