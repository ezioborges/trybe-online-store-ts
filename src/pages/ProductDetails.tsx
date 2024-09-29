import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsById } from "../services/api";

import "../styles/product-details.css";
import { addProductsInShoppingCart } from "../utils/addProductsInShoppingCart";
import { PostReviewType, ProductDetailType } from "../types";
import RateBar from "../components/RateBar";
import ProductsTitleTooltip from "../components/Tooltip";

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
  const [postReview, setPostReview] = useState<PostReviewType>({
    email: "",
    review: "",
    rating: 0,
  });
  const [reviewsArray, setReviewsArray] = useState<PostReviewType[]>([]);

  const initialState = {
    email: "",
    review: "",
    rating: 0,
  };

  useEffect(() => {
    setIsLoad(true);
    const local = location.pathname.slice(17);

    const getInfosByLocation = async () => {
      const productDetails = await getProductsById(local);
      setProduct(productDetails);
      setIsLoad(false);
    };

    getInfosByLocation();
  }, []);

  const handleRating = (value: number) => {
    setPostReview((prevState) => ({
      ...prevState,
      rating: value,
    }));
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setPostReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickPost = () => {
    const reviews = postReview;
    setReviewsArray((prevArray) => [...prevArray, reviews]);
    setPostReview(initialState);
  };

  const productPrice = product.price.toFixed(2).replace(".", ",");

  const firstPicture =
    product.pictures.length > 0 ? product.pictures[0].url : "";

  if (isLoad) return <h1>Carregando...</h1>;

  return (
    <div
      className="container-fluid overflow-y-scroll overflow-auto"
      style={{ height: "100vh" }}
    >
      <div className="d-flex">
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
                  <div className="overflow-hidden" style={{ height: "38px" }}>
                    <ProductsTitleTooltip title={product.title} id="1">
                      <h3 className="text-center mb-3">{product.title}</h3>
                    </ProductsTitleTooltip>
                  </div>
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
          <div className="p-3 d-flex flex-column align-items-center">
            <h3 className="mt-2">Quantidade</h3>
            <div className="d-flex flex-row align-items-center justify-content-between w-25 p-2">
              <div className="d-flex flex-row w-50 justify-content-start">
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
              <div>
                <button className="btn btn-success">
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
          <div className="pt-3 d-flex flex-column align-items-center ">
            <h3>Avaliações</h3>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center p-2">
                <input
                  type="email"
                  placeholder="Email..."
                  name="email"
                  value={postReview.email}
                  onChange={handleChange}
                />
                <div className="ps-4 d-flex">
                  <RateBar
                    rating={postReview.rating}
                    handleRating={handleRating}
                  />
                </div>
              </div>
              <div>
                <textarea
                  className="w-100 m-1"
                  rows={5}
                  placeholder="Mensagem(opcional)"
                  name="review"
                  value={postReview.review}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary px-5 py-2 m-2"
                  onClick={handleClickPost}
                >
                  Avaliar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col border d-flex justify-content-center">
          <div>
            <h1>Comentérios</h1>
            {reviewsArray &&
              reviewsArray.map((review, i) => (
                <div
                  key={i}
                  className="pt-3 d-flex flex-column justify-content-center align-items-start border mb-3 ps-3"
                >
                  <div
                    className="d-flex align-items-center justify-content-between border-bottom"
                  >
                    <p className="m-0">{review.email}</p>
                    <RateBar rating={review.rating} />
                  </div>
                  <div className="pt-2">
                    <p><strong>Comentário:</strong> {review.review}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
