import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsById } from "../services/api";
import "../styles/product-details.css";
import {
  Dispatch,
  PostReviewType,
  ProductsReducerType,
  ProductsType,
} from "../types";
import RateBar from "../components/RateBar";
import ProductsTitleTooltip from "../components/Tooltip";
import {
  addQuantity,
  decreaseQuantity,
  getProducts,
} from "../utils/localProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  actionProductDetails,
  actionSetLoading,
  actionUpdateQauntity,
} from "../redux/actions";

function ProductDetails() {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const quantity = useSelector(
    (state: ProductsReducerType) => state.productsReducer.productsQuantity
  );
  const product = useSelector(
    (state: ProductsReducerType) => state.productsReducer.product
  );
  const loading = useSelector(
    (state: ProductsReducerType) => state.productsReducer.isLoading
  );

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
    const fetchData = async () => {
      dispatch(actionSetLoading(true));
      const local = location.pathname.slice(17);

      try {
        const productDetails = await getProductsById(local);
        const storedProducts = await getProducts();
        const storedProduct = storedProducts.find(
          (prod: ProductsType) => prod.id === productDetails.id
        );

        // Se o produto já está no localStorage, defina a quantidade correta
        const quantityInStorage = storedProduct ? storedProduct.quantity : 0;

        // Atualize o estado do produto com a quantidade correta
        dispatch(
          actionProductDetails({
            ...productDetails,
            quantity: quantityInStorage,
          })
        );
      } catch (error) {
        console.error("Erro ao carregar os dados do produto:", error);
      } finally {
        dispatch(actionSetLoading(false));
      }
    };

    fetchData();
    const initializeCarQuantity = async () => {
      const storedProducts: ProductsType[] = await getProducts();
      const totalQuantity = storedProducts.reduce((acc, products) => acc + products.quantity, 0);

      dispatch(actionUpdateQauntity(totalQuantity))
    };

    initializeCarQuantity();
  }, [dispatch, location.pathname]);

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

    if (name === "quantity") {
      const numberValue = parseInt(value, 10);
      if (!isNaN(numberValue)) {
        const updateProduct = {
          ...product,
          quantity: numberValue,
        };
        dispatch(actionProductDetails(updateProduct));
      }
    } else {
      setPostReview((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleClickPost = () => {
    const reviews = postReview;
    setReviewsArray((prevArray) => [...prevArray, reviews]);
    setPostReview(initialState);
  };

  const handleIncrement = async () => {
    addQuantity(product);
    const newQuantity = product.quantity + 1;
    const currentCartShopping: ProductsType[] = await getProducts();
    const totalQuantity = currentCartShopping.reduce(
      (acc, prod) => acc + prod.quantity,
      0
    );

    dispatch(actionProductDetails({ ...product, quantity: newQuantity }));
    dispatch(actionUpdateQauntity(totalQuantity));
  };

  const handleDecrement = async () => {
    if (product.quantity > 0) {
      decreaseQuantity(product);
      const newQuantity = Math.max(product.quantity - 1, 0);
      const currentCarShopping: ProductsType[] = await getProducts();
      const totalQuantity = currentCarShopping.reduce(
        (acc, products) => acc + products.quantity,
        0
      );

      dispatch(actionProductDetails({ ...product, quantity: newQuantity }));
      dispatch(actionUpdateQauntity(totalQuantity));
    }
  };

  // Variáveis para armazenar os valores formatados
  let formattedImg = "";
  let formattedPrice = "";

  if (product) {
    // Verifica se a imagem existe, caso contrário, volta uma string vazia
    formattedImg = product.pictures ? product.pictures[0].url : "";

    // Formata o preço com duas casas decimais
    formattedPrice = product.price
      ? product.price.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";
  }

  if (loading) <h1>Carregando...</h1>;

  return (
    <div
      className="container-fluid overflow-y-scroll overflow-auto"
      style={{ height: "100vh" }}
    >
      {!loading && (
        <div className="d-flex">
          <div className="col-sm-8 col d-flex flex-column">
            <div className="d-flex justify-content-between p-2 details col">
              <button
                onClick={() => navigate("/")}
                className="btn btn-success btn-lg ms-5"
              >
                voltar
              </button>
              <div>
                <span>{quantity}</span>
              </div>
              <button
                className="btn btn-primary btn-lg me-5"
                onClick={() => navigate("/shopping-cart")}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
            <div className="d-flex justify-content-center pt-4 col">
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
                    src={formattedImg}
                    alt={`Imagem do produto ${product.title}`}
                  />
                  <h3 className="text-center mt-3">R$ {formattedPrice}</h3>
                </div>
              </div>
            </div>
            <div className="p-3 d-flex flex-column align-items-center">
              <h3 className="mt-2">Quantidade</h3>
              <div className="d-flex flex-row align-items-center justify-content-center w-25 p-2">
                <div className="d-flex flex-row w-50 justify-content-center">
                  <button
                    className="btn btn-secondary"
                    style={{ width: "40px", height: "40px" }}
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <input
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    min="0"
                    className="w-25 text-center"
                  />
                  <button
                    className="btn btn-danger"
                    style={{ width: "40px", height: "40px" }}
                    onClick={handleIncrement}
                  >
                    +
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
                    className="pt-3 d-flex flex-column align-items-start border-bottom"
                  >
                    <h4>{review.email}</h4>
                    <RateBar
                      rating={review.rating}
                      handleRating={handleRating}
                    />
                    <p>{review.review}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
