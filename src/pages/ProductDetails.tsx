import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsById } from "../services/api";
import { ProductDetailType } from "../types";

import "../styles/product-details.css";
import { addProductsInShoppingCart } from "../utils/addProductsInShoppingCart";

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

  const productPrice = product.price.toFixed(2).replace(".", ",");

  const firstPicture =
    product.pictures.length > 0 ? product.pictures[0].url : "";

  if (isLoad) return <h1>Carregando...</h1>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between p-4 details">
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
      <div
        style={{ height: "80vh" }}
        className="d-flex justify-content-center pt-4"
      >
        {!isLoad && (
          <div
            style={{ height: "70vh" }}
            className="d-flex flex-column align-items-center justify-content-around p-3 border rounded w-25 details"
          >
            <div className="d-flex flex-column align-items-center">
              <h3 className="text-center mb-3">{product.title}</h3>

              <img
                className="img-fluid mx-auto"
                style={{ maxWidth: "400px", maxHeight: "350px" }}
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
    </div>
  );
}

export default ProductDetails;
